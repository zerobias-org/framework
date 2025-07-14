import { UUID } from '@auditmation/types-core-js';
import { getLogger } from '@auditmation/util-logger';
import fs from 'fs';
import yml from 'js-yaml';
import path from 'path';
import { cwd } from 'process';
import https from 'https';
import crypto from 'crypto';

const logger = getLogger('opencre-update');

interface OpenCREData {
  data: any[];
  meta?: {
    total: number;
    lastUpdated: string;
    version: string;
  };
}

interface Document {
  doctype: string;
  hyperlink: string;
  name: string;
  section?: string;
  sectionID?: string;
}

interface UpdateConfig {
  apiUrl: string;
  githubUrl: string;
  localDataPath: string;
  elementsPath: string;
}

const CONFIG: UpdateConfig = {
  apiUrl: 'https://opencre.org/rest/v1/all_cres?per_page=10000',
  githubUrl: 'https://raw.githubusercontent.com/zeljkoobrenovic/opencre-explorer/refs/heads/main/data/all_cres.json',
  localDataPath: path.join(process.cwd(), 'update/all_cres.json'),
  elementsPath: path.join(process.cwd(), 'elements')
};

const standardFunctionMappings: Record<string, (x: string) => string> = {
  "NIST 800-53 v5": (x) => `nist.80053.rev5.framework/${x.split(' ')[0].toLowerCase().replace(' ', '').replace('(', '_').replace(')', '')}`,
  "Cloud Controls Matrix": (x) => `csa.ccm.v4_0_12.framework/${x.toLowerCase().replace(/\&/g, '_')}`,
  "ASVS": (x) => `owasp.asvs.v4_0_3.framework/${x.toLowerCase().slice(1)}`,
  "SAMM": (x) => `owasp.samm.v1_0.framework/${x.toLowerCase()}`,
  "ISO 27001": (x) => `iso.27001.2013.framework/${x.toLowerCase()}`,
  "NIST SSDF": (x) => `nist.800218.v1_1.framework/${x.toLowerCase().replace(/\./g, '_')}`,
  "CWE": (x) => `CWE-${x}`,
  "CAPEC": (x) => `CAPEC-${x}`,
  "OWASP Web Security Testing Guide (WSTG)": (x) => `owasp.wstg.v5.benchmark/${x.toLowerCase()}`
};

class OpenCREUpdater {
  private unmapped = new Set<string>();
  private elementsLinks: Record<string, Array<[string, string]>> = {};
  private config: UpdateConfig;

  constructor(config: UpdateConfig) {
    this.config = config;
  }

  async checkForUpdates(): Promise<boolean> {
    try {
      logger.info('Checking for OpenCRE updates...');
      
      // Try to fetch from primary API first, then fallback to GitHub
      const newData = await this.fetchLatestData();
      
      // Check if data has actually changed
      const hasChanges = this.hasDataChanged(newData);
      
      if (!hasChanges) {
        logger.info('No changes detected in OpenCRE data');
        return false;
      }
      
      logger.info('Changes detected in OpenCRE data');
      return true;
    } catch (error) {
      logger.error('Error checking for updates:', error);
      throw error;
    }
  }

  private async fetchLatestData(): Promise<OpenCREData> {
    // Try API first
    try {
      logger.info('Fetching from OpenCRE API...');
      const apiData = await this.fetchFromUrl(this.config.apiUrl);
      return apiData;
    } catch (apiError) {
      logger.warning('API fetch failed, trying GitHub fallback:', String(apiError));
      
      // Fallback to GitHub
      try {
        logger.info('Fetching from GitHub fallback...');
        const githubData = await this.fetchFromUrl(this.config.githubUrl);
        return githubData;
      } catch (githubError) {
        logger.error('GitHub fallback also failed:', String(githubError));
        throw new Error(`Both API and GitHub fallback failed: API(${String(apiError)}), GitHub(${String(githubError)})`);
      }
    }
  }

  private fetchFromUrl(url: string): Promise<OpenCREData> {
    return new Promise((resolve, reject) => {
      const request = https.get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
          return;
        }

        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            resolve(parsed);
          } catch (parseError) {
            reject(new Error(`JSON parse error: ${String(parseError)}`));
          }
        });
      });

      request.on('error', (error) => {
        reject(error);
      });

      request.setTimeout(30000, () => {
        request.destroy();
        reject(new Error('Request timeout'));
      });
    });
  }

  private hasDataChanged(newData: OpenCREData): boolean {
    if (!fs.existsSync(this.config.localDataPath)) {
      return true;
    }

    try {
      const existingData = JSON.parse(fs.readFileSync(this.config.localDataPath, 'utf8'));
      
      // Compare data hashes
      const existingHash = crypto.createHash('sha256').update(JSON.stringify(existingData.data || existingData)).digest('hex');
      const newHash = crypto.createHash('sha256').update(JSON.stringify(newData.data || newData)).digest('hex');
      return existingHash !== newHash;
    } catch (error) {
      logger.warning('Error comparing data, assuming changed:', String(error));
      return true;
    }
  }

  private processDataInMemory(data: OpenCREData): void {
    // This method is intentionally empty as processing happens in processElements
    logger.info(`Loaded ${Array.isArray(data.data) ? data.data.length : Array.isArray(data) ? data.length : 0} CRE elements for processing`);
  }

  private linkToPackageCode(document: Document, elementId: string): string {
    const mapping = standardFunctionMappings[document.name];
    if (mapping) {
      try {
        const mappedName = mapping(document.sectionID || document.section || document.name);
        const [packageName, element] = mappedName.split('/');
        
        if (element === undefined) {
          return mappedName;
        }
        
        if (!this.elementsLinks[packageName]) {
          this.elementsLinks[packageName] = [];
        }
        
        this.elementsLinks[packageName].push([element, elementId]);
        return mappedName;
      } catch (error) {
        logger.warning(`Error mapping ${document.name}: ${String(error)}`);
        this.unmapped.add(document.name);
        return `${document.name}/${document.sectionID || document.section}`;
      }
    }
    
    this.unmapped.add(document.name);
    return `${document.name}/${document.sectionID || document.section}`;
  }

  private getExistingElementId(externalId: string): string | null {
    try {
      const elementPath = path.join(this.config.elementsPath, `${externalId}.yml`);
      if (fs.existsSync(elementPath)) {
        const existingData = yml.load(fs.readFileSync(elementPath, 'utf8')) as any;
        return existingData?.id || null;
      }
    } catch (error) {
      // Silent fail for missing files
    }
    return null;
  }

  private processElementInMemory(data: any): any {
    if (!data) {
      return null;
    }

    // Validate data structure
    if (!data.name || !data.externalId || !data.elementType) {
      return null;
    }

    // Preserve existing UUID if element exists
    const existingId = this.getExistingElementId(data.externalId);
    if (existingId) {
      data.id = existingId;
    }

    return data;
  }

  private validateElement(element: any): boolean {
    const required = ['name', 'externalId', 'elementType'];
    const missing = required.filter(field => !element[field]);
    
    if (missing.length > 0) {
      logger.error(`Element missing required fields: ${missing.join(', ')}`, element);
      return false;
    }
    
    // Validate externalId format
    if (typeof element.externalId !== 'string' || element.externalId.trim() === '') {
      logger.error('Invalid externalId:', element.externalId);
      return false;
    }
    
    return true;
  }

  private async saveElementsToFiles(elements: any[]): Promise<void> {
    // Ensure elements directory exists
    if (!fs.existsSync(this.config.elementsPath)) {
      fs.mkdirSync(this.config.elementsPath, { recursive: true });
    }

    const processedIds = new Set<string>();
    let savedCount = 0;

    for (const element of elements) {
      try {
        if (!element.externalId) {
          logger.warning('Skipping element without externalId:', element);
          continue;
        }

        const filename = `${element.externalId}.yml`;
        const filepath = path.join(this.config.elementsPath, filename);
        
        // Clean up element (remove undefined values)
        const cleanElement = Object.fromEntries(
          Object.entries(element).filter(([_, value]) => value !== undefined)
        );
        
        const yamlContent = yml.dump(cleanElement, { 
          indent: 2,
          lineWidth: -1,
          noRefs: true
        });
        
        fs.writeFileSync(filepath, yamlContent, 'utf8');
        processedIds.add(element.externalId);
        savedCount++;
      } catch (error) {
        logger.error(`Error saving element ${element.externalId}:`, String(error));
      }
    }

    logger.info(`Saved ${savedCount} elements to ${this.config.elementsPath}`);
    
    // Clean up orphaned elements
    this.cleanupOrphanedElements(processedIds);
  }

  private cleanupOrphanedElements(processedIds: Set<string>): void {
    if (!fs.existsSync(this.config.elementsPath)) {
      return;
    }

    const existingFiles = fs.readdirSync(this.config.elementsPath)
      .filter(file => file.endsWith('.yml'));

    let removedCount = 0;
    for (const file of existingFiles) {
      const filePath = path.join(this.config.elementsPath, file);
      try {
        const data = yml.load(fs.readFileSync(filePath, 'utf8')) as any;
        if (data && data.externalId && !processedIds.has(data.externalId)) {
          fs.unlinkSync(filePath);
          removedCount++;
          logger.info(`Removed orphaned element: ${file}`);
        }
      } catch (error) {
        logger.warning(`Error checking file ${file}:`, String(error));
      }
    }

    if (removedCount > 0) {
      logger.info(`Removed ${removedCount} orphaned elements`);
    }
  }

  async processElements(data?: OpenCREData | any[]): Promise<any[]> {
    try {
      let elementsData = data;
      
      if (!elementsData) {
        // Fallback to reading from file if no data provided
        const rawData = JSON.parse(fs.readFileSync(this.config.localDataPath, 'utf8'));
        elementsData = rawData.data || rawData;
      }

      if (!Array.isArray(elementsData)) {
        throw new Error('Invalid data format: expected array');
      }

      const processedElements: any[] = [];
      let processedCount = 0;
      let errorCount = 0;

      for (const e of elementsData) {
        try {
          if (!e.id || !e.name) {
            errorCount++;
            continue;
          }

          const demonstrates = (e.links || [])
            .filter((l: any) => l.document && l.document.doctype === 'Standard')
            .map((l: any) => this.linkToPackageCode(l.document, e.id));

          const links = demonstrates.length > 0 ? { demonstrates } : undefined;
          const parentLink = (e.links || []).find((l: any) => l.ltype === 'Is Part Of');
          
          const element = {
            id: UUID.generateV4().toString(),
            name: e.name,
            description: e.description || e.name,
            externalId: e.id,
            elementType: 'cre',
            links,
            parent: parentLink?.document?.id || undefined
          };

          if (this.validateElement(element)) {
            const processedElement = this.processElementInMemory(element);
            if (processedElement) {
              processedElements.push(processedElement);
              processedCount++;
            }
          } else {
            errorCount++;
          }
        } catch (error) {
          errorCount++;
        }
      }

      return processedElements;
    } catch (error) {
      throw error;
    }
  }

  private generateCrossReferenceMappings(): Record<string, any> {
    const mappings: Record<string, any> = {};
    
    Object.entries(this.elementsLinks).forEach(([packageName, elements]) => {
      try {
        const packageData = {
          elements: elements.map(([element, elementId]) => ({
            id: UUID.generateV4().toString(),
            targetElement: elementId,
            sourceElement: element,
            relationshipType: 'intersects',
            strengthOfRelationship: 5,
          }))
        };
        
        mappings[packageName] = packageData;
      } catch (error) {
        // Silent fail
      }
    });
    
    return mappings;
  }

  async run(forceUpdate: boolean = false): Promise<{ elements: any[], mappings: Record<string, any> }> {
    try {
      // Fetch fresh data
      const newData = await this.fetchLatestData();
      
      // Check for changes unless forced update
      if (!forceUpdate) {
        const hasChanges = this.hasDataChanged(newData);
        if (!hasChanges) {
          logger.info('No changes detected, skipping update. Use --force to override.');
          // Return empty result when no changes - don't reprocess existing data
          return { elements: [], mappings: {} };
        }
      }
      
      logger.info('Processing updated data...');
      const elements = await this.processElements(newData.data || newData);
      const mappings = this.generateCrossReferenceMappings();
      
      // Save elements to filesystem
      await this.saveElementsToFiles(elements);
      
      // Save the new data to local cache
      fs.writeFileSync(this.config.localDataPath, JSON.stringify(newData, null, 2), 'utf8');
      
      logger.info(`Successfully processed ${elements.length} elements`);
      if (this.unmapped.size > 0) {
        logger.warning(`Unmapped standards: ${Array.from(this.unmapped).join(', ')}`);
      }
      
      return { elements, mappings };
    } catch (error) {
      throw error;
    }
  }
}

// CLI interface
async function main() {
  const forceUpdate = process.argv.includes('--force');
  const updater = new OpenCREUpdater(CONFIG);
  
  try {
    logger.info('Starting OpenCRE framework update...');
    const result = await updater.run(forceUpdate);
    logger.info(`Update completed successfully. Processed ${result.elements.length} elements.`);
  } catch (error) {
    logger.error('Update failed:', String(error));
    console.error('Update failed:', String(error));
    process.exit(1);
  }
}

// Run if this is the main module
main();

export { OpenCREUpdater };
export type { UpdateConfig };