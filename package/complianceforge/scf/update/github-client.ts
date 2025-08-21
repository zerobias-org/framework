import { getLogger } from '@auditmation/util-logger';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { GitHubRelease, SCFVersionInfo, SCFUpdateConfig } from './types';

const logger = getLogger('scf-github-client');

export class GitHubClient {
  private config: SCFUpdateConfig;

  constructor(config: SCFUpdateConfig) {
    this.config = config;
  }

  async getLatestRelease(): Promise<GitHubRelease> {
    const url = `${this.config.githubApiUrl}/repos/${this.config.githubRepo}/releases/latest`;
    
    try {
      logger.info(`Fetching latest release from: ${url}`);
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'SCF-Update-Tool',
          'Accept': 'application/vnd.github.v3+json'
        },
        timeout: this.config.timeout
      });
      return response.data as GitHubRelease;
    } catch (error) {
      logger.error(`Failed to fetch latest release: ${String(error)}`);
      throw new Error(`GitHub API request failed: ${String(error)}`);
    }
  }

  async checkForNewVersion(currentVersion?: string): Promise<SCFVersionInfo | null> {
    try {
      const release = await this.getLatestRelease();
      const latestVersion = this.parseVersion(release.tag_name);
      
      if (currentVersion && this.compareVersions(latestVersion, currentVersion) <= 0) {
        logger.info(`No new version available. Current: ${currentVersion}, Latest: ${latestVersion}`);
        return null;
      }

      // Find the Excel asset (handles both naming patterns)
      const excelAsset = release.assets.find(asset => {
        const lowerName = asset.name.toLowerCase();
        return lowerName.endsWith('.xlsx') && 
          (lowerName.includes('secure-controls-framework') || 
           lowerName.includes('secure.controls.framework'));
      });

      if (!excelAsset) {
        throw new Error(`No Excel asset found in release ${latestVersion}`);
      }

      logger.info(`New version available: ${latestVersion}`);
      return {
        version: latestVersion,
        releaseDate: release.published_at,
        assetUrl: excelAsset.browser_download_url,
        assetName: excelAsset.name,
        assetSize: excelAsset.size
      };
    } catch (error) {
      logger.error(`Error checking for new version: ${String(error)}`);
      throw error;
    }
  }

  async downloadAsset(versionInfo: SCFVersionInfo): Promise<string> {
    const localPath = path.join(this.config.localCachePath, versionInfo.assetName);
    
    // Check if already downloaded and validate
    if (fs.existsSync(localPath)) {
      const stats = fs.statSync(localPath);
      if (stats.size === versionInfo.assetSize) {
        logger.info(`Asset already exists and validated: ${localPath}`);
        return localPath;
      } else {
        logger.warning(`Existing file size mismatch: ${stats.size} vs ${versionInfo.assetSize}, re-downloading`);
        fs.unlinkSync(localPath);
      }
    }

    // Ensure cache directory exists
    if (!fs.existsSync(this.config.localCachePath)) {
      fs.mkdirSync(this.config.localCachePath, { recursive: true });
    }

    logger.info(`Downloading asset: ${versionInfo.assetName} (${versionInfo.assetSize} bytes)`);
    
    try {
      const response = await axios({
        method: 'GET',
        url: versionInfo.assetUrl,
        responseType: 'stream',
        timeout: this.config.timeout,
        maxRedirects: 5,
        headers: {
          'User-Agent': 'SCF-Update-Tool',
          'Accept': 'application/octet-stream'
        },
        onDownloadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
            if (progress % 10 === 0) { // Log every 10%
              logger.info(`Download progress: ${progress}% (${progressEvent.loaded}/${progressEvent.total} bytes)`);
            }
          }
        }
      });

      // Create write stream
      const writer = fs.createWriteStream(localPath);
      
      // Pipe the response to file
      response.data.pipe(writer);

      return new Promise<string>((resolve, reject) => {
        writer.on('finish', () => {
          // Validate file size
          const stats = fs.statSync(localPath);
          if (stats.size !== versionInfo.assetSize) {
            fs.unlinkSync(localPath);
            reject(new Error(`Download incomplete: expected ${versionInfo.assetSize} bytes, got ${stats.size}`));
            return;
          }
          
          logger.info(`Download completed and validated: ${localPath} (${stats.size} bytes)`);
          resolve(localPath);
        });

        writer.on('error', (error) => {
          fs.unlink(localPath, () => {}); // Clean up partial file
          reject(error);
        });

        // Handle stream errors
        response.data.on('error', (error: Error) => {
          writer.destroy();
          fs.unlink(localPath, () => {}); // Clean up partial file
          reject(error);
        });
      });

    } catch (error) {
      // Clean up partial file if it exists
      if (fs.existsSync(localPath)) {
        fs.unlinkSync(localPath);
      }
      
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status;
        const statusText = error.response?.statusText;
        throw new Error(`HTTP ${statusCode}: ${statusText} - ${error.message}`);
      }
      
      throw error;
    }
  }


  private parseVersion(tagName: string): string {
    // Handle version formats like "2025.2.1", "v2025.2.1", etc.
    return tagName.replace(/^v?/, '');
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
}