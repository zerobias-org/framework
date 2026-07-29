export interface GitHubRelease {
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  assets: GitHubAsset[];
}

export interface GitHubAsset {
  name: string;
  browser_download_url: string;
  size: number;
  content_type: string;
}

export interface SCFUpdateConfig {
  githubRepo: string;
  githubApiUrl: string;
  localCachePath: string;
  elementsPath: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
}

export interface SCFVersionInfo {
  version: string;
  releaseDate: string;
  assetUrl: string;
  assetName: string;
  assetSize: number;
}

export interface SCFDomainData {
  'SCF Domain': string;
  'SCF Identifier': string;
  'Cybersecurity & Data Privacy by Design (C|P) Principles': string;
  'Principle Intent': string;
}

// Keys are the literal SCF workbook column headers (embedded newlines and all),
// except the `cmm_n` fields which ExcelParser.resolveCmmColumns normalizes.
// SCF renamed the maturity columns twice — SP-CMM n -> C|P-CMM n (2024.x) ->
// SCR-CMM Level n (2026.2) — so they are matched by level number, not name.
// "Methods To Comply With SCF Controls" was dropped in 2025.4 in favour of the
// per-firm-size "Possible Solutions & Considerations" columns, so it stays
// optional and older cached workbooks still parse.
export interface SCFControlData {
  'SCF Domain': string;
  'SCF Control': string;
  'SCF #': string;
  'Secure Controls Framework (SCF)\nControl Description': string;
  'Methods To Comply With SCF Controls'?: string;
  'Evidence Request List (ERL) #': string;
  'SCF Control Question': string;
  'Relative Control Weighting': string;
  'NIST CSF\nFunction Grouping': string;
  cmm_0?: string;
  cmm_1?: string;
  cmm_2?: string;
  cmm_3?: string;
  cmm_4?: string;
  cmm_5?: string;
  [key: string]: string | undefined; // For dynamic framework mappings
}

export interface SCFProcessedData {
  version: string;
  domains: SCFDomainData[];
  controls: SCFControlData[];
  metadata: {
    totalControls: number;
    totalDomains: number;
    processedAt: string;
  };
}

export interface SCFElement {
  id: string;
  name: string;
  description?: string;
  elementType: 'domain' | 'control' | 'enhancement';
  externalId: string;
  parent?: string;
  intent?: string;
  controlQuestion?: string;
  methodsToComply?: string;
  controlWeighting?: string;
  functionGrouping?: string;
  cmm_0?: SCFMaturityLevel;
  cmm_1?: SCFMaturityLevel;
  cmm_2?: SCFMaturityLevel;
  cmm_3?: SCFMaturityLevel;
  cmm_4?: SCFMaturityLevel;
  cmm_5?: SCFMaturityLevel;
}

export interface SCFMaturityLevel {
  name: string;
  description: string;
  available: boolean;
  value: number;
}

export interface SCFFrameworkIndex {
  id: string;
  name: string;
  code: string;
  description: string;
  externalId: string;
  status: string;
  url: string;
  version: string;
  internal: boolean;
  external: boolean;
  elementTypes: SCFElementType[];
  mappingTypes: string[];
}

export interface SCFElementType {
  id: string;
  code: string;
  name: string;
  description: string;
}

export interface UpdateResult {
  success: boolean;
  version?: string;
  elementsProcessed?: number;
  error?: string;
  skipped?: boolean;
  reason?: string;
}