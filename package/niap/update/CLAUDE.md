# NIAP Protection Profile Update Tool

Private (`"private": true`, never published) fetcher that turns NIAP's Protection
Profiles, PP-Modules and Functional Packages into framework packages
`package/niap/<suite>/<version>/`.

Source: the XML NIAP authors every document in, on GitHub under
[`commoncriteria`](https://github.com/commoncriteria) (Unlicense). `sources.json` pins each
document to the branch or tag that holds its published version, and maps it to NIAP's
catalog id (`https://www.niap-ccevs.org/protectionprofiles/<ppId>`) and its package path.
Package paths follow NIAP's short names: `PP_APP_v2.0` → `pp_app/v2_0`,
`MOD_VPNC_V3.0` → `mod_vpnc/v3_0`, `PKG_TLS_V2.1` → `pkg_tls/v2_1`.

NIAP's list of current documents comes from its public endpoint
`https://www.niap-ccevs.org/api/protection-profile/get_pp_for_dropdown/`
(`get_pp_by_id/?pp_id=<id>` gives one record). The site's other list endpoints need a login.

## Run

```bash
cd package/niap/update
npm install
npm run update                       # every source; a document whose XML is unchanged is skipped
npm run update -- pp_app/v2_0        # one source, by package path or NIAP short name
npm run update -- pp_app/v2_0 --force
```

Then gate each package (this tool does not validate — the gradle gate does):

```bash
./gradlew :niap:pp_app:v2_0:gate
```

A new document also needs its suite `niap/<suite>` in zerobias-org/suite, published
before the framework gate can run.

## What a run produces

| File | Content |
|---|---|
| `elements/<class>.yml` | One per requirement class the document uses — `fcs` "Cryptographic Support (FCS)", `adv` "Development (ADV)" (`elementType: class`) |
| `elements/<code>.yml` | One per SFR (`f-component`, `elementType: sfr`) and SAR (`a-component`, `elementType: sar`), `parent` = its class. Code from the requirement id: `FCS_RBG_EXT.1` → `fcs_rbg_ext_1`, `FCS_CKM.1/AK` → `fcs_ckm_1_ak` |
| `elements/<code>-background.md` | Requirement id and status, then each element's statement (`FCS_RBG_EXT.1.1`, `ADV_FSP.1.1D`) with selections and assignments in CC notation, then dependencies |
| `elements/<code>-guidance.md` | Per element: application notes and evaluation activities (TSS / Guidance / KMD / Tests; platform-specific tests labelled by platform) |
| `baselines/<status>.yml` | Requirements by NIAP status: `mandatory`, `selection_based`, `optional`, `objective`, `implementation_based` |
| `index.yml`, `package.json`, `.npmrc`, `build.gradle.kts` | Written only when missing — published files, hand-maintained afterwards |

Requirements marked `status="invisible"` are skipped. Every rerun keeps existing element
and baseline `id`s; `elements/` and `baselines/` are otherwise regenerated wholesale, so a
requirement NIAP removes disappears — restore it with `deprecate: true` instead (element
content rules: never delete a loaded element).

PP-Modules (documents with `base-pp` sections, which modify base-PP SFRs once per base PP)
are not supported yet: the run stops on them.

## Element content rules

`description` must be one plain line under 200 characters. Content-rule logic is shared
with the SCF updater (`../../scf/scf/update/content-rules.ts`). A requirement with one
statement and no selection or assignment uses that statement verbatim; every other
requirement takes its description from `summaries.json`, keyed by NIAP short name, then
element code.

**A requirement with no summary fails the run.** The run writes `missing-summaries.json`
(git-ignored) and writes nothing to the packages. Write the summaries with the meta-repo
`fix-element-content` skill's `summary-prompt.md` (the worklist's `hash` field holds the
element code), validate them with its `validate.py`, merge them into `summaries.json` under
the document's short name, and re-run.

## Cache

`cache/<suite>/<version>.xml` holds the XML each package was generated from (git-tracked).
It is the tool's only version state: delete it and the next run regenerates.
