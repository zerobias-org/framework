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

export interface SCFControlData {
  'SCF Domain': string;
  'SCF Control': string;
  'SCF #': string;
  'Secure Controls Framework (SCF)\r\nControl Description': string;
  'Methods To Comply With SCF Controls'?: string;
  'Evidence Request List (ERL) #': string;
  'SCF Control Question': string;
  'Relative Control Weighting': string;
  'NIST CSF\r\nFunction Grouping': string;
  'SP-CMM 0\r\nNot Performed': string;
  'SP-CMM 1\r\nPerformed Informally': string;
  'SP-CMM 2\r\nPlanned & Tracked': string;
  'SP-CMM 3\r\nWell Defined': string;
  'SP-CMM 4\r\nQuantitatively Controlled': string;
  'SP-CMM 5\r\nContinuously Improving': string;
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