# Framework monorepo

ZeroBias compliance framework artifacts. Each `package/<authority>/<framework>/<version>/` directory is one publishable framework package (e.g. `cis/csc/v8_1`, `nist/800_207/v1`).

## Content licensing & attribution

Framework content reproduced from third-party sources is used under those sources' published licenses — see **[NOTICE.md](NOTICE.md)** for the required attributions. In particular, the SCF packages (`package/scf/scf/*`) are [CC BY-ND 4.0](https://creativecommons.org/licenses/by-nd/4.0/) content: redistribute verbatim with attribution; never distribute modified versions of the control content.

Each package declares its content license in the standard `"license"` field of its `package.json`. Packages still reading `ISC` are stale, not authoritative — that value describes only the packaging scaffolding, and is corrected package by package as each takes its next content bump. **NOTICE.md is authoritative for every package regardless of what its `package.json` currently says.**

[**LICENSE**](LICENSE) covers this repository's own work — tooling, validators, scripts, and package structure. It does not extend to the reproduced content, whose terms are recorded in NOTICE.md and, where a source is more restrictive, govern over it. [**LICENSING_REVIEW.md**](LICENSING_REVIEW.md) records the per-package assessment behind those entries, including which packages are deliberately reduced to identifiers rather than reproducing protected text — **do not backfill text into those**.

## Authentication

Set `ZB_TOKEN` in your environment to authenticate with the npm registry. Get one from [ZeroBias](https://app.zerobias.com).

## Build & validate

This repo is on the gradle + [zbb](https://github.com/zerobias-org/devops) publish pipeline.

```bash
# Validate one framework package (file-shape checks only):
./gradlew :<authority>:<framework>:<version>:validateContent

# Full gate (validate → buildArtifacts → testIntegrationDataloader → writeGateStamp):
./gradlew :<authority>:<framework>:<version>:gate
```

`gate` writes `package/<a>/<f>/<v>/gate-stamp.json`. The publish workflow rejects any package without a committed stamp.

`testIntegrationDataloader` runs the dataloader against an ephemeral Neon Postgres branch. Without `NEON_API_KEY` / `NEON_PROJECT_ID` in env (vault refs in `zbb.yaml`), it's skipped locally; CI runs it on push.

## Validator philosophy

The dataloader is the source of truth for schema rules (UUID format, semver on `version`, elementType validation, baseline shape, etc.). The gate validator (`build.gradle.kts`) only enforces things the dataloader CANNOT or DOES NOT see:

1. **Filesystem ↔ npm ↔ `zerobias.package` triangulation** at depth 4:
   - dir `package/<a>/<f>/<v>/`
   - npm name `@zerobias-org/framework-<a>-<f>-<v>`
   - `zerobias.package` `<a>.<f>.<v>.framework` (note the `.framework` suffix)
2. **Repo-wide unique `id` UUIDs** across both `index.yml` AND every `elements/*.yml`

This avoids drift when the dataloader tightens.

## Framework package shape

```
package/<authority>/<framework>/<version>/
├── index.yml            # framework metadata + element types
├── elements/            # one *.yml per requirement/control
├── baselines/           # optional
├── mappings/            # optional
├── package.json
├── .npmrc
├── build.gradle.kts     # plugins { id("zb.content") }
└── gate-stamp.json      # written by ./gradlew :path:gate
```

## Creating a new framework package

Use the helper:

```bash
sh scripts/createNewFramework.sh <standard_category> <publisher> <category> <version>
```

Where:
- `standard_category` — `cyber` | `technical` | `clinical`
- `publisher` — the authority that published the framework (e.g. `nist`, `cis`, `iso`)
- `category` — the framework code (e.g. `800_53`, `csc`)
- `version` — version string (e.g. `v1`, `2024`, `rev4`)

Then fill in `index.yml`, add `elements/*.yml`, drop the gradle marker (`echo 'plugins { id("zb.content") }' > package/<a>/<f>/<v>/build.gradle.kts`), and run `./gradlew :<a>:<f>:<v>:gate`.

## Migrating existing packages to gradle

With Claude Code: `/migrate-packages [<a>/<f>/<v>...]`. See [.claude/skills/migrate-packages/SKILL.md](.claude/skills/migrate-packages/SKILL.md).

## Publishing

`.github/workflows/publish.yml` invokes `zerobias-org/devops/.github/workflows/zbb-publish-reusable.yml@main` on push to `main` / `qa` / `dev` / `uat`. It auto-detects changed framework packages, single-writer version-bumps on main, publishes per-package, then refreshes the bundle.

For pre-release validation on a feature branch:

```bash
gh workflow run publish.yml --ref <branch>
```

## Branches

- `main` — default, all PRs target it
- `dev`, `qa`, `uat` — env branches kept in sync by the publish workflow's `sync` job

## Commit format

[Conventional Commits](https://www.conventionalcommits.org/), enforced by `commitlint` (`.commitlintrc.json`).

```
feat(framework-<a>-<f>-<v>): short subject
feat(framework-<a>-<f>-<v>)!: <subject> (<oldVer> → <newVer>)   # for major bumps
```
