# SCF Framework Update Tool

Private (`"private": true`, never published) fetcher that pulls Secure Controls
Framework releases from the upstream GitHub repo and regenerates a framework
content package per SCF version under `package/scf/scf/<version>/`.

Vendor is **`scf` (SCF Council)**, not `complianceforge` — the framework packages
were re-homed to the SCF Council vendor in #221 / #228, and this tool moved with
them. Old `@zerobias-org/framework-complianceforge-scf-*` packages are superseded
via `zerobias.migrates-from` on each generated package.

## Files

| File | Role |
|---|---|
| `index.ts` | `SCFUpdater` — orchestration, element mapping, package scaffolding, CLI |
| `github-client.ts` | Release discovery, version compare, asset download w/ size validation |
| `excel-parser.ts` | Workbook → domains + controls (sheet + header-row detection) |
| `types.ts` | Workbook column-header keys and element/index shapes |
| `cache/` | Downloaded `.xlsx` files — **git-tracked**, and the tool's only version state |

## Run

```bash
cd package/scf/scf/update
npm install
npm run update            # no-op if cache already holds the latest release
npm run update -- --force # re-download + regenerate the latest release
```

Then gate the generated package (this tool does **not** validate — the gradle
gate does):

```bash
./gradlew :scf:scf:<version>:gate
```

`.github/workflows/daily-update.yml` runs `npm run update` for every
`package/**/update/` package, then gates each changed framework package and
opens a PR to `main`.

## What a run produces

For SCF `<v>`, `package/scf/scf/<v>/`:

- `index.yml` — framework metadata; `elementTypes` = domain / control / enhancement, `mappingTypes` = control + enhancement
- `elements/<code>.yml` — one file per domain, control and enhancement (`AC-01.1` → `ac-01-1.yml`)
- `package.json` — npm name `@zerobias-org/framework-scf-scf-<v>`, `zerobias.package` `scf.scf.<v_>.framework` (dots → underscores), suite dep `@zerobias-org/suite-scf-scf`
- `.npmrc` — copied from the repo root
- `build.gradle.kts` — `plugins { id("zb.content") }`, so zbb discovers the package

The npm-name / `zerobias.package` / directory triple is exactly what the gate's
`contentValidator` triangulates (see root `build.gradle.kts`); changing the
naming here without changing it there fails the gate.

## Element shape

Domains carry `intent`; controls and enhancements carry `controlQuestion`,
`functionGrouping`, `controlWeighting` and six `cmm_0..cmm_5` maturity blocks.
`elementType` is `enhancement` when the SCF number contains a dot (`AC-01.1`),
otherwise `control`; `parent` is derived from the number (`AC-01.1` → `ac-01`,
`AC-01` → `ac`).

## Version detection — the sharp edge

`getCurrentVersion()` derives the current version from **filenames in `cache/`**,
not from the generated package directories. Consequences:

- A version package that exists on disk but whose `.xlsx` was never committed to
  `cache/` is invisible to the tool, so it will happily "discover" it again.
- Upstream tag and asset filename disagree at times (tag `2025.3` ships
  `secure-controls-framework-scf-2025-3-1.xlsx`), and the generated directory is
  named from the **asset filename**, not the tag.
- Only the release GitHub marks `latest` is ever fetched, so intermediate
  releases are skipped (2026.1 has no package for this reason).

## Upstream column drift

SCF renames and drops workbook columns between releases. Two changes already
absorbed, both reflected in `types.ts`:

- maturity columns `SP-CMM n` → `C|P-CMM n`
- `Methods To Comply With SCF Controls` removed in 2025.4, replaced by
  per-firm-size `Possible Solutions & Considerations` columns

`excel-parser.ts` matches headers exactly first, then falls back to substring
matching, so a renamed column silently yields an empty field rather than an
error. After any upstream release, diff a generated element against the previous
version before merging.
