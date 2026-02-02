# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Setup and Installation
- **Initial setup**: `npm install` (run in root directory first to setup husky hooks)
- **Bootstrap all packages**: `npm run bootstrap`
- **Install dependencies**: `npm install` (in individual package directories)

### Building and Testing
- **Build all packages**: `npm run build`
- **Validate frameworks**: `npm run validate`
- **Run tests**: `npm run lerna:test`
- **Clean build artifacts**: `npm run clean`
- **Full reset**: `npm run reset` (clean, correct deps, bootstrap, build)

### Lerna Operations
- **Dry run version bump**: `npm run lerna:dry-run`
- **Version packages**: `npm run lerna:version`
- **Publish packages**: `npm run lerna:publish`

### Individual Package Commands
When working in a specific framework package (e.g., `package/opencre/opencre/v1/`):
- **Validate framework**: `npm run validate`
- **Correct dependencies**: `npm run correct:deps`
- **Prepare for publish**: `npm run prepublishtest`

## Repository Architecture

### Monorepo Structure
This is a Lerna-managed monorepo containing security framework packages. The key directories are:

- **`package/`**: Contains all framework packages organized by vendor/suite/version
  - Structure: `package/{vendor}/{suite}/{version}/`
  - Example: `package/opencre/opencre/v1/`, `package/nist/800-218/v1.1/`
- **`scripts/`**: Build and utility scripts
- **`templates/`**: Template files for creating new frameworks
- **`bundle/`**: Bundled package artifacts

### Framework Package Structure
Each framework package follows this structure:
- **`index.yml`**: Main framework definition (metadata, element types, mapping types)
- **`elements/`**: Individual framework elements (controls, requirements) as YAML files
- **`baselines/`**: Optional baseline definitions for different coverage levels
- **`package.json`**: NPM package configuration with specific naming conventions
- **`.npmrc`**: NPM registry configuration

### Technology Stack
- **Lerna**: Monorepo management and versioning
- **Nx**: Build system and caching
- **TypeScript**: Validation scripts and tooling
- **YAML**: Framework definition format
- **Husky**: Git hooks for commit validation

## Framework Development Workflow

### Creating a New Framework
1. Use the creation script: `scripts/createNewFramework.sh <standard_category> <publisher> <category> <version>`
2. Update placeholders in `index.yml` (replace `{field}` values)
3. Add elements to `elements/` directory
4. Optionally add baselines to `baselines/` directory
5. Run validation: `npm run validate`

### Framework Validation Rules
- Package names must follow format: `@zerobias-org/framework-{code-with-dashes}`
- Element/baseline codes must be lowercase alphanumeric with _ or - only
- All framework elements must reference valid element types defined in `index.yml`
- Parent-child relationships must reference existing elements
- Baselines must reference existing elements

### Commit and Versioning
- Follow Conventional Commits specification
- Commit messages format: `<type>(<scope>): <subject>`
- Types: feat, fix, docs, style, refactor, perf, test, chore
- Lerna automatically handles versioning and changelog generation
- No manual version bumps in pull requests

## Authentication and Registry
- Set `ZB_TOKEN` environment variable for NPM registry authentication
- Packages publish to GitHub Package Registry: `https://npm.pkg.github.com/`
- ZB_TOKEN should be an API key from ZeroBias platform

## Framework Definition Schema

### Core Framework Structure
Each framework must contain these required files:
- **`index.yml`**: Framework metadata with required fields:
  - `id`: UUID for the framework
  - `name`: Human-readable framework name
  - `description`: Framework description
  - `code`: Unique framework code (format: `{vendor}_{suite}_{version}`)
  - `externalId`: External identifier for the framework
  - `url`: Framework's official URL
  - `elementTypes`: Array of element type definitions
  - `mappingTypes`: Array of mappable element types
- **`package.json`**: NPM package with specific naming: `@zerobias-org/framework-{code-with-dashes}`
- **`.npmrc`**: Registry configuration for GitHub Package Registry

### Element Structure
Elements in the `elements/` directory must follow:
- Filename format: lowercase alphanumeric with `_` or `-` only
- Required fields: `id`, `name`, `description`, `externalId`, `elementType`
- Optional fields: `parent`, `aliases`
- Parent-child relationships must reference existing elements

### Baseline Structure
Baselines in the `baselines/` directory define coverage levels:
- Required fields: `id`, `name`, `description`, `elements`
- Elements map with `mandatory` boolean flag
- All referenced elements must exist in the framework

## Validation and Quality Assurance

### Validation Script (`scripts/validate.ts`)
The validation script performs comprehensive checks:
- Framework metadata validation
- Package.json compliance with naming conventions
- Element type consistency
- Parent-child relationship integrity
- Baseline element references
- UUID format validation
- Code format validation (lowercase alphanumeric with _ or -)

### Dependency Management
- **`scripts/correctDeps.ts`**: Automatically updates dependencies to `latest` (except RC versions)
- Run `npm run correct:deps` to update dependencies across all packages

## Development Workflow

### Working with Individual Frameworks
When working in a specific framework package:
1. Navigate to the framework directory: `cd package/{vendor}/{suite}/{version}/`
2. Install dependencies: `npm install`
3. Make your changes to `index.yml`, `elements/`, or `baselines/`
4. Validate your changes: `npm run validate`
5. Correct dependencies if needed: `npm run correct:deps`
6. Run shrinkwrap: `npm shrinkwrap`

### Framework Creation Process
1. Use creation script: `scripts/createNewFramework.sh <standard_category> <vendor> <suite> <version>`
2. Replace template placeholders in generated files:
   - `{id}` → Generate new UUID
   - `{name}` → Framework name
   - `{description}` → Framework description
   - `{externalId}` → External identifier
   - `{url}` → Framework URL
   - `{elementType}` → Element type code
3. Add framework elements to `elements/` directory
4. Add baselines to `baselines/` directory (if applicable)
5. Run validation to ensure compliance

## Automated Daily Updates

### Daily Update Workflow
- **Automated workflow**: `.github/workflows/daily-update.yml` runs daily at 2 AM UTC
- **Process**: Discovers packages with `update` scripts, runs updates, creates PR to `dev` branch
- **Dependencies**: Root `npm install` required for shared tooling (Lerna, TypeScript, etc.)
- **Error handling**: Workflow fails fast on package update failures or PR creation issues
- **Summary**: Each run generates a summary showing updated/failed packages

### Dependency Requirements
- **Root dependencies**: Essential for monorepo tooling and shared TypeScript tools
- **Package dependencies**: Required for update scripts (e.g., `js-yaml` for YAML processing)
- **Installation order**: Always install root dependencies first, then package-level dependencies

### Troubleshooting Updates
- **Missing modules**: Check package.json for missing dependencies like `js-yaml`
- **Update failures**: Review workflow logs for specific package errors
- **PR creation**: Uses GitHub CLI with default GITHUB_TOKEN permissions

## ZeroBias Task Integration

For creating frameworks from ZeroBias tasks, use the skill:

```
/create-framework [task-id]
```

See **[.claude/skills/create-framework.md](.claude/skills/create-framework.md)** for the complete workflow.

### Quick Reference

**Orchestration Documentation:**
- [Meta-repo: DEPENDENCY_CHAIN.md](../../docs/orchestration/DEPENDENCY_CHAIN.md) - **STRICT dependency rules**
- [Meta-repo: TASK_MANAGEMENT.md](../../docs/orchestration/TASK_MANAGEMENT.md) - Task API patterns
- [Meta-repo: API_REFERENCE.md](../../docs/orchestration/API_REFERENCE.md) - Quick API reference

**Additional Resources:**
- [.claude/workflows/artifact-creation.md](.claude/workflows/artifact-creation.md) - Detailed creation workflow
- [.claude/workflows/task-management.md](.claude/workflows/task-management.md) - Task management patterns

**Dependency Chain:**
```
vendor → suite → framework
```

**CRITICAL:** Frameworks require BOTH vendor AND suite. Check/create them first.

### Key APIs

```javascript
// Check dependencies exist (REQUIRED before framework)
zerobias_execute("portal.Vendor.search", { searchVendorBody: { search: "vendor" }})
zerobias_execute("portal.Suite.search", { searchSuiteBody: { search: "vendor suite" }})

// Check if framework exists
zerobias_execute("portal.Framework.search", { searchFrameworkBody: { search: "framework" }})

// Get your party ID for assignment
zerobias_execute("platform.Party.getMyParty", {})

// Transition task to in_progress (use transitionId, NOT status)
zerobias_execute("platform.Task.update", {
  id: taskId,
  updateTask: {
    assigned: partyId,
    transitionId: "7f140bbe-4c10-54ac-922c-460c66392fad"
  }
})

// Link tasks together
zerobias_execute("platform.Resource.linkResources", {
  fromResource: sourceTaskId,
  toResource: targetTaskId,  // Note: toResource, NOT toResourceId
  linkType: "b8bd95d0-b33c-11f0-8af3-dfaccf31600e"  // relates_to
})
```

### Workflow Transitions

| Transition | Target Status | ID |
|------------|---------------|-----|
| Start | in_progress | `7f140bbe-4c10-54ac-922c-460c66392fad` |
| Peer Review | awaiting_approval | `f017a447-0994-594d-9417-39cbc9a4de88` |
| Accept | released | `1d2e9381-f609-5e26-8bc6-7bbb65a9048d` |

**Note:** Always get actual IDs from `task.nextTransitions`.

---

## Important Notes
- Always run `npm install` in root directory first to setup husky hooks
- PRs must target the `dev` branch (not `main`)
- Framework versions start at `0.0.0` and are managed by Lerna
- Use `premajor` label for frameworks graduating to `1.0.0`
- Validation scripts ensure framework integrity before publication
- Framework codes must follow format: `{vendor}_{suite}_{version}` (underscores)
- Package names use dashes: `@zerobias-org/framework-{code-with-dashes}`
- Element and baseline codes must be lowercase alphanumeric with `_` or `-` only