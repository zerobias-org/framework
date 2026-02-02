# Artifact Creation Workflow

This workflow guides Claude through creating compliance artifacts (vendors, suites, frameworks, products) with proper dependency resolution and ZeroBias task integration.

## Prerequisites

- Access to ZeroBias MCP tools
- Local repository clones available
- Understanding of dependency chain: `vendor → suite → framework/standard/benchmark → crosswalk`

---

## Phase 1: Task Analysis

### 1.1 Retrieve Task Details

```javascript
// Get full task details
const task = zerobias_execute("platform.Task.get", { id: taskId })
```

### 1.2 Extract Artifact Information

From the task, identify:
- **Artifact type**: Check `links[]` for `catalog_request` type or parse from task name
- **Vendor**: Publisher/organization (e.g., "nist", "eu", "aiuc")
- **Suite**: Product family or standard series (e.g., "800-53", "ai", "aiuc-1")
- **Version**: Artifact version (e.g., "v2024", "r5", "v1")
- **Source URL**: Official documentation URL

### 1.3 Parse Task Links

```javascript
// Extract catalog request details
const catalogRequest = task.links?.find(l => l.type === "catalog_request")
if (catalogRequest) {
  // Parse: artifactType, vendor, suite, version, sourceUrl from description
}
```

### 1.4 Update Task Status

**Use transitionId from task.nextTransitions, not status field:**

```javascript
// Find "Start" transition from task.nextTransitions
const startTransition = task.nextTransitions.find(t => t.status === "in_progress")

zerobias_execute("platform.Task.update", {
  id: taskId,
  updateTask: { transitionId: startTransition.id }
})

zerobias_execute("platform.Task.addComment", {
  id: taskId,
  newTaskComment: {
    commentMarkdown: "**Started:** Analyzing task requirements and checking dependencies."
  }
})
```

---

## Phase 2: Dependency Resolution

### CRITICAL: Check and Create Dependencies First

**You MUST check dependencies before creating any artifact. If dependencies are missing, CREATE THEM FIRST.**

### 2.1 Dependency Chain (Follow in Order)

```
vendor (create first if missing)
  → suite (create after vendor exists)
    → framework/standard/benchmark (create after suite exists)
      → crosswalk (create after both frameworks exist)
```

### 2.2 Check and Create Dependencies IN ORDER

```javascript
// STEP 1: Check vendor FIRST
const vendors = zerobias_execute("portal.Vendor.search", {
  searchVendorBody: { search: vendorCode }
})

if (vendors.items.length === 0) {
  // Vendor missing - CREATE IT NOW
  // 1. Navigate to vendor repo
  // 2. Create vendor package (see Phase 4.1)
  // 3. Commit and push
  // 4. Continue to step 2
}

// STEP 2: Check suite (vendor now exists)
const suites = zerobias_execute("portal.Suite.search", {
  searchSuiteBody: { search: `${vendorCode} ${suiteCode}` }
})

if (suites.items.length === 0) {
  // Suite missing - CREATE IT NOW
  // 1. Navigate to suite repo
  // 2. Create suite package (see Phase 4.2)
  // 3. Commit and push
  // 4. Continue to step 3
}

// STEP 3: Now create the framework (vendor and suite exist)
// Continue to Phase 3
```

### 2.3 Workflow Continues in Correct Order

**When a dependency is missing:**
1. Create the dependency artifact in its respective repo
2. Commit and push the dependency
3. Continue with the next dependency or target artifact
4. All done in the same workflow session - no need to stop

```javascript
// Create subtask for missing dependency
const subtask = zerobias_execute("platform.Task.create", {
  newTask: {
    name: `Create ${artifactType}: ${identifier}`,
    description: `Dependency for task ${parentTaskCode}\n\nRequired before parent task can proceed.`,
    status: "todo",
    customFields: {
      artifactType: artifactType,
      vendor: vendorCode,
      suite: suiteCode,
      parentTaskId: parentTaskId
    }
  }
})

// Block parent task - Note: "blocked" may not be a standard transition
// Check task.nextTransitions for available options, or add comment explaining block
// Some workflows may not have a "blocked" status - in that case, just add a comment

zerobias_execute("platform.Task.addComment", {
  id: parentTaskId,
  newTaskComment: {
    commentMarkdown: `**Blocked:** Missing dependency - ${artifactType} '${identifier}'\n\nSubtask created: ${subtask.code}`
  }
})
```

### 2.4 Dependency Resolution Matrix

| Creating | Requires | If Missing |
|----------|----------|------------|
| Vendor | Nothing | Proceed |
| Suite | Vendor | Create vendor subtask, block |
| Framework | Vendor + Suite | Create subtasks, block |
| Product | Vendor | Create vendor subtask, block |
| Crosswalk | Source + Target frameworks | Create framework subtasks, block |

---

## Phase 3: Repository Setup

### 3.1 Navigate to Repository

Based on artifact type, navigate to the correct repository:

| Artifact | Repository Path |
|----------|----------------|
| vendor | `zerobias-org/vendor` |
| suite | `zerobias-org/suite` |
| framework | `zerobias-org/framework` |
| standard | `zerobias-org/standard` |
| benchmark | `zerobias-org/benchmark` |
| crosswalk | `zerobias-org/crosswalk` |
| product | `zerobias-org/product` |

### 3.2 Check Repository State

```bash
cd /path/to/repo
git status
git fetch origin
git checkout main
git pull origin main
```

### 3.3 Create Feature Branch

Branch naming convention: `{artifact_type}_{vendor}_{suite}` or task code

```bash
git checkout -b framework_eu_ai
# or
git checkout -b contextDev-123
```

---

## Phase 4: Artifact Creation

### 4.1 Vendor Package

**Location:** `package/{vendor}/`

**Files:**
```
package/{vendor}/
├── index.yml
├── package.json
└── .npmrc
```

**index.yml:**
```yaml
id: {uuid}
name: {Vendor Name}
code: {vendor-code}
description: {Vendor description}
url: {Official URL}
logoUrl: {Logo URL if available}
aliases: []
tags: []
```

**package.json:**
```json
{
  "name": "@zerobias-org/vendor-{vendor-code}",
  "version": "1.0.0",
  "auditmation": {
    "import-artifact": "vendor",
    "package": "{vendor-code}.vendor"
  }
}
```

### 4.2 Suite Package

**Location:** `package/{vendor}/{suite}/`

**Files:**
```
package/{vendor}/{suite}/
├── index.yml
├── package.json
└── .npmrc
```

**index.yml:**
```yaml
id: {uuid}
name: {Suite Name}
code: {suite-code}
description: {Suite description}
vendorCode: {vendor-code}
url: {Official URL}
aliases: []
tags: []
```

**package.json:**
```json
{
  "name": "@zerobias-org/suite-{vendor-code}-{suite-code}",
  "version": "1.0.0",
  "dependencies": {
    "@zerobias-org/vendor-{vendor-code}": "latest"
  },
  "auditmation": {
    "import-artifact": "suite",
    "package": "{vendor-code}.{suite-code}.suite"
  }
}
```

### 4.3 Framework Package

**Location:** `package/{vendor}/{suite}/{version}/`

**Files:**
```
package/{vendor}/{suite}/{version}/
├── index.yml
├── package.json
├── .npmrc
├── elements/
│   └── {element}.yml
└── baselines/         (optional)
    └── {baseline}.yml
```

**See:** Framework repo's `CLAUDE.md` and `templates/` for complete structure.

### 4.4 Fetch Source Content

Use WebFetch to retrieve official documentation:

```javascript
// Fetch and parse source content
WebFetch({
  url: sourceUrl,
  prompt: "Extract all requirements/controls with their IDs, names, and descriptions"
})
```

### 4.5 Generate Elements

For each element in the source:

```yaml
# elements/{element_code}.yml
id: {uuid}
externalId: {source identifier}
name: {Element Name}
description: {Full requirement/control text}
elementType: {type from index.yml elementTypes}
parent: {parent element code, if hierarchical}
aliases: []
```

**Element code rules:**
- Lowercase only
- Alphanumeric with `_` or `-`
- Example: `10_1`, `ac-1`, `section_3_2_a_`

---

## Phase 5: Validation

### 5.1 Run Package Validation

```bash
cd package/{vendor}/{suite}/{version}
npm run validate
```

### 5.2 Fix Common Issues

| Error | Cause | Fix |
|-------|-------|-----|
| Invalid element code | Uppercase or special chars | Rename to lowercase with _ or - |
| Missing parent | Parent element doesn't exist | Create parent or remove reference |
| Invalid element type | Type not in index.yml | Add to elementTypes array |
| Duplicate ID | Copy-paste error | Generate new UUID |

### 5.3 Full Build (Optional)

```bash
cd /path/to/repo/root
npm run build
```

---

## Phase 6: Git Operations

### 6.1 Stage and Commit

```bash
git add package/{vendor}/{suite}/{version}/
git commit -m "feat({vendor}-{suite}): add {Framework Name}

- Add framework metadata and {N} elements
- Include baselines: {list or 'none'}
- Source: {official URL}

Task: {task-code}
Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

### 6.2 Push Branch

```bash
git push origin {branch-name}
```

### 6.3 Create Pull Request

```bash
gh pr create --base main --title "feat({vendor}-{suite}): {Framework Name}" --body "$(cat <<'EOF'
## Summary
- New framework: {Framework Name}
- Elements: {count}
- Baselines: {list or none}
- Source: {URL}

## Task Reference
- Task: {task code}
- Task ID: {task id}

## Validation
- [x] `npm run validate` passes
- [x] All elements have descriptions
- [x] Parent-child relationships valid

## Test Plan
- [ ] Load framework via dataloader
- [ ] Verify elements display correctly
- [ ] Check crosswalk mappings (if applicable)

🤖 Generated with Claude Code
EOF
)"
```

---

## Phase 7: Task Completion

### 7.1 Add Completion Comment

```javascript
zerobias_execute("platform.Task.addComment", {
  id: taskId,
  newTaskComment: {
    commentMarkdown: `## Framework Created Successfully

**Package:** @zerobias-org/framework-{vendor}-{suite}-{version}
**Elements:** {count}
**PR:** {pr-url}

### Summary
{brief description of what was created}

### Next Steps
- PR needs review and merge
- After merge, framework will be available in catalog`
  }
})
```

### 7.2 Update Task Status

```javascript
// Find "Peer Review" transition to move to awaiting_approval
const reviewTransition = task.nextTransitions.find(t => t.status === "awaiting_approval")

zerobias_execute("platform.Task.update", {
  id: taskId,
  updateTask: { transitionId: reviewTransition.id }
})
```

### 7.3 Unblock Parent Tasks (If Applicable)

If this artifact was a dependency for another task:

```javascript
// Check if this was a dependency subtask
if (task.customFields?.parentTaskId) {
  // Add comment to parent task
  zerobias_execute("platform.Task.addComment", {
    id: task.customFields.parentTaskId,
    newTaskComment: {
      commentMarkdown: `**Dependency completed:** ${artifactType} '${identifier}' is now available.\n\nSubtask ${task.code} completed.`
    }
  })

  // Check if parent can be unblocked (all deps complete)
  // If yes, update parent to in_progress
}
```

---

## Quick Reference

### Artifact Type → Package Name Format

| Type | Package Name |
|------|--------------|
| vendor | `@zerobias-org/vendor-{code}` |
| suite | `@zerobias-org/suite-{vendor}-{code}` |
| framework | `@zerobias-org/framework-{vendor}-{suite}-{version}` |
| standard | `@zerobias-org/standard-{vendor}-{suite}-{version}` |
| benchmark | `@zerobias-org/benchmark-{vendor}-{suite}-{version}` |
| crosswalk | `@zerobias-org/crosswalk-{source}-{target}` |
| product | `@zerobias-org/product-{vendor}-{product}` |

### Task Status Transitions

```
todo → in_progress → awaiting_approval → done
           ↓
       blocked (waiting for dependency)
           ↓
       in_progress (when dependency completes)
```
