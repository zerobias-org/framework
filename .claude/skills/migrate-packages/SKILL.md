---
name: migrate-packages
description: Migrate the next batch of framework packages onto the gradle pipeline. Drops per-package build.gradle.kts marker, ensures .npmrc, runs full ./gradlew :<path>:gate (writes gate-stamp.json), fixes drift, major-bumps the version when applicable, commits per-package.
argument-hint: "[<authority>/<framework>/<version>...] [--batch=N] [--dry-run]"
---

# Migrate Framework Packages

Per-repo companion to `/migrate-content-to-zbb` (which bootstrapped this repo onto gradle). Use this skill to migrate framework packages **one at a time** within `org/framework`.

**Depth 4** repo:

| Path | Sample | npm name | `zerobias.package` |
|---|---|---|---|
| `package/<a>/<f>/<v>/` | `cis/csc/v8_1` | `@zerobias-org/framework-<a>-<f>-<v>` | `<a>.<f>.<v>.framework` |

The validator (`build.gradle.kts`) enforces this triangulation. The `.framework` suffix on `zerobias.package` is required — same disambiguation pattern as tag's `.tag` suffix.

## Trigger

```
/migrate-packages [<a>/<f>/<v>...] [--batch=N] [--dry-run]
```

Examples:
- `/migrate-packages cis/csc/v8_1 cis/csc/v8_0` — explicit batch.
- `/migrate-packages --batch=10 --dry-run` — preview the next 10 candidates.

## Pre-flight

1. `git status` — must be on a feature branch, not `main`.
2. Confirm gradle bootstrap: root `build.gradle.kts`, `settings.gradle.kts`, `gradle.properties`, `gradle-ci.properties`, `.github/workflows/publish.yml` (uses `zbb-publish-reusable.yml@main`). If anything is missing, abort and direct the user to `/migrate-content-to-zbb`.
3. Identify candidates — directories WITHOUT `build.gradle.kts`. `find package -mindepth 3 -maxdepth 3 -name index.yml | xargs dirname | sort -u`.

## Per-package loop

For each package in the batch, do steps 1–6 in order, then commit and move on.

### 1. Drop the marker
Create `package/<a>/<f>/<v>/build.gradle.kts`:
```kotlin
plugins { id("zb.content") }
```

### 2. Ensure `.npmrc`
The validator requires `package/<a>/<f>/<v>/.npmrc`. If not present, copy from a sibling already-migrated package or the repo root.

### 3. Run **full** `:gate` (NOT just `:validateContent`)
```bash
./gradlew :<a>:<f>:<v>:gate
```
**Why full `:gate` matters:** the publish workflow's preflight rejects any package without a committed `gate-stamp.json` (`gate-stamp.json is missing or invalid — run zbb gate locally and commit the stamp before publishing`). The stamp is written by `:writeGateStamp` at the end of `:gate`. Running `:validateContent` alone produces NO stamp — the package will pass local file-checks but fail in CI.

`:gate` chains: `validate` → `lint` → `compile` → `test*` → `buildArtifacts` → `testIntegrationDataloader` → `writeGateStamp`. Without `NEON_API_KEY` / `NEON_PROJECT_ID` in env, `testIntegrationDataloader` is **skipped** (not failed); the stamp still gets written, and CI re-runs the dataloader test against an ephemeral Neon branch on push.

The validator surfaces drift one error at a time. Common fixes for framework packages:

- **`package.json name` mismatch** — must match `@zerobias-org/framework-<a>-<f>-<v>`.
- **`zerobias.package` mismatch** — must match `<a>.<f>.<v>.framework`. Legacy `auditmation.package` is accepted; rename to `zerobias.package`.
- **`zerobias.import-artifact` must be `framework`** — not `standard`, not `vendor`.
- **Missing `.npmrc`** — see step 2.
- **Duplicate `id` UUID** — `:validateUniqueIds` collision across `index.yml` AND every `elements/*.yml`. Investigate which other framework/element owns that UUID; the newcomer needs a fresh UUID via `uuidgen`. Existing UUIDs are stable.

Re-run `:gate` after each fix until it passes.

### 4. Major-bump version
```bash
# package/<a>/<f>/<v>/package.json:
# 1.x.x → 2.0.0    (most lerna-era frameworks)
# 0.x.x → 1.0.0    (rare)
# 2.x.x → no-op    (already on a major-bumped line)
```
Universal repo rule: every package's first gradle publish gets a major bump UNLESS already at 2.x.

### 5. (Optional) Re-run `:gate` after the version bump

### 6. Commit
One commit per package. Conventional commit format:
```
feat(framework-<a>-<f>-<v>)!: migrate to gradle pipeline (<oldVer> → 2.0.0)
```
The `!` marks the major bump as breaking. Drop the `!` if no version change (already-2.x case).

Stage exactly: `package/<a>/<f>/<v>/build.gradle.kts`, `package/<a>/<f>/<v>/.npmrc` (if you added it), `package/<a>/<f>/<v>/package.json` (version bump), **`package/<a>/<f>/<v>/gate-stamp.json`** (mandatory — preflight rejects without it), and any drift fixes.

### 7. (After the batch) Verify on a feature branch
```bash
gh workflow run publish.yml --ref <branch>
```
Confirm `detect` lists exactly the packages you bumped. On a feature branch, `version` (single-writer) is skipped and `publish` runs in pre-release mode.

## Picking the next batch

Order rules of thumb:
1. **Group by authority**. Frameworks under the same authority (`nist/*`, `cis/*`, `ca/*`) often share failure modes — fix once, apply across the batch.
2. **Smaller frameworks first**. Pick frameworks with fewer `elements/*.yml` for the first round — faster gate, easier to debug.
3. Cap each PR at ~10 packages. Easier to review, easier to bisect.

## What NOT to do

- Do NOT change package `id` UUIDs — stable identifiers; changing detaches DB rows.
- Do NOT change element `id` UUIDs either — they're referenced in baselines / mappings across the catalog.
- Do NOT rename directories to make `package.json name` match. Metadata follows the directory.
- Do NOT skip the major bump for 1.x packages — the bump reflects the publish-pipeline transition.
- Do NOT major-bump packages already at 2.x — repo convention is no-op for already-bumped lines.
- Do NOT batch unrelated packages into one commit. One commit per package keeps `git revert` precise.

## Reference files

- First migrated framework (use as drop-in reference once bootstrap PR lands).
- `templates/index.yml`, `templates/package.json` — what a NEW framework looks like.
- Root `build.gradle.kts` — validator with framework formula.
- `org/standard/` — frameworks reference standards; in a fully gradle-migrated world standards are the parent, but the dataloader integration test loads frameworks standalone against an ephemeral Neon branch, so standard publish state doesn't gate framework gate locally.
- `org/util/packages/build-tools/.../SchemaPrimitives.kt` — validator helpers and error message shapes.
- `com/platform/dataloader/src/processors/standard/framework/FrameworkArtifactLoader.ts` — source of truth for what the dataloader expects.

## See also

- `/migrate-content-to-zbb` — meta-repo skill that bootstrapped this repo. Use only when migrating a new repo onto gradle, not for per-package work here.
