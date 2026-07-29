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

// Keys are the literal SCF workbook column headers (embedded newlines and all).
// SCF renamed the maturity columns SP-CMM -> C|P-CMM as of 2024.x, and dropped
// "Methods To Comply With SCF Controls" as of 2025.4 in favour of the per-firm-size
// "Possible Solutions & Considerations" columns — both stay optional so older
// cached workbooks still parse.
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
  'C|P-CMM 0\nNot Performed': string;
  'C|P-CMM 1\nPerformed Informally': string;
  'C|P-CMM 2\nPlanned & Tracked': string;
  'C|P-CMM 3\nWell Defined': string;
  'C|P-CMM 4\nQuantitatively Controlled': string;
  'C|P-CMM 5\nContinuously Improving': string;
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