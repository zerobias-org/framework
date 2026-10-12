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
| `content-rules.ts` | Element content rules at generation time — port of the meta-repo `fix-element-content` scripts |
| `summaries.json` | `{textHash: description}` — one-line summaries for SCF source texts that break the rules |
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

`.github/workflows/weekly-update.yml` runs `npm run update` for every
`package/**/update/` package, then gates each changed framework package and
opens a PR to `main`.

## What a run produces

For SCF `<v>`, `package/scf/scf/<v>/`:

- `index.yml` — framework metadata; `elementTypes` = domain / control / enhancement, `mappingTypes` = control + enhancement
- `elements/<code>.yml` — one file per domain, control and enhancement (`AC-01.1` → `ac-01-1.yml`)
- `elements/<code>-background.md` — the full SCF text, as markdown, for every element whose description needed a summary
- `package.json` — npm name `@zerobias-org/framework-scf-scf-<v>`, `zerobias.package` `scf.scf.<v_>.framework` (dots → underscores), suite dep `@zerobias-org/suite-scf-scf`
- `.npmrc` — copied from the repo root
- `build.gradle.kts` — `plugins { id("zb.content") }`, so zbb discovers the package

The npm-name / `zerobias.package` / directory triple is exactly what the gate's
`contentValidator` triangulates (see root `build.gradle.kts`); changing the
naming here without changing it there fails the gate.

A `--force` run over a version that already exists keeps every element `id`, and does
not rewrite `index.yml` or `package.json`: they are published, and new ids orphan the
rows the dataloader loaded.

## Element content rules

Generated elements follow the meta-repo's `docs/ElementContentRules.md`: `description`
is one plain line under 200 characters, and the full text goes to `<code>-background.md`.
SCF control text is long and multi-line, so for about 600 elements per version the
description comes from `summaries.json`, keyed by `textHash` (sha1 of the
whitespace-normalized source text). A control whose text is unchanged between releases
reuses its summary. Text that only needs its line breaks joined is joined without a
summary.

`content-rules.ts` is a port of the skill's `rules.py` / `heur.py` / `mdconv.py` /
`fix.py`. It reproduces the hand fix of SCF 2023.3.1–2026.2 (c1e48cf52) byte for byte,
3634/3634 elements. Keep it in sync with the skill. A drifting `norm` silently misses
every stored summary.

**New SCF text with no summary fails the run.** The run writes `missing-summaries.json`
(the skill's worklist format, git-ignored) and writes nothing to the package. The fix:

1. Write the summaries with the skill's `summary-prompt.md` (meta-repo
   `.claude/skills/fix-element-content/`) and validate them with its `validate.py`.
2. Merge them into `summaries.json`.
3. Re-run `npm run update`.

This fails on purpose. The gate only warns until `zb.elementRules=enforce`, so
otherwise a release with violations ships green, as 2026.3 1.0.0 did.

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

SCF renames, drops and inserts workbook columns between releases. Changes
already absorbed:

- maturity columns `SP-CMM n` → `C|P-CMM n` → `SCR-CMM Level n` — resolved by
  level number (`resolveCmmColumns`)
- `Methods To Comply With SCF Controls` removed in 2025.4, replaced by
  per-firm-size `Possible Solutions & Considerations` columns
- domain principles `(C|P) Principles` → `(SCR) Principles` (2026.2) — resolved
  by the `Principles` suffix
- `Legacy SCF #` inserted next to `SCF #` (2026.3) — the old substring fallback
  let it overwrite the real ID, producing a single `none.yml` element that the
  gate rejected as a sentinel

`mapRowToObject` matches headers exactly (whitespace-normalized) first; the
substring fallback only fills a key that has no exact column, so a new column
can no longer shadow an existing one. A renamed column still silently yields an
empty field rather than an error. After any upstream release, diff a generated
element against the previous version before merging.
