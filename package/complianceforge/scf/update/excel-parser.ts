import { getLogger } from '@auditmation/util-logger';
import * as XLSX from 'xlsx';
import { SCFDomainData, SCFControlData, SCFProcessedData } from './types';

const logger = getLogger('scf-excel-parser');

export class ExcelParser {
  private workbook: XLSX.WorkBook | null = null;

  async parseExcelFile(filePath: string): Promise<SCFProcessedData> {
    try {
      logger.info(`Parsing Excel file: ${filePath}`);
      
      // Read the Excel file
      this.workbook = XLSX.readFile(filePath);
      
      if (!this.workbook) {
        throw new Error('Failed to load Excel workbook');
      }

      logger.info(`Available worksheets: ${this.workbook.SheetNames.join(', ')}`);
      
      // Extract version from filename or worksheet
      const version = this.extractVersion(filePath);
      
      // Parse domains and controls
      const domains = this.parseDomains();
      const controls = this.parseControls(version);
      
      logger.info(`Parsed ${domains.length} domains and ${controls.length} controls`);
      
      return {
        version,
        domains,
        controls,
        metadata: {
          totalControls: controls.length,
          totalDomains: domains.length,
          processedAt: new Date().toISOString()
        }
      };
    } catch (error) {
      logger.error(`Error parsing Excel file: ${String(error)}`);
      throw error;
    }
  }

  private extractVersion(filePath: string): string {
    const filename = filePath.split('/').pop() || '';
    
    // Try old pattern: "secure-controls-framework-scf-2025-2-1.xlsx"
    let match = filename.match(/scf-(\d+)-(\d+)-(\d+)\.xlsx$/i);
    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}`;
    }
    
    // Try new pattern: "Secure.Controls.Framework.SCF.-.2025.2.2.xlsx"
    match = filename.match(/(\d{4})\.(\d+)\.(\d+)\.xlsx$/i);
    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}`;
    }
    
    // Fallback to current date-based version
    const date = new Date();
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
  }

  private parseDomains(): SCFDomainData[] {
    if (!this.workbook) {
      throw new Error('Workbook not loaded');
    }

    // Look for domains worksheet - updated to match actual SCF worksheet names
    const domainSheetName = this.findSheetByName(['domains & principles', 'domains', 'domain', 'scf domains']);
    if (!domainSheetName) {
      logger.warning('No domains worksheet found, returning empty array');
      return [];
    }

    logger.info(`Found domains worksheet: ${domainSheetName}`);
    const worksheet = this.workbook.Sheets[domainSheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    return this.processDomainData(jsonData as any[][]);
  }

  private parseControls(version: string): SCFControlData[] {
    if (!this.workbook) {
      throw new Error('Workbook not loaded');
    }

    // Create dynamic search keywords based on version
    const versionKeywords = [
      `scf ${version}`,
      `scf ${version.split('.')[0]}`, // e.g., "scf 2025" from "2025.2.1"
      'scf',
      'controls',
      'framework'
    ];
    
    // Look for the main SCF controls worksheet with dynamic version matching
    const controlSheetName = this.findSheetByName(versionKeywords);
    if (!controlSheetName) {
      throw new Error('No SCF controls worksheet found');
    }

    logger.info(`Found controls worksheet: ${controlSheetName}`);
    const worksheet = this.workbook.Sheets[controlSheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    return this.processControlData(jsonData as any[][]);
  }

  private findSheetByName(keywords: string[]): string | null {
    if (!this.workbook) return null;

    // Try exact matches first (for more specific matches)
    for (const keyword of keywords) {
      for (const sheetName of this.workbook.SheetNames) {
        if (sheetName.toLowerCase() === keyword.toLowerCase()) {
          return sheetName;
        }
      }
    }

    // Then try partial matches
    for (const keyword of keywords) {
      for (const sheetName of this.workbook.SheetNames) {
        const lowerSheetName = sheetName.toLowerCase();
        if (lowerSheetName.includes(keyword.toLowerCase())) {
          return sheetName;
        }
      }
    }
    return null;
  }

  private processDomainData(rawData: any[][]): SCFDomainData[] {
    if (rawData.length === 0) return [];

    // Find header row
    const headerRow = this.findHeaderRow(rawData, ['SCF Domain', 'SCF Identifier']);
    if (headerRow === -1) {
      logger.warning('Domain header row not found');
      return [];
    }

    const headers = rawData[headerRow];
    const domains: SCFDomainData[] = [];

    // Process data rows
    for (let i = headerRow + 1; i < rawData.length; i++) {
      const row = rawData[i];
      if (!row || row.length === 0) continue;

      const domainObj = this.mapRowToObject(headers, row, {
        'SCF Domain': '',
        'SCF Identifier': '',
        'Cybersecurity & Data Privacy by Design (C|P) Principles': '',
        'Principle Intent': ''
      });
      
      const domain: SCFDomainData = {
        'SCF Domain': domainObj['SCF Domain'] || '',
        'SCF Identifier': domainObj['SCF Identifier'] || '',
        'Cybersecurity & Data Privacy by Design (C|P) Principles': domainObj['Cybersecurity & Data Privacy by Design (C|P) Principles'] || '',
        'Principle Intent': domainObj['Principle Intent'] || ''
      };

      // Validate required fields
      if (domain['SCF Domain'] && domain['SCF Identifier']) {
        domains.push(domain);
      }
    }

    return domains;
  }

  private processControlData(rawData: any[][]): SCFControlData[] {
    if (rawData.length === 0) return [];

    // Find header row
    const headerRow = this.findHeaderRow(rawData, ['SCF #', 'SCF Control']);
    if (headerRow === -1) {
      throw new Error('Control header row not found');
    }

    const headers = rawData[headerRow];
    const controls: SCFControlData[] = [];

    // Process data rows
    for (let i = headerRow + 1; i < rawData.length; i++) {
      const row = rawData[i];
      if (!row || row.length === 0) continue;

      const control = this.mapRowToObject(headers, row, {
        'SCF Domain': '',
        'SCF Control': '',
        'SCF #': '',
        'Secure Controls Framework (SCF)\r\nControl Description': '',
        'Methods To Comply With SCF Controls': '',
        'Evidence Request List (ERL) #': '',
        'SCF Control Question': '',
        'Relative Control Weighting': '',
        'NIST CSF\r\nFunction Grouping': '',
        'SP-CMM 0\r\nNot Performed': '',
        'SP-CMM 1\r\nPerformed Informally': '',
        'SP-CMM 2\r\nPlanned & Tracked': '',
        'SP-CMM 3\r\nWell Defined': '',
        'SP-CMM 4\r\nQuantitatively Controlled': '',
        'SP-CMM 5\r\nContinuously Improving': ''
      }) as SCFControlData;

      // Validate required fields
      if (control['SCF #'] && control['SCF Control']) {
        controls.push(control);
      }
    }

    return controls;
  }

  private findHeaderRow(data: any[][], expectedHeaders: string[]): number {
    for (let i = 0; i < Math.min(data.length, 10); i++) {
      const row = data[i];
      if (!row) continue;

      let matchCount = 0;
      for (const header of expectedHeaders) {
        for (const cell of row) {
          if (cell && String(cell).includes(header)) {
            matchCount++;
            break;
          }
        }
      }

      if (matchCount >= expectedHeaders.length) {
        return i;
      }
    }
    return -1;
  }

  private mapRowToObject(headers: any[], row: any[], template: Record<string, string>): Record<string, string> {
    const result: Record<string, string> = { ...template };

    for (let i = 0; i < headers.length && i < row.length; i++) {
      const header = String(headers[i] || '').trim();
      const value = String(row[i] || '').trim();

      if (header && value) {
        // Try exact match first
        if (result.hasOwnProperty(header)) {
          result[header] = value;
        } else {
          // Try partial match for headers with line breaks
          for (const templateKey of Object.keys(template)) {
            if (header.includes(templateKey) || templateKey.includes(header)) {
              result[templateKey] = value;
              break;
            }
          }
        }
      }
    }

    return result;
  }

  getWorksheetNames(): string[] {
    if (!this.workbook) {
      return [];
    }
    return this.workbook.SheetNames;
  }

  getWorksheetData(sheetName: string): any[][] {
    if (!this.workbook || !this.workbook.Sheets[sheetName]) {
      return [];
    }
    return XLSX.utils.sheet_to_json(this.workbook.Sheets[sheetName], { header: 1 });
  }
}