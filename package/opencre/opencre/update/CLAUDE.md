# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with the OpenCRE framework package specifically.

## Package Overview

This package (`@zerobias-org/framework-opencre-opencre-v1`) implements the Open Common Requirement Enumeration (OpenCRE) security framework. OpenCRE links security standards and guidelines together at the requirement level into a harmonized resource.

### Package Structure
```
package/opencre/opencre/v1/
├── index.yml           # Framework metadata and definitions
├── package.json        # NPM package configuration
├── .npmrc             # Registry configuration for ZeroBias packages
├── elements/          # 400+ CRE elements (security requirements)
├── update/            # Update automation scripts
│   ├── parse.ts       # Main update script
│   └── all_cres.json  # Source data from OpenCRE API
└── node_modules/      # Dependencies
```

## Update Process

### Overview
The OpenCRE framework is updated from the official OpenCRE database using automated scripts. The process transforms OpenCRE data into the ZeroBias framework format.

### Update Workflow
1. **Fetch latest data**: Update `update/all_cres.json` with latest CRE data from OpenCRE API
2. **Run update script**: Execute `npm run update` to process the data
3. **Validate changes**: Run `npm run validate` to ensure compliance
4. **Review generated files**: Check updated/new elements in `elements/` directory
5. **Test package**: Run validation and dependency checks
6. **Commit changes**: Follow conventional commit format

### Update Script (`update/parse.ts`)

The update script performs these operations:
- **Processes CRE data**: Transforms JSON data from OpenCRE into YAML elements
- **Generates elements**: Creates one YAML file per CRE in `elements/` directory
- **Maps relationships**: Establishes parent-child relationships between CREs
- **Creates cross-references**: Links to other security frameworks (NIST, OWASP, etc.)
- **Preserves existing IDs**: Maintains UUIDs for existing elements during updates

#### Key Features:
- **Standard mappings**: Maps CRE links to other frameworks using `standardFunctionMappings`
- **Relationship types**: Handles "Contains" relationships for hierarchical structure
- **Link generation**: Creates `demonstrates` links to show CRE-to-standard mappings
- **ID preservation**: Keeps existing UUIDs when updating elements

### Running Updates

```bash
# Navigate to package directory
cd package/opencre/opencre/v1/

# Install dependencies (critical for update script)
npm install

# Run the update process
npm run update           # Now automatically saves 427 elements

# Validate the updated framework
npm run validate

# Correct dependencies if needed
npm run correct:deps

# Update package lock
npm shrinkwrap
```

### Common Update Issues

#### Missing Dependencies
- **Issue**: `Cannot find package 'js-yaml'` error when running update script
- **Solution**: Ensure `js-yaml` is in package.json dependencies (not just @types/js-yaml)
- **Fix**: Added `"js-yaml": "^4.1.0"` to devDependencies

#### Dependency Installation Order
- **Root first**: Always run `npm install` in root directory for shared tooling
- **Package level**: Then install package-specific dependencies for update scripts
- **Validation**: Shared TypeScript tools from root needed for validation scripts

### Automated Update Workflow
```bash
# Full automated update with PR creation
npm run update && npm run validate && \
git checkout -b "update/opencre-$(date +%Y%m%d)" && \
git add -A && \
git commit -m "feat(opencre): automated framework update - $(date +%Y-%m-%d)" && \
git push -u origin HEAD && \
gh pr create --title "Update OpenCRE Framework $(date +%Y-%m-%d)" \
  --body "Automated update from OpenCRE database. Processed $(ls elements/*.yml | wc -l) elements."
```

## Element Structure

### CRE Element Format
Each element in `elements/` follows this structure:
```yaml
id: <UUID>                    # Unique identifier (preserved across updates)
name: <CRE Name>             # Human-readable name
description: <Description>    # CRE description
externalId: <CRE-ID>         # Original CRE identifier (e.g., "002-630")
elementType: cre             # Always "cre" for this framework
links:                       # Optional cross-references
  demonstrates:              # Links to other security standards
    - nist.80053.rev5.framework/sc-23_3
    - owasp.asvs.v4_0_3.framework/3.2.1
    - CWE-384
parent: <Parent-CRE-ID>      # Optional parent relationship
```

### Framework Mappings
The update script maps CRE links to these frameworks:
- **NIST 800-53 v5**: `nist.80053.rev5.framework/`
- **OWASP ASVS**: `owasp.asvs.v4_0_3.framework/`
- **Cloud Controls Matrix**: `csa.ccm.v4_0_12.framework/`
- **OWASP SAMM**: `owasp.samm.v1_0.framework/`
- **ISO 27001**: `iso.27001.2013.framework/`
- **NIST SSDF**: `nist.800_218.v1_1.framework/`
- **CWE**: Direct reference (e.g., `CWE-384`)
- **CAPEC**: Direct reference (e.g., `CAPEC-196`)

## Common Tasks

### Updating Framework from OpenCRE
1. Obtain latest data from OpenCRE API or export
2. Replace content in `update/all_cres.json`
3. Run `npm run update` to regenerate elements
4. Validate with `npm run validate`
5. Review changes and commit

### Adding New Standard Mappings
1. Edit `standardFunctionMappings` in `update/parse.ts`
2. Add mapping function for new standard
3. Run update process to apply mappings
4. Test and validate results

### Validating Changes
```bash
# Validate framework structure
npm run validate

# Check for validation errors
npm run prepublishtest

# Fix dependency issues
npm run correct:deps
```

### Publishing Updates
```bash
# From root directory, run full validation
npm run validate

# Build and prepare packages
npm run build

# Publish through Lerna (from root)
npm run lerna:publish
```

## Development Notes

- **Element IDs**: UUIDs are preserved during updates to maintain referential integrity
- **External IDs**: Use original CRE identifiers (e.g., "002-630") for traceability
- **Parent relationships**: Based on "Is Part Of" links in OpenCRE data (fixed from "Contains")
- **Cross-references**: Links to other frameworks use package notation for internal references
- **Registry**: Uses ZeroBias package registry requiring `ZB_TOKEN` authentication

## Automated Workflow Improvements

### Framework Update Detection
To streamline framework updates and reduce manual work:

#### GitHub Actions Automation
```yaml
# .github/workflows/framework-update.yml
name: Framework Update Check
on:
  schedule:
    - cron: '0 6 * * *'  # Daily at 6 AM
  workflow_dispatch:

jobs:
  check-updates:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Check for OpenCRE updates
        run: |
          cd package/opencre/opencre/v1
          npm run update
          if git diff --quiet; then
            echo "No changes detected"
          else
            echo "Changes detected, creating PR"
            # Auto-commit and create PR logic here
          fi
```

#### Automated PR Creation Workflow
1. **Detection**: Schedule checks for framework source updates
2. **Processing**: Run update scripts when changes detected
3. **Validation**: Ensure all validation passes
4. **Branch Creation**: Auto-create feature branch with descriptive name
5. **Commit**: Generate smart commit message based on changes
6. **PR Creation**: Open PR with change summary and validation results

#### Smart Commit Messages
The update script can generate intelligent commit messages:
```bash
# Examples:
"feat(opencre): update framework with 15 new elements and 23 modified mappings"
"fix(opencre): correct parent relationships for session management elements"
"chore(opencre): sync with OpenCRE database v2024.1"
```

### Notification Integration
- **Slack/Teams**: Alert team when updates are available
- **Email**: Critical framework change notifications
- **Dashboard**: Monitor all framework update status

## Performance Optimizations

### Parallel Processing
For large frameworks, process elements in parallel:
```typescript
// Process elements in batches of 50
const batchSize = 50;
const batches = chunk(elements, batchSize);
const results = await Promise.all(
  batches.map(batch => processBatch(batch))
);
```

### Incremental Updates
- **Change Detection**: Only update modified elements
- **Checksums**: Track element changes to avoid unnecessary processing
- **Caching**: Cache API responses and validation results

### File I/O Optimization
- **Batch Operations**: Write multiple files in parallel
- **Streaming**: Use streams for large data processing
- **Memory Management**: Process large datasets in chunks

## Development Workflow Best Practices

### Automated Quality Gates
1. **Pre-commit Validation**: Run validation before any commit
2. **Change Impact Analysis**: Show what elements were modified
3. **Cross-reference Verification**: Validate all framework links
4. **Performance Monitoring**: Track processing times and bottlenecks

### CI/CD Integration
```bash
# Automated validation pipeline
npm run validate          # Framework structure validation
npm run correct:deps      # Dependency management
npm run build            # Build validation
npm run lerna:test       # Run tests
```

### Framework Update Commands
```bash
# Quick update workflow
npm run update           # Fetch and process latest data
npm run validate         # Validate generated framework
git add -A && git commit -m "feat(opencre): update framework"
gh pr create --title "Update OpenCRE framework" --body "Automated update from OpenCRE database"
```

## Troubleshooting

### Common Issues
- **Validation errors**: Check element structure and required fields
- **Missing mappings**: Unmapped standards are logged during update process
- **Authentication**: Ensure `ZB_TOKEN` is set for package registry access
- **Dependency conflicts**: Run `npm run correct:deps` to fix version issues
- **Parent relationship errors**: Ensure using "Is Part Of" links, not "Contains" links
- **Element generation failures**: Check that `saveElementsToFiles` method is implemented

### Update Script Debugging
- Check console output for unmapped standards
- Review generated mapping files for cross-references
- Verify element count matches expected CRE database size (should be ~427 elements)
- Ensure parent-child relationships are correctly established
- Monitor processing time for performance issues

### Recent Fixes
- **Parent Logic Fix** (2025-07-10): Changed from "Contains" to "Is Part Of" relationships in `update/update.ts:340`
- **Element Generation Fix** (2025-07-10): Fixed empty `processDataInMemory` and missing `saveElementsToFiles` logic
- **Performance**: Added parallel processing capabilities and better error handling
- **Automation**: Enhanced update script to automatically save elements to filesystem