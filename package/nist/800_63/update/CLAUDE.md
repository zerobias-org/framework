# NIST SP 800-63-4 Update Tool

Private (`"private": true`, never published) fetcher that pulls NIST's SP 800-63-4
conformance criteria (OSCAL catalog) and regenerates the framework package
`package/nist/800_63/rev4/`.

Source page: <https://pages.nist.gov/800-63-4-Implementation-Resources/conformance/criteria.html>.
The tool finds the `*-oscal.json` link on that page, so a new criteria version
(`…-v0.1-oscal.json` → `…-v0.2-oscal.json`) is picked up without a code change.

## Run

```bash
cd package/nist/800_63/update
npm install
npm run update            # no-op if cache/ already holds the same catalog
npm run update -- --force # regenerate from the current catalog
```

Then gate the package (this tool does not validate — the gradle gate does):

```bash
./gradlew :nist:800_63:rev4:gate
```

`.github/workflows/weekly-update.yml` runs `npm run update` for every
`package/**/update/` package, then gates each changed framework package and opens a PR.

## What a run produces

| File | Content |
|---|---|
| `elements/<volume>.yml` | One per volume — `sp800_63`, `sp800_63a`, `sp800_63b`, `sp800_63c` (`elementType: volume`) |
| `elements/<code>.yml` | One per criterion (`elementType: criterion`, the mapping type), `parent` = its volume. Code from the OSCAL id: `IDPRF-1` → `idprf_1`, `AAL3AVR-3.5` → `aal3avr_3_5` |
| `elements/<code>-background.md` | Target, assurance-level marking and section label, then the full statement |
| `elements/<code>-guidance.md` | NIST guidance (when present), the assessment objective and the assessment methods (EXAMINE / INTERVIEW / TEST) |
| `baselines/{ial,aal,fal}{1,2,3}.yml` | Criteria NIST marks with that level, plus the volume's `ALL` criteria |
| `index.yml`, `package.json`, `.npmrc`, `build.gradle.kts` | Written only when missing — published files, hand-maintained afterwards |

Every rerun keeps existing element and baseline `id`s (read from the files it
replaces). `elements/` and `baselines/` are otherwise regenerated wholesale, so a
criterion NIST removes disappears from the package — check the diff and restore it
with `deprecate: true` instead (element content rules: never delete a loaded element).

Baselines follow NIST's own marking only. Topical markings that name no level
(`Syncable`, `RPs`, `FedAgen`, and every Base-volume marking such as `DIRM Step 1`)
put the criterion in no baseline. Levels are not treated as cumulative: `ial3`
holds what NIST marks `IAL3` or `ALL`, not the `IAL2` criteria.

## Element content rules

`description` must be one plain line under 200 characters. Content-rule logic is
shared with the SCF updater (`../../../scf/scf/update/content-rules.ts`); keep it
there. A statement that fits is used verbatim, a statement that only needs its line
breaks joined is joined, and anything else takes its description from
`summaries.json`, keyed by `textHash` (sha1 of the whitespace-normalized statement).

NIST repeats some statements word for word at different levels or in different
sections (IAL1-17 = IAL2-23, SFOV-5 = MFOV-5). One hash-keyed summary would land on
all of them, naming at most one level correctly. Those take a summary keyed by
**element code** (`"ial1_17": "At IAL1, …"`), which wins over the hash key. A repeated
statement that needs a summary ignores hash keys entirely: it is listed in
`missing-summaries.json` under its element code (the worklist's `hash` field holds the
code), so the merged summary lands on that element only.

**A statement with no summary fails the run.** The run writes `missing-summaries.json`
(git-ignored) and writes nothing to the package. Write the summaries with the meta-repo
`fix-element-content` skill's `summary-prompt.md`, validate them with its
`validate.py`, merge them into `summaries.json`, and re-run.

## Cache

`cache/` holds the last catalog the tool generated from (git-tracked). It is the
tool's only version state: delete it and the next run regenerates.
