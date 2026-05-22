# Create Framework Skill

Turn a requirements document (a published standard, a URL, or a CSV of controls)
into a valid ZeroBias **framework** content package and open a pull request for it.

There are two ways to run this skill:

- **Mode A — Document-first** (default; no ZeroBias task required). You have a
  source — a URL, a pasted list of requirements, or a CSV — and you want a
  framework package + PR. This is the path for content authors.
- **Mode B — Task-driven** (for ZeroBias developers working the task system).
  Driven by a ZeroBias Task UUID/name, with task transitions and comments.

## Trigger

```
/create-framework                       # Mode A — prompts for the source
/create-framework https://example.com/standard
/create-framework ./controls.csv
/create-framework <task-uuid|task-name> # Mode B — task-driven
```

If the argument is a 36-char UUID or resolves to a ZeroBias task, run **Mode B**.
Otherwise treat the argument (or prompt) as a document source and run **Mode A**.

---

## Prerequisites (read first)

1. **Registry tokens.** `@zerobias-org` packages live on a private registry.
   You need `ZB_TOKEN` and `NPM_TOKEN` in your environment or the gate and
   `npm install` will 401. See the meta-repo `docs/RegistrySetup.md`.
2. **Node 22 + `zbb`.** Validation runs via the `zbb` CLI from the repo root.
   `zbb <gradle-task>` wraps the gradle build but injects the slot/stack
   environment (Neon creds + tokens from vault), so the gate's dataloader test
   runs locally instead of being skipped. (Bare `./gradlew` works for
   `validateContent`, but use `zbb` so the full gate behaves as it does in CI.)
3. **(Recommended) the `zb` MCP**, configured with a profile (`zb setup`), so
   the skill can check whether the vendor/suite dependencies already exist in
   the catalog. Without it, you can still check by reading the `org/vendor` and
   `org/suite` repos.

> ⚠️ **What this skill does and does NOT do.** It produces a **pull request
> against `dev`**. It does **not** load content into any environment. After the
> PR is reviewed and merged, a ZeroBias developer promotes `dev → main`, CI
> publishes the package, and the environment load happens controlled-side.
> Content authors' work ends at a green PR.

---

## Mode A — Document-first workflow

### A1. Gather inputs

Collect (prompt for anything missing):

| Input | Example | Notes |
|-------|---------|-------|
| standard category | `cyber` \| `technical` \| `clinical` | scaffold arg |
| publisher / authority | `cis`, `nist`, `complianceforge` | becomes `<a>` in the path |
| framework code | `csc`, `800_53`, `scf` | becomes `<f>` |
| version | `v8.1`, `2024`, `2026.1.1` | becomes `<v>` (dots → `_` on disk) |
| display name | `Critical Security Controls (CSC)` | `index.yml` `name` |
| externalId | `CIS CSC v8.1` | `index.yml` `externalId` |
| source URL | `https://www.cisecurity.org/controls/v8/` | `index.yml` `url` |
| element type(s) | `control` (default) | must match every element's `elementType` |
| requirements source | URL to fetch / pasted list / CSV path | the actual control content |

### A2. Verify dependencies exist (MANDATORY — do not author an orphan)

Frameworks require a **vendor** AND a **suite** (`vendor → suite → framework`).
Check before scaffolding:

```javascript
zerobias_execute("portal.Vendor.search", { searchVendorBody: { search: "<publisher>" }})
zerobias_execute("portal.Suite.search",  { searchSuiteBody:  { search: "<publisher> <framework>" }})
```

If either is missing, **stop** and create it first (`/create-vendor`,
`/create-suite`) or hand off to a developer. Do not proceed — the dataloader
will reject a framework whose suite doesn't exist.

### A3. Branch off `dev`

```bash
git checkout dev
git pull origin dev
git checkout -b feature/framework-<publisher>-<framework>-<version>
```

### A4. Scaffold the package

```bash
sh scripts/createNewFramework.sh <standard_category> <publisher> <framework> <version>
```

This creates `package/<a>/<f>/<v>/` with `index.yml`, `package.json`, `.npmrc`,
and template `elements/`/`baselines/`, filling in the package id (`uuidgen`),
code, and version.

### A5. Fill `index.yml`

The scaffold sets `id`, `code`, `version`. You fill the rest from A1: `name`,
`externalId`, `url`, `description`, and the `elementTypes` array (`{id, code,
name, description}` — generate a fresh UUID per type) plus `mappingTypes`
(the element-type codes that participate in cross-framework mappings).

### A6. Generate elements

Delete the template `elements/example-1.yml`, then:

- **From a CSV** (columns: `externalId,name,description[,elementType,parent]`):
  ```bash
  npx tsx scripts/csvToElements.ts <controls.csv> \
    --output-dir package/<a>/<f>/<v>/elements --element-type control
  ```
- **From a document/URL**: parse it into one `elements/<externalId>.yml` per
  requirement, each with `id` (fresh UUID), `name`, `description`,
  `elementType` (matching A1), `externalId`. For hierarchy, set `parent` to the
  parent element's code (its filename without `.yml`).

Every `id` (in `index.yml` and every element) must be **unique repo-wide**.

### A7. Drop the gradle marker

```bash
echo 'plugins { id("zb.content") }' > package/<a>/<f>/<v>/build.gradle.kts
```

### A8. Validate

```bash
# Fast file-shape check (filesystem ↔ npm name ↔ zerobias.package, unique ids):
zbb :<a>:<f>:<v>:validateContent

# Full gate (also runs the dataloader against an ephemeral Neon branch):
zbb :<a>:<f>:<v>:gate
```

`gate` needs `NEON_API_KEY`/`NEON_PROJECT_ID`; without them the dataloader
integration step is skipped locally and CI runs it on push. Fix any errors and
re-run until `validateContent` passes.

### A9. Commit, push, PR (base = `dev`)

```bash
git add package/<a>/<f>/<v>
git commit -m "feat(framework-<a>-<f>-<v>): add <name> (<N> elements)

- Source: <sourceUrl>

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
git push origin feature/framework-<publisher>-<framework>-<version>
gh pr create --base dev \
  --title "feat(framework-<a>-<f>-<v>): add <name>" \
  --body "## Summary
- **Package:** @zerobias-org/framework-<a>-<f>-<v>
- **Elements:** <N>
- **Source:** <sourceUrl>

## Validation
- [x] \`zbb :<a>:<f>:<v>:validateContent\` passes
- [x] All elements have descriptions

🤖 Generated with [Claude Code](https://claude.com/claude-code)"
```

### A10. Report and hand off

Tell the author: PR is open against `dev`. Next steps are out of their hands —
a developer reviews/merges, promotes `dev → main`, CI publishes, and the
environment load happens controlled-side.

---

## Mode B — Task-driven workflow

### Step 1: Get Task Details

**IMPORTANT: Task Lookup Limitations**

The ZeroBias API has specific lookup behaviors:

| Input | Method | Notes |
|-------|--------|-------|
| **UUID** | `platform.Task.get({ id: uuid })` | Direct lookup, fastest |
| **Task name** | `portal.Task.search({ searchTaskBody: { search: "AIUC-1" }})` | Searches name & description |
| **Task code** | NOT directly searchable | Code field is not indexed |

**If user provides a task code (like `contextDev-12`):**
1. Task codes are NOT searchable via the API
2. Ask user for the task UUID or task name instead
3. Or search by task name if known (e.g., "AIUC-1" for contextDev-12)

**Recommended approach:**
```javascript
// If UUID provided (contains dashes, 36 chars)
if (input.match(/^[0-9a-f-]{36}$/i)) {
  const task = zerobias_execute("platform.Task.get", { id: input })
}

// If task name provided (search)
else {
  const results = zerobias_execute("portal.Task.search", {
    searchTaskBody: { search: input }
  })
  // Find exact match or prompt user to select
  const task = results.items.find(t => t.name === input) || results.items[0]
}
```

**If only task code is available:**
```javascript
// Parse activity prefix from code (e.g., "contextDev" from "contextDev-12")
// Filter by activity type, then match code in results
const results = zerobias_execute("portal.Task.search", {
  searchTaskBody: {
    filters: { activities: [activityId] }
  }
})
const task = results.items.find(t => t.code === taskCode)
```

### Step 2: Extract Task Information

The task provides all the information needed:

| Field | Source | Example |
|-------|--------|---------|
| **Task ID** | `task.id` | `bbd73958-f3f6-4ec7-a2ed-79cb105c9c19` |
| **Task Code** | `task.code` | `contextDev-12` |
| **Name** | `task.name` | `AIUC-1` |
| **Description** | `task.description` | `Create a framework from https://www.aiuc-1.com` |
| **Branch Name** | `task.customFields.branchName` | `feature/framework-aiuc-1` |
| **Repository URL** | `task.customFields.repoUrl` | `https://github.com/zerobias-org/framework` |
| **Artifact Type** | `task.customFields.artifactType` | `framework` |
| **Vendor** | `task.customFields.vendor` | (if set) |
| **Suite** | `task.customFields.suite` | (if set) |
| **Version** | `task.customFields.version` | (if set) |
| **Parent Task** | `task.customFields.parentTaskId` | (if dependency subtask) |
| **Assigned** | `task.assigned` | User/team assigned |
| **Accountable** | `task.accountable` | User accountable |
| **Boundary** | `task.boundary.name` | `Frameworks and Standards` |
| **Priority** | `task.priority.label` | `Normal` |

### Step 3: Determine Artifact Details

**From customFields:**
```javascript
const artifactType = task.customFields.artifactType  // framework, vendor, suite, etc.
const branchName = task.customFields.branchName      // feature/framework-aiuc-1
const repoUrl = task.customFields.repoUrl            // https://github.com/zerobias-org/framework
const vendor = task.customFields.vendor              // may need to parse from name
const suite = task.customFields.suite                // may need to parse from name
```

**Parse source URL from description:**
```javascript
const urlMatch = task.description.match(/https?:\/\/[^\s]+/)
const sourceUrl = urlMatch ? urlMatch[0] : null
```

**Parse vendor/suite from task name if not in customFields:**
- Task name: `AIUC-1` → vendor: `aiuc`, suite: `aiuc-1`

### Step 4: Update Task to In Progress

```javascript
// Find "Start" transition from task.nextTransitions
const startTransition = task.nextTransitions.find(t => t.status === "in_progress")

zerobias_execute("platform.Task.update", {
  id: task.id,
  updateTask: { transitionId: startTransition.id }
})

zerobias_execute("platform.Task.addComment", {
  id: task.id,
  newTaskComment: {
    commentMarkdown: `**Started:** Beginning artifact creation.

**Task:** ${task.code}
**Type:** ${task.customFields.artifactType}
**Branch:** ${task.customFields.branchName}
**Repo:** ${task.customFields.repoUrl}`
  }
})
```

### Step 5: Check Dependencies (MANDATORY)

**RULE: Follow the dependency chain. If dependencies are missing, handle them first.**

```
vendor → suite → framework/standard/benchmark → crosswalk
```

**Check dependencies exist:**
```javascript
// 1. Check vendor
const vendors = zerobias_execute("portal.Vendor.search", { searchVendorBody: { search: vendorCode }})
const vendorExists = vendors.items.some(v => v.code?.toLowerCase() === vendorCode.toLowerCase())

// 2. Check suite
const suites = zerobias_execute("portal.Suite.search", { searchSuiteBody: { search: `${vendorCode} ${suiteCode}` }})
const suiteExists = suites.items.some(s =>
  s.vendorCode?.toLowerCase() === vendorCode.toLowerCase() &&
  s.code?.toLowerCase() === suiteCode.toLowerCase()
)

// 3. If dependencies missing, create subtasks and complete them first
if (!vendorExists || !suiteExists) {
  // See: docs/orchestration/TASK_MANAGEMENT.md#dependency-management
  // 1. Create subtasks for missing dependencies
  // 2. Complete vendor: /create-vendor {vendor-task-id}
  // 3. Complete suite: /create-suite {suite-task-id}
  // 4. Then resume this task
}
```

**If dependencies are missing:** See [TASK_MANAGEMENT.md](../../../docs/orchestration/TASK_MANAGEMENT.md#dependency-management) for the subtask creation and skill invocation workflow.

### Step 6: Clone/Navigate to Repository

Use `task.customFields.repoUrl` to identify the repository:

```javascript
// Map repoUrl to local path
const repoMap = {
  "https://github.com/zerobias-org/framework": "/path/to/zerobias-org/framework",
  "https://github.com/zerobias-org/vendor": "/path/to/zerobias-org/vendor",
  "https://github.com/zerobias-org/suite": "/path/to/zerobias-org/suite",
  // etc.
}
```

### Step 7: Create Branch from Task

**Use the branch name from task:**

```bash
git checkout dev
git pull origin dev
git checkout -b {task.customFields.branchName}
```

Example with task data:
```bash
git checkout -b feature/framework-aiuc-1
```

### Step 8: Create Package Structure

Create package based on artifact type:

| Type | Path |
|------|------|
| vendor | `package/{vendor}/` |
| suite | `package/{vendor}/{suite}/` |
| framework | `package/{vendor}/{suite}/{version}/` |
| product | `package/{vendor}/{product}/` |

### Step 9: Populate Content

For frameworks:
1. Fetch source documentation from URL in `task.description`
2. Parse structure (articles, sections, requirements)
3. Create element files in `elements/` directory
4. Create baselines in `baselines/` if applicable

### Step 10: Validate

```bash
# Fast file-shape check:
zbb :{vendor}:{suite}:{version}:validateContent
# Full gate (dataloader against ephemeral Neon branch; needs NEON_* creds):
zbb :{vendor}:{suite}:{version}:gate
```

### Step 11: Commit Using Task Info

```bash
git add .
git commit -m "feat(framework-{vendor}-{suite}-{version}): ${task.name}

- Add ${task.customFields.artifactType} with {N} elements
- Source: {sourceUrl}

Task: ${task.code}
Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

### Step 12: Push Using Task Branch

```bash
git push origin {task.customFields.branchName}
```

### Step 13: Create Pull Request

```bash
gh pr create --base dev \
  --title "feat(framework-{vendor}-{suite}-{version}): ${task.name}" \
  --body "$(cat <<'EOF'
## Summary
- **Task:** ${task.code} - ${task.name}
- **Type:** ${task.customFields.artifactType}
- **Branch:** ${task.customFields.branchName}
- **Package:** @zerobias-org/${artifactType}-${name}
- **Elements:** {count}

## Source
${sourceUrl from task.description}

## Task Reference
- **Task Code:** ${task.code}
- **Task ID:** ${task.id}
- **Assigned:** ${task.assigned.contactName}
- **Boundary:** ${task.boundary.name}

## Validation
- [x] `zbb :{vendor}:{suite}:{version}:validateContent` passes
- [x] All elements have descriptions

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

### Step 14: Update Task with Completion

```javascript
zerobias_execute("platform.Task.addComment", {
  id: task.id,
  newTaskComment: {
    commentMarkdown: `## Artifact Created

**Task:** ${task.code}
**Package:** @zerobias-org/${artifactType}-${packageName}
**Elements:** ${elementCount}
**Branch:** ${task.customFields.branchName}
**PR:** ${prUrl}

### Next Steps
- PR needs review and merge
- After merge, artifact available in catalog`
  }
})

// Find "Peer Review" transition to move to awaiting_approval
const reviewTransition = task.nextTransitions.find(t => t.status === "awaiting_approval")
zerobias_execute("platform.Task.update", {
  id: task.id,
  updateTask: { transitionId: reviewTransition.id }
})
```

---

## Dependency Resolution

When a required dependency doesn't exist:

### 1. Create Subtask

```javascript
zerobias_execute("platform.Task.create", {
  newTask: {
    name: `Create ${depType}: ${depName}`,
    description: `Required dependency for ${task.code}: ${task.name}

Parent Task: ${task.code}
Parent Task ID: ${task.id}`,
    status: "todo",
    customFields: {
      artifactType: depType,
      vendor: vendorCode,
      suite: suiteCode,
      repoUrl: depRepoUrl,
      branchName: `feature/${depType}-${depName}`,
      parentTaskId: task.id,
      parentTaskCode: task.code
    }
  }
})
```

### 2. Block Parent Task

```javascript
// Note: "blocked" may not be a standard transition in all workflows
// Check task.nextTransitions for available options
// If no blocked transition exists, just add a comment explaining the block

zerobias_execute("platform.Task.addComment", {
  id: task.id,
  newTaskComment: {
    commentMarkdown: `**Status: Blocked**

Missing dependency: ${depType} '${depName}'
Subtask created: ${subtask.code}

Will resume when dependency is completed.`
  }
})
```

### 3. Process Dependency

Run workflow for subtask.

### 4. Unblock Parent

```javascript
// Get parent task to find available transitions
const parentTask = zerobias_execute("platform.Task.get", { id: parentTaskId })
const startTransition = parentTask.nextTransitions.find(t => t.status === "in_progress")

zerobias_execute("platform.Task.update", {
  id: parentTaskId,
  updateTask: { transitionId: startTransition.id }
})
```

---

## Task Custom Fields Reference

Required workflow transitions expect these custom fields:

| Field | Required For | Description |
|-------|--------------|-------------|
| `artifactType` | `todo` transition | Type: framework, vendor, suite, etc. |
| `repoUrl` | `in_progress` transition | GitHub repository URL |
| `branchName` | `in_progress` transition | Git branch name |
| `fixVersion` | `released` transition | Version being released |
| `vendor` | (recommended) | Vendor code |
| `suite` | (recommended) | Suite code |
| `version` | (recommended) | Artifact version |
| `parentTaskId` | (for subtasks) | Parent task UUID |
| `parentTaskCode` | (for subtasks) | Parent task code |

---

## Error Handling

### Missing Required Fields

If `task.customFields.branchName` or `task.customFields.repoUrl` not set:
1. Check if task status allows setting them
2. Generate appropriate values
3. Update task with values before proceeding

### Validation Fails

1. Read validation errors
2. Fix issues
3. Re-validate
4. If persistent, add comment explaining blocker

### Repository Not Found

1. Check repoUrl mapping to local path
2. If not found, inform user to clone
3. Do not proceed without repo

---

## References

- **Orchestration Guide:** `ORCHESTRATION.md`
- **Artifact Workflow:** `.claude/workflows/artifact-creation.md`
- **Task Management:** `.claude/workflows/task-management.md`
- **Templates:** `templates/`
