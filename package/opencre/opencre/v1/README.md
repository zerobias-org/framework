# OpenCRE Framework Package

This package contains the OpenCRE (Open Common Requirement Enumeration) security framework for ZeroBias.

## Usage

### Standard Update (Recommended)
```bash
npm run update
```
This will:
- Check if local data is older than 24 hours
- Fetch latest data from OpenCRE API (with GitHub fallback)
- Only update if changes are detected
- Preserve existing element UUIDs

### Force Update
```bash
npm run update:force
```
Forces an update regardless of local data age or changes.

### Legacy Update
```bash
npm run update:legacy
```
Uses the original update script with manual JSON file.

## Update Process

The update script:
1. **Version Check**: Compares local data age and content hashes
2. **Data Fetching**: Tries OpenCRE API first, falls back to GitHub
3. **Smart Processing**: Only updates when changes are detected
4. **UUID Preservation**: Maintains existing element IDs
5. **Error Handling**: Robust error handling with detailed logging
6. **Cleanup**: Removes orphaned elements no longer in source
7. **Cross-references**: Generates mappings to other frameworks

## Configuration

Edit `update/update.ts` to modify:
- API endpoints
- Check intervals
- Standard mappings
- Element processing logic

## Validation

Always run validation after updates:
```bash
npm run validate
```

## Data Sources

- Primary: OpenCRE API (`https://opencre.org/rest/v1/cres`)
- Fallback: GitHub raw data
- Local cache: `update/all_cres.json`