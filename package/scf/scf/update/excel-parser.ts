import { LoggerEngine } from '@zerobias-org/logger';
import ExcelJS from 'exceljs';
import { SCFDomainData, SCFControlData, SCFProcessedData } from './types.js';

const logger = LoggerEngine.root().get('scf-excel-parser');

export class ExcelParser {
  private workbook: ExcelJS.Workbook | null = null;

  async parseExcelFile(filePath: string): Promise<SCFProcessedData> {
    try {
      logger.info(`Parsing Excel file: ${filePath}`);

      this.workbook = new ExcelJS.Workbook();
      await this.workbook.xlsx.readFile(filePath);

      if (!this.workbook) {
        throw new Error('Failed to load Excel workbook');
      }

      const sheetNames = this.workbook.worksheets.map(ws => ws.name);
      logger.info(`Available worksheets: ${sheetNames.join(', ')}`);

      const version = this.extractVersion(filePath);
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

    let match = filename.match(/scf-(\d+)-(\d+)-(\d+)\.xlsx$/i);
    if (match) return `${match[1]}.${match[2]}.${match[3]}`;

    match = filename.match(/scf-(\d+)-(\d+)\.xlsx$/i);
    if (match) return `${match[1]}.${match[2]}`;

    match = filename.match(/(\d{4})\.(\d+)\.(\d+)\.xlsx$/i);
    if (match) return `${match[1]}.${match[2]}.${match[3]}`;

    match = filename.match(/(\d{4})\.(\d+)\.xlsx$/i);
    if (match) return `${match[1]}.${match[2]}`;

    const date = new Date();
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
  }

  private cellToString(value: any): any {
    if (value && typeof value === 'object' && value.richText) {
      return value.richText.map((r: any) => r.text).join('');
    }
    return value;
  }

  private sheetToRows(worksheet: ExcelJS.Worksheet): any[][] {
    const rows: any[][] = [];
    worksheet.eachRow({ includeEmpty: false }, (row) => {
      const values = (row.values as any[]).map(v => this.cellToString(v));
      rows.push(values);
    });
    return rows;
  }

  private getSheetNames(): string[] {
    if (!this.workbook) return [];
    return this.workbook.worksheets.map(ws => ws.name);
  }

  private getWorksheet(name: string): ExcelJS.Worksheet | undefined {
    if (!this.workbook) return undefined;
    return this.workbook.worksheets.find(ws => ws.name === name);
  }

  private parseDomains(): SCFDomainData[] {
    if (!this.workbook) throw new Error('Workbook not loaded');

    const domainSheetName = this.findSheetByName(['domains & principles', 'domains', 'domain', 'scf domains']);
    if (!domainSheetName) {
      logger.warning('No domains worksheet found, returning empty array');
      return [];
    }

    logger.info(`Found domains worksheet: ${domainSheetName}`);
    const worksheet = this.getWorksheet(domainSheetName);
    if (!worksheet) return [];

    const jsonData = this.sheetToRows(worksheet);
    return this.processDomainData(jsonData);
  }

  private parseControls(version: string): SCFControlData[] {
    if (!this.workbook) throw new Error('Workbook not loaded');

    const sheetNames = this.getSheetNames();

    // Try exact match for "SCF {version}" worksheet
    const exactVersionSheet = sheetNames.find(name =>
      name.toLowerCase().trim() === `scf ${version}`.toLowerCase()
    );

    if (exactVersionSheet) {
      logger.info(`Found exact version controls worksheet: ${exactVersionSheet}`);
      const worksheet = this.getWorksheet(exactVersionSheet)!;
      return this.processControlData(this.sheetToRows(worksheet));
    }

    const versionKeywords = [
      `scf ${version}`,
      `scf ${version.split('.')[0]}`,
    ];

    const controlSheetName = this.findControlSheetByName(versionKeywords);
    if (!controlSheetName) {
      const sheetWithControls = this.findSheetWithControlHeaders();
      if (sheetWithControls) {
        logger.info(`Found controls worksheet by header detection: ${sheetWithControls}`);
        const worksheet = this.getWorksheet(sheetWithControls)!;
        return this.processControlData(this.sheetToRows(worksheet));
      }
      throw new Error('No SCF controls worksheet found');
    }

    logger.info(`Found controls worksheet: ${controlSheetName}`);
    const worksheet = this.getWorksheet(controlSheetName)!;
    return this.processControlData(this.sheetToRows(worksheet));
  }

  private findSheetByName(keywords: string[]): string | null {
    const sheetNames = this.getSheetNames();

    for (const keyword of keywords) {
      for (const sheetName of sheetNames) {
        if (sheetName.toLowerCase() === keyword.toLowerCase()) return sheetName;
      }
    }

    for (const keyword of keywords) {
      for (const sheetName of sheetNames) {
        if (sheetName.toLowerCase().includes(keyword.toLowerCase())) return sheetName;
      }
    }
    return null;
  }

  private findControlSheetByName(keywords: string[]): string | null {
    const sheetNames = this.getSheetNames();
    const excludePatterns = ['domains', 'principles', 'authoritative', 'assessment', 'evidence', 'risk', 'threat', 'lists', 'privacy'];

    for (const keyword of keywords) {
      for (const sheetName of sheetNames) {
        const lowerSheetName = sheetName.toLowerCase();
        if (excludePatterns.some(pattern => lowerSheetName.includes(pattern))) continue;
        if (lowerSheetName === keyword.toLowerCase()) return sheetName;
      }
    }

    for (const keyword of keywords) {
      for (const sheetName of sheetNames) {
        const lowerSheetName = sheetName.toLowerCase();
        if (excludePatterns.some(pattern => lowerSheetName.includes(pattern))) continue;
        if (lowerSheetName.includes(keyword.toLowerCase())) return sheetName;
      }
    }
    return null;
  }

  private findSheetWithControlHeaders(): string | null {
    if (!this.workbook) return null;
    const controlHeaders = ['SCF #', 'SCF Control'];

    for (const ws of this.workbook.worksheets) {
      const jsonData = this.sheetToRows(ws);
      if (this.findHeaderRow(jsonData, controlHeaders) !== -1) return ws.name;
    }
    return null;
  }

  private processDomainData(rawData: any[][]): SCFDomainData[] {
    if (rawData.length === 0) return [];

    const headerRow = this.findHeaderRow(rawData, ['SCF Domain', 'SCF Identifier']);
    if (headerRow === -1) {
      logger.warning('Domain header row not found');
      return [];
    }

    const headers = rawData[headerRow];
    const domains: SCFDomainData[] = [];

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

      if (domain['SCF Domain'] && domain['SCF Identifier']) {
        domains.push(domain);
      }
    }

    return domains;
  }

  private processControlData(rawData: any[][]): SCFControlData[] {
    if (rawData.length === 0) return [];

    const headerRow = this.findHeaderRow(rawData, ['SCF #', 'SCF Control']);
    if (headerRow === -1) throw new Error('Control header row not found');

    const headers = rawData[headerRow];
    const controls: SCFControlData[] = [];

    for (let i = headerRow + 1; i < rawData.length; i++) {
      const row = rawData[i];
      if (!row || row.length === 0) continue;

      const control = this.mapRowToObject(headers, row, {
        'SCF Domain': '',
        'SCF Control': '',
        'SCF #': '',
        'Secure Controls Framework (SCF)\nControl Description': '',
        'Methods To Comply With SCF Controls': '',
        'Evidence Request List (ERL) #': '',
        'SCF Control Question': '',
        'Relative Control Weighting': '',
        'NIST CSF\nFunction Grouping': '',
        'C|P-CMM 0\nNot Performed': '',
        'C|P-CMM 1\nPerformed Informally': '',
        'C|P-CMM 2\nPlanned & Tracked': '',
        'C|P-CMM 3\nWell Defined': '',
        'C|P-CMM 4\nQuantitatively Controlled': '',
        'C|P-CMM 5\nContinuously Improving': ''
      }) as SCFControlData;

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

      if (matchCount >= expectedHeaders.length) return i;
    }
    return -1;
  }

  private mapRowToObject(headers: any[], row: any[], template: Record<string, string>): Record<string, string> {
    const result: Record<string, string> = { ...template };

    for (let i = 0; i < headers.length && i < row.length; i++) {
      const header = String(headers[i] || '').trim();
      const value = String(row[i] || '').trim();

      if (header && value) {
        if (result.hasOwnProperty(header)) {
          result[header] = value;
        } else {
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
    return this.getSheetNames();
  }

  getWorksheetData(sheetName: string): any[][] {
    const ws = this.getWorksheet(sheetName);
    if (!ws) return [];
    return this.sheetToRows(ws);
  }
}
