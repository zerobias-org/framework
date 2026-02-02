# ZeroBias Task Management Workflow

This workflow defines patterns for interacting with the ZeroBias task system via MCP tools.

## Task Lifecycle

```
┌──────────┐    ┌─────────────┐    ┌───────────────────┐    ┌──────┐
│   todo   │───▶│ in_progress │───▶│ awaiting_approval │───▶│ done │
└──────────┘    └─────────────┘    └───────────────────┘    └──────┘
                      │
                      ▼ (missing dependency)
                ┌─────────┐
                │ blocked │
                └─────────┘
                      │
                      ▼ (dependency completed)
                ┌─────────────┐
                │ in_progress │
                └─────────────┘
```

## Task Statuses

| Status | Phase | When to Use |
|--------|-------|-------------|
| `incoming` | backlog | New task, not yet triaged |
| `refined` | backlog | Task refined and ready for prioritization |
| `todo` | open | Ready to start work |
| `in_progress` | open | Actively being worked on |
| `blocked` | open | Cannot proceed (waiting for dependency) |
| `awaiting_approval` | review | Work complete, needs review |
| `done` | closed | Task completed |
| `cancelled` | closed | Task cancelled |

---

## Core Operations

### Get Task

**IMPORTANT: Task Lookup Approaches**

| You Have | Method | Works? |
|----------|--------|--------|
| UUID | `platform.Task.get({ id: uuid })` | ✅ Direct lookup |
| Task name | `portal.Task.search({ searchTaskBody: { search: "name" }})` | ✅ Searches name & description |
| Task code | No direct API | ❌ Code field NOT searchable |

**Best approach by input type:**

```javascript
// 1. If you have UUID (36 chars with dashes)
const task = zerobias_execute("platform.Task.get", {
  id: "bbd73958-f3f6-4ec7-a2ed-79cb105c9c19"
})

// 2. If you have task name (e.g., "AIUC-1")
const results = zerobias_execute("portal.Task.search", {
  searchTaskBody: { search: "AIUC-1" }
})
const task = results.items.find(t => t.name === "AIUC-1")

// 3. If you only have task code (e.g., "contextDev-12")
// Task codes are NOT indexed for search!
// Options:
//   a) Ask user for UUID or task name
//   b) Search by activity type + filter results by code
//   c) Search by related name if known
```

**Why task code search doesn't work:**
- The `code` field (e.g., "contextDev-12") is not marked as `searchable: true`
- Only `name` and `description` are searchable
- This is an API limitation - no "get by code" endpoint exists

**Response includes:**
- `id` - Task UUID (use this for subsequent API calls)
- `code` - Human-readable code (e.g., "contextDev-12")
- `name` - Task title (searchable)
- `description` - Full description (searchable)
- `status` - Current status
- `links[]` - Related resources (catalog_request, etc.)
- `customFields` - Custom metadata (branchName, repoUrl, artifactType)

### Search Tasks

Search tasks by name or description:

```javascript
// Search by task name
const results = zerobias_execute("portal.Task.search", {
  searchTaskBody: { search: "AIUC-1" }
})

// Filter by status
const results = zerobias_execute("portal.Task.search", {
  searchTaskBody: {
    search: "framework",
    filters: { statuses: ["todo", "in_progress"] }
  }
})

// Filter by activity type (useful for finding by code prefix)
const results = zerobias_execute("portal.Task.search", {
  searchTaskBody: {
    filters: { activities: ["ba4989ca-9fd6-47e9-8628-5a174c8326d0"] }
  }
})
```

### List Tasks (Platform API)

```javascript
// List todo tasks
const tasks = zerobias_execute("platform.Task.list", {
  status: "todo",
  pageSize: 10
})
```

### Update Task Status

**IMPORTANT:** Use `transitionId` to change status, not just the `status` field.

First, check available transitions from `task.nextTransitions`:
```javascript
// Get task to see available transitions
const task = zerobias_execute("platform.Task.get", { id: taskId })

// task.nextTransitions shows available status changes:
// - "Start" transition → in_progress
// - "Peer Review" transition → awaiting_approval
// - "Cancel" transition → cancelled
// etc.
```

Then update using the transition ID:
```javascript
zerobias_execute("platform.Task.update", {
  id: taskId,
  updateTask: {
    transitionId: "7f140bbe-4c10-54ac-922c-460c66392fad"  // "Start" transition
  }
})
```

**Context Development Workflow Transitions:**
| Transition | Target Status | ID | Required Fields |
|------------|---------------|----|-----------------|
| Create | incoming | `91165995-6e21-5b24-a535-0cdca0a479ab` | name |
| Approve | todo | `02caf891-e533-52a8-bae4-c7a34043f428` | name, description, assigned, artifactType |
| Start | in_progress | `7f140bbe-4c10-54ac-922c-460c66392fad` | name, description, assigned, repoUrl, branchName |
| Peer Review | awaiting_approval | `f017a447-0994-594d-9417-39cbc9a4de88` | assigned, approvers |
| Accept | released | `1d2e9381-f609-5e26-8bc6-7bbb65a9048d` | assigned, fixVersion, product link, artifact link |
| Reject | in_progress | `dda277e6-12d4-581b-922c-4e80d58d9083` | assigned |
| Cancel | cancelled | `711aa97f-f0bf-5c56-936f-f5e54d9de1f3` | assigned |

**Context Development Workflow Statuses:**
`incoming` → `todo` → `in_progress` → `awaiting_approval` → `released` (or `cancelled`)

**Note:** Always get the actual transition IDs from `task.nextTransitions` as they may differ per workflow.

### Add Comment

**IMPORTANT:** The field is `commentMarkdown`, not `content`.

```javascript
zerobias_execute("platform.Task.addComment", {
  id: taskId,
  newTaskComment: {
    commentMarkdown: "**Progress Update**\n\nCompleted framework structure. Running validation..."
  }
})
```

**Markdown is supported in comments.**

### Create Task

**IMPORTANT: Required Fields**

Task creation requires several fields that are not obvious from the API schema:

| Field | Required | Notes |
|-------|----------|-------|
| `boundaryId` | ✅ Yes | UUID of the target boundary |
| `activityId` | ✅ Yes | UUID of the activity type (e.g., "Context Development") |
| `name` | ✅ Yes* | Required when activity doesn't define a task template |
| `description` | Recommended | Task details in markdown |
| `priority` | Optional | 1000=Critical, 500=High, 200=Normal, 100=Low |
| `approvers` | ✅ Yes | Array of approver IDs (can be empty `[]`) |
| `notified` | ✅ Yes | Array of notified user IDs (can be empty `[]`) |
| `links` | ✅ Yes | Array of resource links (can be empty `[]`) |

**Complete Example:**

```javascript
zerobias_execute("platform.Task.create", {
  newTask: {
    boundaryId: "dea86bd0-b5e0-4525-9c1c-bd575281844f",
    activityId: "ba4989ca-9fd6-47e9-8628-5a174c8326d0",  // Context Development
    name: "Create vendor: AIUC",
    description: "Create AIUC vendor package.\n\nDependency for framework creation task.",
    priority: 500,  // High
    approvers: [],
    notified: [],
    links: []
  }
})
```

**Minimal Example (all required fields):**

```javascript
zerobias_execute("platform.Task.create", {
  newTask: {
    boundaryId: "your-boundary-uuid",
    activityId: "your-activity-uuid",
    name: "Task name",
    description: "Task description",
    approvers: [],
    notified: [],
    links: []
  }
})
```

### Find Boundary

Before creating tasks, you need the target boundary UUID:

```javascript
// List all boundaries accessible to you
const boundaries = zerobias_execute("platform.Boundary.listBoundaries", {})

// Find by name
const boundary = boundaries.items.find(b => b.name === "Daniel's Standards Boundary")
const boundaryId = boundary.id
```

**Response includes:**
- `id` - Boundary UUID (use this for task creation)
- `name` - Boundary display name
- `boundaryType` - Type (e.g., "lab", "production")
- `status` - Current status (e.g., "draft", "active")

### Find Activity

Tasks must be associated with an activity type. Common activity for content development:

```javascript
// List activities in a boundary
const activities = zerobias_execute("platform.Activity.list", {
  boundaryId: "your-boundary-uuid"
})

// Find "Context Development" activity (common for content tasks)
const contextDev = activities.items.find(a => a.name === "Context Development")
const activityId = contextDev.id  // ba4989ca-9fd6-47e9-8628-5a174c8326d0
```

**Common Activities:**
| Activity Name | Code Prefix | Use Case |
|---------------|-------------|----------|
| Context Development | `contextDev-` | Framework/content creation tasks |
| Ad Hoc Activity - One person | `adhoc-` | General single-person tasks |
| Ad Hoc Activity - Several persons | `adhoc-` | Multi-person collaboration |

**Note:** Activity IDs may vary by organization. Always query to get the correct UUID.

### List Task Priorities

```javascript
const priorities = zerobias_execute("platform.Task.listPriorities", {})
// Returns:
// - Critical: 1000
// - High: 500
// - Normal: 200
// - Low: 100
```

---

## Dependency Management Patterns

### Creating Subtasks for Dependencies

When a task requires artifacts that don't exist:

```javascript
function createDependencySubtask(parentTaskId, artifactType, vendor, suite = null) {
  const name = suite
    ? `Create ${artifactType}: ${vendor}/${suite}`
    : `Create ${artifactType}: ${vendor}`

  const subtask = zerobias_execute("platform.Task.create", {
    newTask: {
      name: name,
      description: `Required dependency for parent task.\n\nParent Task ID: ${parentTaskId}`,
      status: "todo",
      customFields: {
        artifactType: artifactType,
        vendor: vendor,
        suite: suite,
        parentTaskId: parentTaskId
      }
    }
  })

  return subtask
}
```

### Blocking Parent Task

When dependencies are missing:

```javascript
function blockTaskForDependency(taskId, dependencyType, dependencyName, subtaskCode) {
  // Note: "blocked" may not be a standard transition in all workflows
  // Check task.nextTransitions for available options
  // If no blocked transition, just add a comment explaining the situation

  // Add explanation comment
  zerobias_execute("platform.Task.addComment", {
    id: taskId,
    newTaskComment: {
      commentMarkdown: `**Status: Blocked**

Missing required dependency:
- **Type:** ${dependencyType}
- **Name:** ${dependencyName}

**Action:** Subtask created (${subtaskCode}) to create the missing dependency.

This task will be unblocked once the dependency is available.`
    }
  })
}
```

### Unblocking After Dependency Completes

When a dependency subtask is done:

```javascript
function checkAndUnblockParent(completedSubtask) {
  const parentTaskId = completedSubtask.customFields?.parentTaskId
  if (!parentTaskId) return

  // Notify parent task
  zerobias_execute("platform.Task.addComment", {
    id: parentTaskId,
    newTaskComment: {
      commentMarkdown: `**Dependency Completed**

Subtask ${completedSubtask.code} has been completed.
- **Type:** ${completedSubtask.customFields.artifactType}
- **Artifact:** ${completedSubtask.customFields.vendor}

Checking if all dependencies are now available...`
    }
  })

  // Check if all dependencies are met (implementation-specific)
  // If yes, transition parent back to in_progress
  const parentTask = zerobias_execute("platform.Task.get", { id: parentTaskId })
  const startTransition = parentTask.nextTransitions.find(t => t.status === "in_progress")

  if (startTransition) {
    zerobias_execute("platform.Task.update", {
      id: parentTaskId,
      updateTask: { transitionId: startTransition.id }
    })
  }
}
```

---

## Search Operations

### Search Vendors

```javascript
const results = zerobias_execute("portal.Vendor.search", {
  searchVendorBody: {
    search: "nist"
  }
})

// Check if vendor exists
const vendorExists = results.count > 0
```

### Search Suites

```javascript
const results = zerobias_execute("portal.Suite.search", {
  searchSuiteBody: {
    search: "nist 800-53"
  }
})
```

### Search Frameworks

```javascript
const results = zerobias_execute("portal.Framework.search", {
  searchFrameworkBody: {
    search: "nist 800-53 r5"
  }
})
```

### Search Products

```javascript
const results = zerobias_execute("portal.Product.search", {
  searchProductBody: {
    search: "aws"
  }
})
```

---

## Comment Templates

### Starting Work

```markdown
**Started:** Beginning work on this task.

**Plan:**
1. Check dependencies (vendor, suite)
2. Create package structure
3. Populate elements from source
4. Validate and push
```

### Progress Update

```markdown
**Progress Update**

- [x] Dependencies verified
- [x] Package structure created
- [ ] Elements in progress ({current}/{total})
- [ ] Validation pending
```

### Blocked Status

```markdown
**Status: Blocked**

Missing required dependency:
- **Type:** {vendor|suite|framework}
- **Name:** {identifier}

Subtask created: {subtask-code}
```

### Completion

```markdown
## Task Completed

**Package:** @zerobias-org/{type}-{name}
**Elements:** {count}
**PR:** {pr-url}

### Summary
{description of what was created}

### Validation
- [x] npm run validate passes
- [x] All elements populated
```

### Awaiting Approval

```markdown
**Status: Awaiting Approval**

Work is complete. PR submitted for review.

**PR:** {pr-url}
**Branch:** {branch-name}

Please review and merge to complete this task.
```

---

## Best Practices

### 1. Always Update Status

Keep task status accurate:
- `todo` → `in_progress` when starting
- `in_progress` → `blocked` when waiting for deps
- `blocked` → `in_progress` when deps complete
- `in_progress` → `awaiting_approval` when PR created
- `awaiting_approval` → `done` when merged

### 2. Add Meaningful Comments

- Comment when starting work
- Comment on significant progress
- Comment when blocked (with reason)
- Comment when complete (with summary)

### 3. Link Related Resources

Use task links to connect:
- PRs to tasks
- Subtasks to parent tasks
- Artifacts to tasks

### 4. Handle Errors Gracefully

If something fails:
1. Add comment explaining the issue
2. Keep task in appropriate status
3. Don't mark as done if incomplete

### 5. Provide Traceability

Include in comments and commits:
- Task code/ID
- PR links
- Package names
- Element counts
