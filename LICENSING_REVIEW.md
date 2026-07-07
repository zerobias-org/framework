# Framework Licensing Review — `zerobias-org/framework`

**Repo:** `zerobias-org/framework` · **Scope:** 74 framework packages · **Date:** 7 Jul 2026 · **Status:** Draft for review

Which compliance-framework packages are safe to ship in a public repository — and which reproduce copyrighted text that isn't ours to redistribute.

> **This is an engineering-side assessment, not legal advice.** The Tier 1 and Tier 2 items should be confirmed with counsel before (or instead of) shipping.

---

## 01 · The bottom line

Most of the catalogue is clean. The risk is concentrated in a short list of packages that reproduce the full requirement text of standards their publishers actively license or sell.

| Count | Category |
|------:|----------|
| **49** | Clean — gov works, edicts of law, or CC-BY / CC0 |
| **8**  | Fix required — restrictive licence **and** full protected text |
| **10** | Decision needed — NC / ND / share-alike / Crown copyright |
| **7**  | Already safe — restrictive source, but text was pre-stubbed |

**Why two dimensions per package.** Licensing risk is the product of two things: how restrictive the *source document's* licence is, and whether our package actually *reproduces its protected text*. A proprietary standard we've reduced to bare control IDs is low-risk; an open-but-share-alike standard we've reformatted verbatim can still be a problem. Every verdict below reflects both — the source licence was researched and then checked against the real `elements/*.yml` content.

Someone has already stubbed the ISO, IEC, and several statute packages down to identifiers and "buy a copy" pointers. **Those are safe and should stay stubbed — do not backfill their text.**

---

## 02 · Fix required (8 packages)

Restrictive or proprietary licence, **and** the package reproduces the full title + description text. These should not sit in a public repo in their current form.

| Package | Elements | Licence reality | Verdict |
|---------|---------:|-----------------|---------|
| `pci_ssc/dss/v4_0_1` | 351 | PCI SSC Terms of Use — personal/internal use only; publishing, distributing, copying and derivatives all expressly prohibited. Free download ≠ free redistribution. | Prohibited |
| `cis/csc/v8_1` | 171 | CC BY-**NC-ND** 4.0 — breaches both the NonCommercial clause (commercial platform) and NoDerivatives (restructured into YAML). Commercial use needs prior CIS approval. | Licence breach |
| `csa/aicm/v1` | 261 | CSA terms — "may not be redistributed"; commercial use gated behind a paid CSA licence. | No redistribution |
| `aiuc/aiuc_1/v1` | 57 | Proprietary, all rights reserved (AIUC). Terms forbid copying or distributing any part; no open licence at all. | Proprietary |
| `iso/27001/2022a` | 93 | ISO "all rights reserved" (POCOSA) — reproduces the Annex A control titles and normative "shall" statements. (The other ISO/IEC packages are already stubbed — see Tier 3.) | Copyrighted |
| `us/nerc/2024` | 204 | NERC asserts copyright over its CIP standards. FERC adoption gives only a *contested* fair-use argument — never held uncopyrightable. | Contested |
| `sa/sai/v2024` | 81 | Saudi NCA IoT guidance, © NCA — a copyrighted government publication (not a statute), with no reuse grant. | No licence |
| `uae/niaf/v1` | 15 | TDRA "all rights reserved" — personal, non-commercial use only, no revisions, no redistribution without written consent. | Prohibited |

---

## 03 · Decision needed (10 packages)

Openly licensed or reproducible, but a clause — NonCommercial, NoDerivatives, share-alike, or Crown copyright — collides with either the commercial context or the fact that we reformat the text into a derivative. Verbatim + attribution may be defensible; restructuring likely isn't. A call from legal is warranted.

| Package | Elements | Clause in tension | Note |
|---------|---------:|-------------------|------|
| `scf/scf/*` (×5 versions) | ~1501 each | CC BY-**ND** 4.0 — no derivatives | **Largest exposure by volume.** Commercial use is fine, but SCF defines derivatives broadly (incl. AI-assisted and restructured content) and gates them behind a paid Licensed Content Provider licence. Covers 2025.2.1, 2025.2.2, 2025.3.1, 2025.4, 2026.1.1. |
| `owasp/llmtop10/v2025` | 10 | CC BY-**SA** 4.0 — share-alike | Commercial use allowed, but the copyleft attaches to our derivative — it must itself carry CC BY-SA 4.0. |
| `ca/osfi/v1` | 77 | Canada Crown copyright | Non-commercial reproduction is free with attribution, but adaptation / commercial distribution needs written permission. |
| `ca/pci/v10_171` | 275 | Canada Crown copyright | Same CCCS / Government of Canada terms as OSFI B-13. |
| `gb/mds/v2024` | 147 | UK Crown copyright / OGL v3.0 | Likely redistributable with attribution ("Contains public sector information licensed under OGL v3.0"), but the doc carries an ambiguous "MOD internal use" clause — confirm. |
| `sparta/counter/v1` | 55 | Aerospace Corp — conditional | Authored by an FFRDC, *not* the government. Redistribution allowed only with copyright + licence text + SPARTA® trademark preserved and MITRE ATT&CK terms honoured. |

---

## 04 · Restrictive source, already safe (7 packages)

The source is copyrighted, but these packages were previously reduced to identifiers, clause numbers, or "buy a copy" pointers — no protected text is present. **No action beyond keeping them that way — do not backfill text.**

| Package | State | Source licence |
|---------|-------|----------------|
| `iso/27001/2022` | 148 / 152 stubbed | ISO all rights reserved — only clause titles remain |
| `iso/27002/2022` | fully stubbed | ISO all rights reserved |
| `iso/42001/2023` | 140 / 144 stubbed | ISO all rights reserved |
| `iec/60601/2021` | fully stubbed | IEC all rights reserved |
| `cn/csl/v1` | article-# refs | Copyrighted Stanford/DigiChina translation is **not** reproduced — only article numbers |
| `sa/pdpl/v1` | article-# refs | Saudi statute; no full text reproduced |
| `naic/mdl/v1` | "see source" stubs | NAIC © all rights reserved (private nonprofit model law) |

---

## 05 · Clean — no action (49 packages)

Source material is genuinely free to redistribute: US government works (public domain, 17 U.S.C. §105), statutes and regulations (edicts of government, not copyrightable), and explicitly CC-BY / CC0 material. Attribution is a light condition on the CC-BY and EU/Spain items.

| Group | Count | Legal basis | Packages |
|-------|------:|-------------|----------|
| NIST publications | 13 | US gov works — public domain (§105) | 800-53 · 800-171 rev2/r3 · 800-171A ×2 · 800-161 · 800-207 · 800-218 · AI 600 · CSF 2.0 · IR 8397 · Label · AI RMF |
| US federal / regulatory | 14 | Public domain; CISA CPG is explicit CC0 | CISA SSDAF · CISA TIC · CISA CPG · CJIS · SEC rule · DPF · FCA · FDA · GLBA · HICP · HIPAA ×2 · MARS-E · DoD ZTRA |
| US state law | 5 | Statutes / regs — edicts of government | CA CPRA · NY DFS 500 · OR CPA · TN IPA · TX CDPA |
| EU & Spain | 9 | EUR-Lex reuse (2011/833/EU) & BOE — attribution required | EU AI Act · CRA · CRA Annex · DORA · ENISA NIS2 ×2 · GDPR · ES BOE · ES Royal Decree |
| Other national | 5 | CC BY 4.0 / statute exception | AU Essential Eight · AU ISM · NZ HISF ×2 · India DPDPA |
| Open community | 3 | CC BY 4.0 / CC0 | CNCF SSCP · CoSAI MCP Security · OpenCRE |

**Attribution caveat inside the clean set:** `nist/csf/v2` content is public domain, but the "NIST Cybersecurity Framework" name and logo are protected marks — reference them nominatively, never in a way implying NIST endorsement.

---

## 06 · Other findings & housekeeping

- **Package metadata misstates the licence.** All 221 `package.json` files declare `"license": "ISC"` (a few MIT). That's the npm-package field, but it misrepresents content that is actually CC-BY, Crown copyright, or proprietary — and it doesn't satisfy the attribution obligations the CC-BY sources (EU, Spain, AU, NZ, CNCF, CoSAI) carry. Consider a dedicated content-licence / source-attribution field per package.
- **No top-level `LICENSE` file** exists in the repo.
- **`adobe/ccf/v5` is an empty scaffold** — no `index.yml`, zero elements, so no current exposure. Note for later: its source (Adobe CCF) is CC BY-**NC**-SA 4.0, so the NC clause would bite if anyone populates it.
- **Duplicate sources** (not a licensing issue, but worth reconciling): `eu/enisa/v1` ≡ `eu/enisa/annex`; `es/boe/v2022` ≡ `es/royaldecree/2022`; `nz/hisf/v1` ≡ `nz/hisf/suppliers`.
- **EU CRA is the proposal text** (COM(2022) 454), not the final adopted Regulation (EU) 2024/2847 — confirm which we intend to ship.

---

## 07 · Recommended remediation

The pattern already applied to ISO/IEC is the template for the rest.

- **For Tier 1 (and the ND / Crown-copyright items in Tier 2):** store only our own control identifiers, codes, and numbering, plus a link to the official source, and stub the copyrighted title/description text. Bare identifiers ("Requirement 8.3.6", "CIS Control 4.1") are facts with thin-to-no copyright protection; the exposure lives entirely in the reproduced titles and narrative descriptions.
- **Where full text is a product requirement:** a paid licence unlocks it cleanly — a CIS commercial approval, an SCF Licensed Content Provider licence, or a CSA licence. ISO/IEC and PCI require a separate written agreement.
- **Across the clean set:** add the attribution notices the CC-BY and EU/Spain reuse terms require, so those stay compliant as the catalogue grows.

---

## Method

Each package's source document was researched for its copyright/licence terms, then cross-checked against the actual `elements/*.yml` content to confirm whether protected text is genuinely reproduced. Verdicts reflect both. This is an engineering-side assessment, not legal advice — the Tier 1 and Tier 2 items should be confirmed with counsel before or instead of shipping.
