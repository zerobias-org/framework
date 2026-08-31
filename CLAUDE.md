# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Monorepo of ZeroBias compliance framework artifacts. Each `package/<authority>/<framework>/<version>/` directory is one publishable framework package (e.g. `cis/csc/v8_1`, `nist/800_207/v1`, `iso/iec_27001/2022`).

The repo is on the **gradle + [zbb publish reusable workflow](https://github.com/zerobias-org/devops/blob/main/.github/workflows/zbb-publish-reusable.yml)** pipeline. Lerna and nx were removed in the post-bootstrap cleanup. See `org/vendor`, `org/suite`, `com/tag`, and `org/product` for sibling reference shapes.

## Development Commands

### Per-package

```bash
# File-shape validation only (validator philosophy: only checks what dataloader can't):
./gradlew :<authority>:<framework>:<version>:validateContent

# Full gate — validate → lint → compile → buildArtifacts → testIntegrationDataloader → writeGateStamp:
./gradlew :<authority>:<framework>:<version>:gate
```

`gate` writes `package/<a>/<f>/<v>/gate-stamp.json`. The publish workflow's preflight rejects any package without a committed stamp.

`testIntegrationDataloader` runs the dataloader against an ephemeral Neon Postgres branch. Without `NEON_API_KEY` / `NEON_PROJECT_ID` in env (vault refs in `zbb.yaml`), it's skipped locally; CI runs it on push against an ephemeral branch.

### Per-package helper

```bash
# Reset all `dependencies` versions in a package.json to "latest" (replaces lerna sync):
cd package/<a>/<f>/<v>
npm run correct:deps
```

### Repo-wide

```bash
# Cross-cut: fail if two yml files (index.yml or any elements/*.yml) share an id UUID
./gradlew validateUniqueIds

# Info tasks (zbb CLI helpers):
./gradlew projectPaths       # emit project-to-directory mapping
./gradlew changedModules     # list packages changed since last tag
```

## Package Structure

Framework is **depth 4**:

| Path | Sample | npm name | `zerobias.package` |
|---|---|---|---|
| `package/<a>/<f>/<v>/` | `cis/csc/v8_1` | `@zerobias-org/framework-<a>-<f>-<v>` | `<a>.<f>.<v>.framework` |

The `.framework` suffix on `zerobias.package` mirrors tag's `.tag` suffix — same disambiguation pattern.

### Required files per package

- `index.yml` — framework metadata (id, name, code, externalId, version, elementTypes, mappingTypes)
- `elements/<elementCode>.yml` — one yaml per requirement / control (must declare `id`, `name`, `description`, `elementType`)
- `package.json` — npm name + `zerobias` block + the single `correct:deps` script
- `.npmrc` — artifact-private registry config
- `build.gradle.kts` — `plugins { id("zb.content") }` (one-liner; validator handles the depth)
- `baselines/` (optional), `mappings/` (optional)

### package.json shape (per package)

```jsonc
{
  "name": "@zerobias-org/framework-<a>-<f>-<v>",
  "version": "2.0.x",
  "files": ["index.yml", "baselines/**", "elements/**", "mappings/**"],
  "dependencies": {
    "@zerobias-org/suite-<a>-<f>": "latest"
  },
  "zerobias": {
    "package": "<a>.<f>.<v>.framework",
    "import-artifact": "framework",
    "dataloader-version": "1.0.0"
  },
  "scripts": {
    "correct:deps": "tsx ../../../../scripts/correctDeps.ts"
  }
}
```

Legacy `auditmation` metadata key is accepted; prefer `zerobias`.

### index.yml shape

- `id` — UUID, must be unique repo-wide across BOTH `index.yml` AND every `elements/*.yml` (enforced by `validateUniqueIds`)
- `name`, `code` (e.g. `cis_csc_v8.1_scf`), `externalId` (e.g. `CIS CSC v8.1`), `description`, `url`
- `version` — semver-like (e.g. `v8.1`)
- `status: "approved"` typical
- `external: true`, `internal: false` for industry-published frameworks
- `elementTypes` — array of `{id, code, name, description}` defining the kinds of elements (e.g. `control`)
- `mappingTypes` — array of element-type codes that participate in cross-framework mappings

## Validator philosophy

The dataloader is the source of truth for schema rules (UUID format, semver, status enum, elementType lookup, baseline shape, description non-blank, etc.). The gate validator (`build.gradle.kts`) only enforces what the dataloader CANNOT or DOES NOT see:

1. **Filesystem ↔ npm-name ↔ `zerobias.package` triangulation** — dataloader reads `zerobias.package` but never the npm `name` and has no view of the directory layout
2. **Repo-wide unique `id` UUIDs** across `index.yml` AND every `elements/*.yml` — dataloader processes one artifact at a time; cross-cuts only surface in DB collisions

This avoids drift when the dataloader tightens.

## Creating a new framework package

Run the helper:

```bash
sh scripts/createNewFramework.sh <standard_category> <publisher> <category> <version>
```

Where:
- `standard_category` — `cyber` | `technical` | `clinical`
- `publisher` — the authority that published the framework (e.g. `nist`, `cis`, `iso`)
- `category` — the framework code (e.g. `800_53`, `csc`)
- `version` — version string (e.g. `v1`, `2024`, `rev4`)

Then:
1. Fill in `index.yml` (id, name, code, externalId, url, elementTypes)
2. Add elements under `elements/`
3. Drop the gradle marker: `echo 'plugins { id("zb.content") }' > package/<a>/<f>/<v>/build.gradle.kts`
4. Gate: `./gradlew :<a>:<f>:<v>:gate`
5. Commit

## Migrating remaining lerna-era packages to gradle

Use the skill: `/migrate-packages [<a>/<f>/<v>...]`. See [.claude/skills/migrate-packages/SKILL.md](.claude/skills/migrate-packages/SKILL.md). The skill drops the marker, runs `:gate`, applies the major bump where needed (`1.x → 2.0`, `0.x → 1.0`, `2.x → no-op`), commits per-package.

## "Update" sub-packages

Two packages under `package/<a>/<f>/update/` (`opencre/opencre/update`, `scf/scf/update`) are private utility/fetcher packages that pull upstream content and regenerate the framework yaml. They have `"private": true`, their own `update` npm script (`tsx index.ts`), and do NOT carry a gradle marker — `settings.gradle.kts` skips them. The weekly-update workflow (`.github/workflows/weekly-update.yml`) is the trigger.

## Branches

- `main` — default, all PRs target it
- `dev`, `qa`, `uat` — environment branches kept in sync by the publish workflow's `sync` job

## Commit format

[Conventional Commits](https://www.conventionalcommits.org/), enforced by `commitlint` (`.commitlintrc.json`).

```
feat(framework-<a>-<f>-<v>): <subject>
feat(framework-<a>-<f>-<v>)!: <subject> (<oldVer> → <newVer>)
```

Use `!` for major version bumps. Common scopes: `framework-<...>`, `bundle`, `validator`, `repo-cleanup`.

## CI/CD

Publish workflow: `.github/workflows/publish.yml` — a thin wrapper around `zerobias-org/devops/.github/workflows/zbb-publish-reusable.yml@main`. Triggered on `push` to main/qa/dev/uat (paths: `package/**`, `.github/workflows/publish.yml`) and on `workflow_dispatch` (optional `framework` input). This is the only publish/version/sync workflow — the legacy nx-era `publish-pull-request.yml` and `pull-request-target.yml` were removed in the cleanup (the reusable workflow owns the full version → publish → sync lifecycle).

The one other workflow is `.github/workflows/weekly-update.yml` — the upstream-content fetcher that runs the two private `package/**/update/` packages, gates any regenerated/new framework packages via `./gradlew :<path>:gate`, and opens a PR to `main`. It runs Mondays at 02:00 UTC (it was named `daily-update` for a long time while the cron said weekly) and is not part of the publish pipeline.

The reusable workflow's jobs:
1. **detect** — diff to find changed packages
2. **version** (main only, single-writer) — patch-bump version, commit
3. **publish** (matrix) — per-package publish to npm + GHCR
4. **update-bundle** (main only, after publish success) — refresh `bundle/package.json` deps from npm
5. **sync** — propagate main → uat → qa → dev

For pre-release validation on a feature branch:

```bash
gh workflow run publish.yml --ref <branch>
```

## ZeroBias Task Integration

For creating frameworks from ZeroBias tasks: `/create-framework [task-id]`.

**Dependency Chain:** `vendor → suite → framework`. Frameworks require BOTH a vendor AND a suite. Check/create them first.

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
  toResource: targetTaskId,
  linkType: "b8bd95d0-b33c-11f0-8af3-dfaccf31600e"  // relates_to
})
```

### Workflow Transitions

| Transition | Target Status | ID |
|------------|---------------|-----|
| Start | in_progress | `7f140bbe-4c10-54ac-922c-460c66392fad` |
| Peer Review | awaiting_approval | `f017a447-0994-594d-9417-39cbc9a4de88` |
| Accept | released | `1d2e9381-f609-5e26-8bc6-7bbb65a9048d` |

Always get actual IDs from `task.nextTransitions`.

**Orchestration:**
- [DEPENDENCY_CHAIN.md](../../docs/orchestration/DEPENDENCY_CHAIN.md) — strict dependency rules
- [TASK_MANAGEMENT.md](../../docs/orchestration/TASK_MANAGEMENT.md) — task API patterns
- [API_REFERENCE.md](../../docs/orchestration/API_REFERENCE.md) — quick API reference

---

## Related Documentation

- [Root CLAUDE.md](../../CLAUDE.md) — meta-repo guidance
- [ContentArtifacts.md](../../ContentArtifacts.md) — content catalog system
- [org/vendor/CLAUDE.md](../vendor/CLAUDE.md) — vendor repo (parent dependency in catalog chain)
- [org/suite/CLAUDE.md](../suite/CLAUDE.md) — suite repo (parent dependency for framework's suite link)
- [org/product/CLAUDE.md](../product/CLAUDE.md) — sibling repo, same gradle/zbb pattern
- [com/platform/dataloader/CLAUDE.md](../../com/platform/dataloader/CLAUDE.md) — the dataloader processors (FrameworkArtifactLoader.ts is the source of truth for what the dataloader expects)

## GitHub token — `read:packages` (required for EVERY zbb/gradle command)

This repo resolves its gradle plugins (`zb.workspace`, `zb.base`,
`zb.content`) from **GitHub Packages Maven**, so the token gates the whole
zbb toolchain — compile, validation, tests, `gate`, publish — not one task.

`com.zerobias.build-tools` is a **public** package, but GitHub Packages Maven
refuses **anonymous** reads. This is a registry requirement, not a permission
one: nothing has to be granted to anyone and no org membership is involved.
Any GitHub account whose token carries `read:packages` can read it.

**Being logged in to `gh` is NOT enough — the scope is separate, and an
authenticated-but-unscoped token is the usual false pass.** Assert the scope,
not the login:

```bash
gh auth status 2>&1 | grep -q 'read:packages' && echo OK || echo 'MISSING read:packages'
gh auth refresh -s read:packages && export GITHUB_TOKEN=$(gh auth token)   # the fix
```

Definitive check — proves the read (200 = ready, 401 = scope missing):

```bash
curl -s -o /dev/null -w '%{http_code}\n' -u "x:$(gh auth token)" \
  https://maven.pkg.github.com/zerobias-org/util/zb/workspace/zb.workspace.gradle.plugin/maven-metadata.xml
```

**Agent rule — do not report this as a blocker.** A 401 from
`maven.pkg.github.com`, `Plugin [id: 'zb.workspace'] was not found`, or
`Could not resolve com.zerobias.build-tools` is a KNOWN, SELF-FIXABLE state.
It lands on the very first request (plugins pin `1.+`, so `maven-metadata.xml`
is fetched before any package file is read). Run the refresh above and retry.
Never present it as an environment limitation, never silently downgrade to
`validateContent`-only, and never write "validation deferred to CI" — a
package whose gate never ran cannot publish.

⚠ Machines that have run `publishToMavenLocal` on build-tools are silently
exempt (`mavenLocal()` is first in the resolution order). Clean, CI and
container environments have no `~/.m2` and always need the scope — never
conclude it is unnecessary because a developer machine worked. An INVALID
`GITHUB_TOKEN` also silently shadows a valid keyring login (`gh auth status`
exposes it).
