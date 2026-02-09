import { UUID } from '@zerobias-org/types-core-js';
import { LoggerEngine } from '@zerobias-org/logger';
import fs from 'fs';
import yml from 'js-yaml';
import path from 'path';

import { GitHubClient } from './github-client.js';
import { ExcelParser } from './excel-parser.js';
import {
  SCFUpdateConfig,
  SCFVersionInfo,
  SCFProcessedData,
  SCFElement,
  SCFFrameworkIndex,
  SCFElementType,
  SCFMaturityLevel,
  UpdateResult
} from './types.js';

const logger = LoggerEngine.root().get('scf-updater');

const CONFIG: SCFUpdateConfig = {
  githubRepo: 'securecontrolsframework/securecontrolsframework',
  githubApiUrl: 'https://api.github.com',
  localCachePath: path.join(process.cwd(), 'cache'),
  elementsPath: path.join(process.cwd(), '../'), // Will be updated dynamically per version
  timeout: 60000, // 60 seconds
  retryAttempts: 3,
  retryDelay: 2000 // 2 seconds
};

class SCFUpdater {
  private config: SCFUpdateConfig;
  private githubClient: GitHubClient;
  private excelParser: ExcelParser;
  private currentVersion?: string;

  constructor(config: SCFUpdateConfig) {
    this.config = config;
    this.githubClient = new GitHubClient(config);
    this.excelParser = new ExcelParser();
    this.currentVersion = this.getCurrentVersion();
  }

  async checkForUpdates(): Promise<boolean> {
    try {
      const versionInfo = await this.githubClient.checkForNewVersion(this.currentVersion);
      if (!versionInfo) {
        return false;
      }
      
      logger.info(`New version available: ${versionInfo.version}`);
      return true;
    } catch (error) {
      logger.error('Error checking for updates:', error);
      throw error;
    }
  }

  async run(forceUpdate: boolean = false): Promise<UpdateResult> {
    try {
      // Check for new version unless forced
      let versionInfo: SCFVersionInfo;
      
      if (!forceUpdate) {
        const newVersionInfo = await this.githubClient.checkForNewVersion(this.currentVersion);
        if (!newVersionInfo) {
          return {
            success: true,
            skipped: true,
            reason: 'No new version available'
          };
        }
        versionInfo = newVersionInfo;
      } else {
        // Force update - get latest release info
        const release = await this.githubClient.getLatestRelease();
        const excelAsset = release.assets.find(asset => {
          const nameLower = asset.name.toLowerCase();
          // More flexible matching: look for Excel files with SCF-related keywords
          return nameLower.endsWith('.xlsx') && (
            nameLower.includes('secure-controls-framework') ||
            nameLower.includes('secure controls framework') ||
            nameLower.includes('scf') ||
            (nameLower.includes('secure') && nameLower.includes('controls'))
          );
        });
        
        if (!excelAsset) {
          throw new Error('No Excel asset found in latest release');
        }
        
        versionInfo = {
          version: this.githubClient['parseVersion'](release.tag_name),
          releaseDate: release.published_at,
          assetUrl: excelAsset.browser_download_url,
          assetName: excelAsset.name,
          assetSize: excelAsset.size
        };
      }
      
      logger.info(`Processing SCF version ${versionInfo.version}...`);
      
      // Download the Excel file
      const excelPath = await this.downloadWithRetry(versionInfo);
      
      // Parse the Excel data
      const scfData = await this.excelParser.parseExcelFile(excelPath);
      
      // Process and save elements
      const elementsProcessed = await this.processAndSaveElements(scfData);
      
      
      logger.info(`Successfully processed ${elementsProcessed} elements for SCF ${versionInfo.version}`);
      
      return {
        success: true,
        version: versionInfo.version,
        elementsProcessed
      };
    } catch (error) {
      logger.error('Update failed:', error as Error);
      return {
        success: false,
        error: String(error)
      };
    }
  }

  private async downloadWithRetry(versionInfo: SCFVersionInfo): Promise<string> {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= this.config.retryAttempts; attempt++) {
      try {
        return await this.githubClient.downloadAsset(versionInfo);
      } catch (error) {
        lastError = error as Error;
        logger.warning(`Download attempt ${attempt} failed: ${String(error)}`);
        
        if (attempt < this.config.retryAttempts) {
          await this.sleep(this.config.retryDelay);
        }
      }
    }
    
    throw lastError || new Error('Download failed after all retry attempts');
  }

  private async processAndSaveElements(scfData: SCFProcessedData): Promise<number> {
    // Create version-specific directory structure
    const versionDir = path.join(this.config.elementsPath, scfData.version);
    const elementsDir = path.join(versionDir, 'elements');
    
    // Ensure version and elements directories exist
    if (!fs.existsSync(versionDir)) {
      fs.mkdirSync(versionDir, { recursive: true });
    }
    if (!fs.existsSync(elementsDir)) {
      fs.mkdirSync(elementsDir, { recursive: true });
    }

    const frameworkId = UUID.generateV4().toString();
    
    // Create framework index in version directory
    await this.createFrameworkIndex(scfData, frameworkId, versionDir);
    
    // Create package.json for this version
    await this.createPackageJson(scfData, versionDir);
    
    // Copy .npmrc from root
    await this.copyNpmrc(versionDir);

    // Install dependencies
    await this.runNpmInstall(versionDir);

    // Process domains
    const domainElements = this.processDomains(scfData.domains);
    
    // Process controls
    const controlElements = this.processControls(scfData.controls);
    
    // Save all elements to version-specific directory
    const allElements = [...domainElements, ...controlElements];
    await this.saveElementsToFiles(allElements, elementsDir);
    
    // Clean up orphaned elements
    await this.cleanupOrphanedElements(allElements.map(e => e.externalId), elementsDir);
    
    await this.validatePackage(versionDir);
    
    logger.info(`Created SCF ${scfData.version} package at: ${versionDir}`);
    
    return allElements.length;
  }

  private async createFrameworkIndex(scfData: SCFProcessedData, frameworkId: string, versionDir: string): Promise<void> {
    const indexFile: SCFFrameworkIndex = {
      id: frameworkId,
      name: `Secure Controls Framework ${scfData.version}`,
      description: `ComplianceForge Secure Controls Framework ${scfData.version}`,
      externalId: `SCF-${scfData.version}`,
      code: `scf_${scfData.version.replace(/\./g, '_')}`,
      status: 'approved',
      url: 'https://securecontrolsframework.com/',
      version: scfData.version,
      external: true,
      internal: true,
      elementTypes: [
        {
          id: UUID.generateV4().toString(),
          code: 'domain',
          name: 'Domain',
          description: 'SCF Security Domain'
        },
        {
          id: UUID.generateV4().toString(),
          code: 'control',
          name: 'Control',
          description: 'SCF Security Control'
        },
        {
          id: UUID.generateV4().toString(),
          code: 'enhancement',
          name: 'Enhancement',
          description: 'SCF Control Enhancement'
        }
      ] as SCFElementType[],
      mappingTypes: ['control', 'enhancement']
    };

    const indexPath = path.join(versionDir, 'index.yml');
    const yamlContent = yml.dump(this.cleanObject(indexFile), {
      indent: 2,
      lineWidth: -1,
      noRefs: true
    });
    
    fs.writeFileSync(indexPath, yamlContent, 'utf8');
  }

  private processDomains(domains: any[]): SCFElement[] {
    const elements: SCFElement[] = [];
    
    for (const domain of domains) {
      if (!domain['SCF Identifier'] || !domain['SCF Domain']) {
        continue;
      }
      
      const element: SCFElement = {
        id: UUID.generateV4().toString(),
        name: domain['SCF Domain'].trim(),
        description: domain['Cybersecurity & Data Privacy by Design (C|P) Principles']?.trim() || domain['SCF Domain'].trim(),
        elementType: 'domain',
        externalId: domain['SCF Identifier'].trim(),
        intent: domain['Principle Intent']?.trim()
      };
      
      elements.push(element);
    }
    
    return elements;
  }

  private processControls(controls: any[]): SCFElement[] {
    const elements: SCFElement[] = [];
    
    for (const control of controls) {
      if (!control['SCF #'] || !control['SCF Control']) {
        continue;
      }
      
      const controlCode = control['SCF #'].toLowerCase().trim();
      const splitByDash = controlCode.split('-');
      const splitByDot = controlCode.split('.');
      
      let parent: string | undefined;
      if (splitByDot.length > 1) {
        parent = splitByDot[0];
      } else if (splitByDash.length > 1) {
        parent = splitByDash[0];
      }
      
      const element: SCFElement = {
        id: UUID.generateV4().toString(),
        name: control['SCF Control'].trim(),
        description: control['Secure Controls Framework (SCF)\nControl Description']?.trim() || control['SCF Control'].trim(),
        elementType: controlCode.includes('.') ? 'enhancement' : 'control',
        externalId: control['SCF #'].trim(),
        parent,
        controlQuestion: control['SCF Control Question']?.trim(),
        methodsToComply: control['Methods To Comply With SCF Controls']?.trim(),
        functionGrouping: control['NIST CSF\nFunction Grouping']?.trim(),
        controlWeighting: control['Relative Control Weighting']?.trim(),
        cmm_0: this.createMaturityLevel(0, control['C|P-CMM 0\nNot Performed']),
        cmm_1: this.createMaturityLevel(1, control['C|P-CMM 1\nPerformed Informally']),
        cmm_2: this.createMaturityLevel(2, control['C|P-CMM 2\nPlanned & Tracked']),
        cmm_3: this.createMaturityLevel(3, control['C|P-CMM 3\nWell Defined']),
        cmm_4: this.createMaturityLevel(4, control['C|P-CMM 4\nQuantitatively Controlled']),
        cmm_5: this.createMaturityLevel(5, control['C|P-CMM 5\nContinuously Improving'])
      };
      
      elements.push(element);
    }
    
    return elements;
  }

  private createMaturityLevel(level: number, description: string): SCFMaturityLevel {
    const levelNames = [
      'Not Performed',
      'Performed Informally', 
      'Planned & Tracked',
      'Well Defined',
      'Quantitatively Controlled',
      'Continuously Improving'
    ];
    
    const isAvailable = Boolean(description && !description.includes(`CMM${level} is N/A`) && !description.includes(`CMM ${level} is N/A`));
    
    return {
      name: levelNames[level] || `Level ${level}`,
      description: this.sanitizeCMMDescription(description || ''),
      available: isAvailable,
      value: level
    };
  }

  private sanitizeCMMDescription(description: string): string {
    if (!description) return '';
    
    return description
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n');
  }

  private async createPackageJson(scfData: SCFProcessedData, versionDir: string): Promise<void> {
    const packageJson = {
      name: `@zerobias-org/framework-complianceforge-scf-${scfData.version}`,
      version: "1.0.0",
      description: `ComplianceForge SCF ${scfData.version} Controls`,
      author: "team@zerobias.com",
      license: "ISC",
      repository: {
        type: "git",
        url: "git@github.com:zerobias-org/framework.git",
        directory: `package/complianceforge/scf/${scfData.version}/`
      },
      zerobias: {
        package: `complianceforge.scf.${scfData.version.replace(/\./g, '_')}.framework`,
        "import-artifact": "framework",
        "dataloader-version": "1.0.0"
      },
      publishConfig: {
        registry: "https://npm.pkg.github.com/"
      },
      files: [
        "index.yml",
        "baselines/**",
        "elements/**",
        "mappings/**"
      ],
      dependencies: {
        "@zerobias-org/suite-complianceforge-scf": "latest"
      },
      scripts: {
        "correct:deps": "tsx ../../../../scripts/correctDeps.ts",
        validate: "tsx ../../../../scripts/validate.ts"
      }
    };

    const packageJsonPath = path.join(versionDir, 'package.json');
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
  }

  private async saveElementsToFiles(elements: SCFElement[], elementsDir: string): Promise<void> {
    let savedCount = 0;
    
    for (const element of elements) {
      try {
        const filename = `${element.externalId.toLowerCase().replace(/\./g, '-')}.yml`;
        const filepath = path.join(elementsDir, filename);
        
        const cleanElement = this.cleanObject(element);
        const yamlContent = yml.dump(cleanElement, {
          indent: 2,
          lineWidth: -1,
          noRefs: true
        });
        
        fs.writeFileSync(filepath, yamlContent, 'utf8');
        savedCount++;
      } catch (error) {
        logger.error(`Error saving element ${element.externalId}:`, error as Error);
      }
    }
    
    logger.info(`Saved ${savedCount} elements to ${elementsDir}`);
  }

  private cleanupOrphanedElements(processedIds: string[], elementsDir: string): void {
    if (!fs.existsSync(elementsDir)) {
      return;
    }

    const existingFiles = fs.readdirSync(elementsDir)
      .filter(file => file.endsWith('.yml'));

    let removedCount = 0;
    for (const file of existingFiles) {
      const filePath = path.join(elementsDir, file);
      try {
        const data = yml.load(fs.readFileSync(filePath, 'utf8')) as any;
        if (data && data.externalId && !processedIds.includes(data.externalId)) {
          fs.unlinkSync(filePath);
          removedCount++;
        }
      } catch (error) {
        logger.warning(`Error checking file ${file}:`, error as Error);
      }
    }

    if (removedCount > 0) {
      logger.info(`Removed ${removedCount} orphaned elements`);
    }
  }

  private cleanObject(obj: any): any {
    const cleaned: any = {};
    
    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined && value !== null && value !== '') {
        cleaned[key] = value;
      }
    }
    
    return cleaned;
  }

  private extractVersionFromFilename(filename: string): string | undefined {
    let match;

    // Pattern 1: 3-part version "secure-controls-framework-scf-2025-2-1.xlsx"
    match = filename.match(/scf-(\d+)-(\d+)-(\d+)\.xlsx$/i);
    if (match) return `${match[1]}.${match[2]}.${match[3]}`;

    // Pattern 2: 2-part version "secure-controls-framework-scf-2025-4.xlsx"
    match = filename.match(/scf-(\d+)-(\d+)\.xlsx$/i);
    if (match) return `${match[1]}.${match[2]}`;

    // Pattern 3: "Secure Controls Framework (SCF) - 2025.2.2.xlsx" (3-part)
    match = filename.match(/(\d{4})\.(\d+)\.(\d+)\.xlsx$/i);
    if (match) return `${match[1]}.${match[2]}.${match[3]}`;

    // Pattern 4: "...2025.4.xlsx" (2-part)
    match = filename.match(/(\d{4})\.(\d+)\.xlsx$/i);
    if (match) return `${match[1]}.${match[2]}`;

    // Pattern 5: Version in parentheses or after hyphen "SCF - 2025.2.2.xlsx" or "(2025.2.2)"
    match = filename.match(/[\s\-\(](\d{4})\.(\d+)\.(\d+)/i);
    if (match) return `${match[1]}.${match[2]}.${match[3]}`;

    // Pattern 6: 2-part version in parentheses "SCF - 2025.4.xlsx"
    match = filename.match(/[\s\-\(](\d{4})\.(\d+)/i);
    if (match) return `${match[1]}.${match[2]}`;

    // Pattern 7: Version with underscores "scf_2025_2_2.xlsx"
    match = filename.match(/(\d{4})[_\.](\d+)[_\.](\d+)/i);
    if (match) return `${match[1]}.${match[2]}.${match[3]}`;

    return undefined;
  }

  private compareVersions(version1: string, version2: string): number {
    const v1Parts = version1.split('.').map(Number);
    const v2Parts = version2.split('.').map(Number);
    const maxLength = Math.max(v1Parts.length, v2Parts.length);
    for (let i = 0; i < maxLength; i++) {
      const v1Part = v1Parts[i] || 0;
      const v2Part = v2Parts[i] || 0;
      if (v1Part > v2Part) return 1;
      if (v1Part < v2Part) return -1;
    }
    return 0;
  }

  private getCurrentVersion(): string | undefined {
    if (!fs.existsSync(this.config.localCachePath)) return undefined;

    const excelFiles = fs.readdirSync(this.config.localCachePath)
      .filter(file => {
        const fileLower = file.toLowerCase();
        return fileLower.endsWith('.xlsx') && (
          fileLower.includes('secure-controls-framework') ||
          fileLower.includes('secure controls framework') ||
          fileLower.includes('scf')
        );
      });

    if (excelFiles.length === 0) return undefined;

    // Extract versions from all cached files and return the highest
    let highestVersion: string | undefined;
    for (const filename of excelFiles) {
      const version = this.extractVersionFromFilename(filename);
      if (version) {
        if (!highestVersion || this.compareVersions(version, highestVersion) > 0) {
          highestVersion = version;
        }
      } else {
        logger.warning(`Could not extract version from filename: ${filename}`);
      }
    }

    return highestVersion;
  }


  private async copyNpmrc(versionDir: string): Promise<void> {
    try {
      const rootNpmrcPath = path.join(process.cwd(), '../../../../.npmrc');
      const versionNpmrcPath = path.join(versionDir, '.npmrc');
      
      if (fs.existsSync(rootNpmrcPath)) {
        fs.copyFileSync(rootNpmrcPath, versionNpmrcPath);
        logger.info(`Copied .npmrc to ${versionNpmrcPath}`);
      } else {
        logger.warning(`Root .npmrc not found at ${rootNpmrcPath}, skipping copy`);
      }
    } catch (error) {
      logger.error(`Error copying .npmrc: ${String(error)}`);
    }
  }

  private async runNpmInstall(versionDir: string): Promise<void> {
    try {
      const { exec } = require('child_process');
      const { promisify } = require('util');
      const execAsync = promisify(exec);

      logger.info(`Running npm install in ${versionDir}`);
      await execAsync('npm install', { cwd: versionDir });
      logger.info('npm install completed successfully');
    } catch (error) {
      logger.error(`Error running npm install: ${String(error)}`);
    }
  }

  private async validatePackage(versionDir: string): Promise<void> {
    try {
      const { exec } = require('child_process');
      const { promisify } = require('util');
      const execAsync = promisify(exec);
      
      logger.info(`Validating package in ${versionDir}`);
      await execAsync('npm run validate', { cwd: versionDir });
      logger.info('Package validation completed successfully');
    } catch (error) {
      logger.error(`Package validation failed: ${String(error)}`);
      throw new Error(`Package validation failed: ${String(error)}`);
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// CLI interface
async function main() {
  const forceUpdate = process.argv.includes('--force');
  const updater = new SCFUpdater(CONFIG);
  
  try {
    logger.info('Starting SCF framework update...');
    const result = await updater.run(forceUpdate);
    
    if (result.success) {
      if (result.skipped) {
        logger.info(`Update skipped: ${result.reason}`);
      } else {
        logger.info(`Update completed successfully. Processed ${result.elementsProcessed} elements for SCF ${result.version}.`);
      }
    } else {
      logger.error('Update failed:', new Error(result.error));
      process.exit(1);
    }
  } catch (error) {
    logger.error('Update failed:', error as Error);
    process.exit(1);
  }
}

// Run if this is the main module
if (require.main === module) {
  main();
}

export { SCFUpdater };
export type { SCFUpdateConfig, UpdateResult };