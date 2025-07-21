# SCF Framework Update System

This directory contains the automated update system for the Secure Controls Framework (SCF) from ComplianceForge. The system is a production-ready TypeScript application that automatically discovers, downloads, and processes SCF releases from GitHub.

## Current System Architecture

### Core Files
- **`index.ts`** - Main SCF updater class and CLI interface
- **`github-client.ts`** - GitHub API client for releases and asset downloads
- **`excel-parser.ts`** - Excel file parser for SCF data extraction
- **`types.ts`** - TypeScript type definitions for all data structures
- **`cache/`** - Local cache for downloaded Excel files
- **`package.json`** - NPM package with proper dependencies and scripts

### Key Features
✅ **Professional TypeScript Architecture** - Full type safety and error handling  
✅ **GitHub API Integration** - Automatic release discovery and version comparison  
✅ **Robust Download System** - Retry logic, timeout handling, and caching  
✅ **Excel Processing** - Comprehensive parsing of SCF domains and controls  
✅ **Framework Generation** - Complete package structure with proper metadata  
✅ **Logging System** - Structured logging with `@auditmation/util-logger`  
✅ **Version Management** - Intelligent version comparison and change detection  
✅ **Element Processing** - Domains, controls, enhancements with CMM levels  
✅ **Package Management** - NPM shrinkwrap and dependency management  

## How It Works

### 1. Current Version Detection
The system determines the current version by scanning cached Excel files:
```typescript
private getCurrentVersion(): string | undefined {
  if (!fs.existsSync(this.config.localCachePath)) return undefined;
  
  const excelFiles = fs.readdirSync(this.config.localCachePath)
    .filter(file => file.includes('secure-controls-framework') && file.endsWith('.xlsx'));
  
  if (excelFiles.length === 0) return undefined;
  
  // Extract version from filename like "secure-controls-framework-scf-2025-2-1.xlsx"
  const match = excelFiles[0].match(/scf-(\d+)-(\d+)-(\d+)\.xlsx$/);
  return match ? `${match[1]}.${match[2]}.${match[3]}` : undefined;
}
```

### 2. GitHub Release Discovery
The system checks GitHub releases for the latest SCF version:
```typescript
const release = await this.githubClient.getLatestRelease();
const excelAsset = release.assets.find(asset => 
  asset.name.toLowerCase().includes('.xlsx') && 
  asset.name.toLowerCase().includes('secure-controls-framework')
);
```

### 3. Version Comparison
Uses semantic versioning to compare current vs latest:
```typescript
if (currentVersion && this.compareVersions(latestVersion, currentVersion) <= 0) {
  return null; // No update needed
}
```

### 4. Download & Cache
Downloads Excel files with retry logic and caches them locally:
```typescript
const excelPath = await this.downloadWithRetry(versionInfo);
```

### 5. Excel Processing
Parses SCF Excel files to extract domains and controls:
```typescript
const scfData = await this.excelParser.parseExcelFile(excelPath);
```

### 6. Framework Generation
Creates complete framework packages with proper structure:
```typescript
const elementsProcessed = await this.processAndSaveElements(scfData);
```

## SCF Data Model

### Framework Structure
```
package/complianceforge/scf/
├── update/                           # This directory - update tooling
├── 2025.2.1/                        # Generated version package
│   ├── package.json                 # NPM package configuration
│   ├── index.yml                    # Framework metadata
│   ├── .npmrc                       # NPM registry configuration
│   ├── npm-shrinkwrap.json          # Locked dependencies
│   └── elements/                    # Individual control and domain files
│       ├── ac.yml                   # Domain: Access Control
│       ├── ac-01.yml                # Control: Access Control Policy
│       └── ac-01.1.yml              # Enhancement: Policy Enhancement
```

### Element Types

#### 1. Domains (`elementType: 'domain'`)
High-level security areas that group related controls:
```yaml
id: generated-uuid
name: "Access Control"
description: "Access control policies and procedures ensure..."
elementType: domain
externalId: "AC"
intent: "Principle intent description"
```

#### 2. Controls (`elementType: 'control'`)
Specific security requirements within domains:
```yaml
id: generated-uuid
name: "Access Control Policy"
description: "The organization develops, documents, and disseminates..."
elementType: control
externalId: "AC-01"
parent: "ac"
controlQuestion: "Does the organization have an access control policy?"
methodsToComply: "Implementation guidance..."
functionGrouping: "Identify"
controlWeighting: "High"
cmm_0:
  name: "Not Performed"
  description: "No access control policy exists"
  available: true
  value: 0
# ... cmm_1 through cmm_5
```

#### 3. Enhancements (`elementType: 'enhancement'`)
Additional security measures that extend controls:
```yaml
id: generated-uuid
name: "Policy Reviews"
description: "Reviews and updates to the access control policy..."
elementType: enhancement
externalId: "AC-01.1"
parent: "ac-01"
# ... similar structure to controls
```

### Capability Maturity Model (CMM)
Each control includes 6 maturity levels (0-5):
- **Level 0**: Not Performed
- **Level 1**: Performed Informally
- **Level 2**: Planned & Tracked
- **Level 3**: Well Defined
- **Level 4**: Quantitatively Controlled
- **Level 5**: Continuously Improving

## Change Detection Mechanism

### Current Implementation
The system uses a file-based approach for change detection:

1. **Current Version Detection**
   - Scans `cache/` directory for Excel files
   - Extracts version from filename pattern: `secure-controls-framework-scf-2025-2-1.xlsx`
   - Uses regex: `/scf-(\d+)-(\d+)-(\d+)\.xlsx$/`

2. **GitHub Release Comparison**
   - Fetches latest release from GitHub API
   - Compares current version with latest using semantic versioning
   - Returns `null` if no update needed, `SCFVersionInfo` if update available

3. **Download Validation**
   - Validates file size against expected size from GitHub
   - Re-downloads if size mismatch detected
   - Caches files locally to avoid repeated downloads

### Change Detection Flow
```typescript
// 1. Get current version from cache
const currentVersion = this.getCurrentVersion();

// 2. Check for new version
const newVersionInfo = await this.githubClient.checkForNewVersion(currentVersion);

// 3. Process if new version found
if (newVersionInfo) {
  await this.processUpdate(newVersionInfo);
} else {
  return { success: true, skipped: true, reason: 'No new version available' };
}
```

### Limitations
- **File-based tracking**: Depends on cached Excel files for version detection
- **No state persistence**: No tracking of processing status or failures
- **Single file detection**: Only checks first matching file in cache
- **Size-only validation**: No content hash validation for integrity

## Usage

### Command Line Interface
```bash
# Check for updates and process if needed
npm run update

# Force update regardless of version
npm run update --force

# Build TypeScript
npm run build

# Run tests
npm run test
```

### Programmatic Usage
```typescript
import { SCFUpdater } from './index';

const config: SCFUpdateConfig = {
  githubRepo: 'securecontrolsframework/securecontrolsframework',
  githubApiUrl: 'https://api.github.com',
  localCachePath: path.join(process.cwd(), 'cache'),
  elementsPath: path.join(process.cwd(), '../'),
  timeout: 60000,
  retryAttempts: 3,
  retryDelay: 2000
};

const updater = new SCFUpdater(config);
const result = await updater.run(false);
```

## Configuration

### Environment Variables
The system uses configuration from `package.json` and runtime config:
```json
{
  "name": "@zerobias-org/framework-complianceforge-scf-update",
  "version": "1.0.1",
  "private": true,
  "dependencies": {
    "@auditmation/types-core-js": "^4.9.11",
    "@auditmation/util-logger": "^4.0.9",
    "axios": "^0.27.2",
    "exceljs": "^4.4.0",
    "js-yaml": "^4.1.0",
    "xlsx": "^0.18.5"
  }
}
```

### Update Configuration
```typescript
const CONFIG: SCFUpdateConfig = {
  githubRepo: 'securecontrolsframework/securecontrolsframework',
  githubApiUrl: 'https://api.github.com',
  localCachePath: path.join(process.cwd(), 'cache'),
  elementsPath: path.join(process.cwd(), '../'),
  timeout: 60000,
  retryAttempts: 3,
  retryDelay: 2000
};
```

## Generated Package Structure

### Package.json Template
```json
{
  "name": "@zerobias-org/framework-complianceforge-scf-2025.2.1",
  "version": "1.0.0",
  "description": "ComplianceForge SCF 2025.2.1 Controls",
  "repository": {
    "type": "git",
    "url": "https://github.com/zerobias-org/framework.git",
    "directory": "package/complianceforge/scf/2025.2.1/"
  },
  "auditmation": {
    "package": "complianceforge.scf.2025_2_1.framework",
    "import-artifact": "framework",
    "dataloader-version": "3.29.26"
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/"
  }
}
```

### Framework Index (index.yml)
```yaml
id: generated-framework-uuid
name: Secure Controls Framework 2025.2.1
description: ComplianceForge Secure Controls Framework 2025.2.1
code: scf_2025_2_1
status: approved
url: https://securecontrolsframework.com/
version: 2025.2.1
external: true
internal: true
elementTypes:
  - id: domain-type-uuid
    code: domain
    name: Domain
    description: SCF Security Domain
  - id: control-type-uuid
    code: control
    name: Control
    description: SCF Security Control
  - id: enhancement-type-uuid
    code: enhancement
    name: Enhancement
    description: SCF Control Enhancement
mappingTypes:
  - control
  - enhancement
```

## Error Handling & Logging

### Logging System
Uses `@auditmation/util-logger` for structured logging:
```typescript
const logger = getLogger('scf-updater');
logger.info('Starting SCF framework update...');
logger.error('Update failed:', error);
```

### Error Handling
- **Network errors**: Retry logic with exponential backoff
- **File system errors**: Graceful handling with cleanup
- **Parse errors**: Detailed error reporting with context
- **Version conflicts**: Clear messaging and force options

### Cleanup Operations
- **Orphaned elements**: Removes elements no longer in SCF
- **Cache management**: Maintains local cache efficiently
- **File system**: Ensures proper directory structure

## Integration with Framework Ecosystem

### ZeroBias Framework Architecture
The system integrates with the broader zerobias-org/framework monorepo:
- **Lerna compatibility**: Follows monorepo patterns
- **NPM publishing**: GitHub Package Registry integration
- **Validation scripts**: Framework structure validation
- **Dependency management**: Automated dependency updates

### Auditmation Integration
Generated packages include Auditmation-specific metadata:
```json
{
  "auditmation": {
    "package": "complianceforge.scf.2025_2_1.framework",
    "import-artifact": "framework",
    "dataloader-version": "3.29.26"
  }
}
```

## Developer Guidelines

### Extending the System
1. **New data sources**: Extend `GitHubClient` or create new clients
2. **Additional parsing**: Modify `ExcelParser` or create format-specific parsers
3. **Custom elements**: Extend `SCFElement` interface and processing logic
4. **New frameworks**: Follow the same pattern in parallel directories

### Testing
Currently uses basic test setup. Recommended additions:
- **Unit tests**: For individual components
- **Integration tests**: For full update workflow
- **Mock services**: For GitHub API testing
- **Validation tests**: For generated framework structure

### Performance Considerations
- **Caching**: Excel files cached to avoid repeated downloads
- **Incremental updates**: Only processes changed elements
- **Memory management**: Streams large Excel files when possible
- **Parallel processing**: Processes elements concurrently

## Current State

### What's Working
✅ **GitHub API Integration** - Discovers latest releases automatically  
✅ **Excel Processing** - Parses SCF data from Excel files  
✅ **Framework Generation** - Creates complete package structures  
✅ **Version Management** - Compares and tracks versions  
✅ **Element Processing** - Generates domains, controls, enhancements  
✅ **Package Management** - NPM shrinkwrap and dependency handling  
✅ **Error Handling** - Robust error recovery and logging  

### Recent Updates
- **Professional TypeScript architecture** with full type safety
- **Comprehensive logging** with structured error reporting
- **Retry mechanisms** for network operations
- **Cache management** for efficient processing
- **Clean object handling** to remove undefined values
- **Orphaned element cleanup** to maintain data integrity

This system represents a production-ready solution for maintaining SCF frameworks with minimal manual intervention while ensuring data integrity and compatibility with the broader framework ecosystem.