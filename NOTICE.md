# Content Attribution Notices

The framework packages in this repository reproduce compliance content whose
source material is owned by third parties and used under their published
licenses. This file records the attribution those licenses require. It travels
with the repository; the same notices apply to the npm packages published
from it.

Each package declares its content's license in the standard `"license"` field
of `package.json` — for example `CC-BY-ND-4.0` on the SCF packages and
`CC-BY-SA-4.0` on the OWASP ones. Where a package still reads `ISC`, that value
is stale rather than authoritative: it describes only the packaging scaffolding
and predates this convention, and it is being corrected package by package as
each takes its next content bump. **The sections below are authoritative for
every package, whatever its `package.json` currently says.**

---

## Secure Controls Framework (SCF)

**Applies to:** every package under `package/scf/scf/`.

These packages reproduce the **Secure Controls Framework (SCF)** control
catalog — control identifiers, names, descriptions, and associated metadata —
published by the Secure Controls Framework Council, LLC.

- **Source:** [Secure Controls Framework](https://securecontrolsframework.com/) —
  the officially distributed SCF spreadsheet
  ([securecontrolsframework/securecontrolsframework](https://github.com/securecontrolsframework/securecontrolsframework))
- **Copyright:** © Secure Controls Framework Council, LLC
- **License:** [Creative Commons Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0)](https://creativecommons.org/licenses/by-nd/4.0/)
- **Changes:** the control catalog has been converted from the officially
  distributed spreadsheet format into YAML for machine consumption. The
  control content itself is reproduced verbatim and unmodified. No controls
  have been added, removed, or edited.

SCF controls are used in this solution. This repository and the ZeroBias
platform are not endorsed by, affiliated with, or sponsored by the Secure
Controls Framework Council, LLC.

Per the CC BY-ND 4.0 license, this content may be redistributed verbatim with
this attribution, but modified or derivative versions of the SCF content may
not be distributed. Do not edit the control content of these packages;
regenerate them from the officially published SCF spreadsheet instead.

---

## European Union legislation

**Applies to:** `package/eu/ai/v2024`, `package/eu/cra/v1`, `package/eu/cra_annex/v1`,
`package/eu/dora/2023`, `package/eu/enisa/v1`, `package/eu/enisa/annex`,
`package/eu/gdpr/v1`.

These packages reproduce requirement text from EU regulations and Commission
documents published via EUR-Lex.

- **Source:** [EUR-Lex](https://eur-lex.europa.eu/) — the official EU law portal
- **Copyright:** © European Union, 1998–2026
- **Reuse:** permitted for commercial and non-commercial purposes under
  [Commission Decision 2011/833/EU](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32011D0833),
  subject to acknowledging the source and indicating changes
- **Changes:** requirement text has been extracted from the published documents
  and restructured into YAML elements for machine consumption. Article and
  recital numbering is preserved.

Reuse of EU legal texts does not imply endorsement by the European Union, and
the Commission is not liable for any consequence of their reuse.

---

## Spain — Boletín Oficial del Estado (BOE)

**Applies to:** `package/es/boe/v2022`, `package/es/royaldecree/2022`.

- **Source:** [Agencia Estatal Boletín Oficial del Estado](https://www.boe.es/) —
  BOE-A-2022-7191 (Real Decreto 311/2022, Esquema Nacional de Seguridad)
- **Copyright:** © Agencia Estatal Boletín Oficial del Estado
- **Basis:** Spanish legal texts published in the BOE; reused with attribution
  to the official source
- **Changes:** article text extracted and restructured into YAML elements;
  article numbering preserved

---

## Australia — Australian Signals Directorate / ACSC

**Applies to:** `package/au/aee/v1` (Essential Eight),
`package/au/ism/v1` (Information Security Manual).

- **Source:** [Australian Cyber Security Centre](https://www.cyber.gov.au/)
- **Copyright:** © Commonwealth of Australia
- **License:** [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)
- **Changes:** control and mitigation text extracted and restructured into YAML
  elements for machine consumption

This material is used under CC BY 4.0. The Commonwealth of Australia does not
endorse this repository or the ZeroBias platform.

---

## New Zealand — Te Whatu Ora

**Applies to:** `package/nz/hisf/v1`, `package/nz/hisf/suppliers`.

- **Source:** [Health Information Security Framework](https://www.tewhatuora.govt.nz/) —
  Te Whatu Ora | Health New Zealand
- **Copyright:** © Te Whatu Ora — Health New Zealand
- **License:** [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/),
  consistent with the NZGOAL open-access framework
- **Changes:** requirement text extracted and restructured into YAML elements

---

## India — Digital Personal Data Protection Act, 2023

**Applies to:** `package/in/dpdpa/2023`.

- **Source:** [Ministry of Electronics & Information Technology](https://www.meity.gov.in/) —
  the Digital Personal Data Protection Act, 2023
- **Basis:** statutory text (an edict of government); section numbering preserved
- **Changes:** section text extracted and restructured into YAML elements

---

## OWASP

**Applies to:** `package/owasp/asvs/v4.0.3`, `package/owasp/samm/v1.0`,
`package/owasp/llmtop10/v2025`.

- **Source:** [OWASP Foundation](https://owasp.org/) — Application Security
  Verification Standard, Software Assurance Maturity Model, and Top 10 for
  Large Language Model Applications
- **Copyright:** © The OWASP Foundation
- **License:** [Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/)
- **Changes:** requirement text extracted and restructured into YAML elements;
  OWASP requirement numbering preserved

**Share-alike:** CC BY-SA 4.0 is a copyleft license. Adaptations of this content
must themselves be distributed under CC BY-SA 4.0. `owasp/asvs` and `owasp/samm`
already declare `CC-BY-SA-4.0` in `package.json`; `owasp/llmtop10` still reads
`ISC` and should be corrected at its next content bump.

---

## CNCF — Software Supply Chain Best Practices

**Applies to:** `package/cncf/sscp/v1`.

- **Source:** [CNCF TAG Security](https://tag-security.cncf.io/community/working-groups/supply-chain-security/supply-chain-security-paper/)
- **Copyright:** © The Linux Foundation / CNCF
- **License:** [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)
- **Changes:** practice text extracted and restructured into YAML elements

---

## CoSAI / OASIS — MCP Security

**Applies to:** `package/oasisopen/cosai/mcp_security`.

- **Source:** [CoSAI Workstream 4 — Secure Design for Agentic Systems](https://github.com/cosai-oasis/ws4-secure-design-agentic-systems)
- **Copyright:** © OASIS Open / Coalition for Secure AI contributors
- **License:** [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)
- **Changes:** guidance text extracted and restructured into YAML elements

---

## OpenCRE

**Applies to:** `package/opencre/opencre/v1`.

- **Source:** [OpenCRE — Open Common Requirement Enumeration](https://opencre.org/)
- **Copyright:** © OWASP Foundation / OpenCRE contributors
- **License:** [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)
- **Changes:** common requirement entries fetched from the OpenCRE API and
  restructured into YAML elements; CRE identifiers preserved

---

## United States federal and state government works

**Applies to:** the NIST, CISA, HHS/HIPAA, CMS, DoD, SEC, FDA and US state-law
packages under `package/nist/`, `package/cisa/`, `package/us/`, `package/dod/`
and `package/us_*/`.

Works of the United States federal government are not subject to copyright
within the United States (17 U.S.C. § 105), and statutes and regulations are
edicts of government. No attribution is legally required; the source is recorded
in each package's `index.yml` `url` field.

**Trademark note:** although NIST publications are in the public domain, the
NIST name and the "NIST Cybersecurity Framework" mark are protected. Reference
them nominatively only; nothing here implies NIST endorsement.

---

## DoD 8140 Cyber Workforce Qualification Matrix (DCWF)

**Applies to:** every package under `package/dod/dcwf/`.

These packages reproduce content from the **DoD 8140 Cyber Workforce
Qualification Program Qualification Matrix** and the **DoD Cyber Workforce
Framework (DCWF)**, published by the U.S. Department of Defense under
DoDM 8140.03.

- **Source:** [DoD 8140 Qualification Matrices](https://public.cyber.mil/wid/dod8140/qualifications-matrices/)
  (DoD Cyber Exchange); matrix version and effective date are recorded in each
  package's `index.yml`.
- **License:** works of the United States Government — public domain in the
  United States (17 U.S.C. §105). No copyright is claimed on the reproduced
  content.
- **Trademarks:** certification names referenced by the matrix (e.g. CISSP®,
  CISA®, CISM®, SecurityX®/CASP+®, GIAC® certifications) are trademarks of
  their respective certifying bodies and are used nominatively. Nothing in
  these packages implies endorsement by the U.S. Department of Defense or any
  certifying body.


---

## Sources requiring confirmation before further distribution

The following packages reproduce content whose terms are more restrictive than
the sections above, or ambiguous enough to need a considered call. They are
recorded here for visibility. **Confirm the position with counsel before relying
on these packages in a commercial distribution.**

| Package | Source | Term in tension |
|---|---|---|
| `package/ca/osfi/v1` | OSFI Guideline B-13 | Canada Crown copyright — non-commercial reproduction is free with attribution; adaptation or commercial distribution needs written permission |
| `package/ca/pci/v10_171` | Canadian Centre for Cyber Security ITSP.10.171 | Canada Crown copyright — same terms as above |
| `package/gb/mds/v2024` | UK MOD DEF STAN 05-138 Issue 4 | UK Crown copyright; likely reusable under [OGL v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/) with attribution, but the document carries an ambiguous internal-use clause |
| `package/sparta/counter/v1` | The Aerospace Corporation — SPARTA | Authored by an FFRDC, not the US government, so § 105 does not apply. Redistribution requires preserving the copyright notice, license text and SPARTA® trademark, and honouring MITRE ATT&CK terms |

Where UK Crown material is redistributed under OGL v3.0, the required notice is:
"Contains public sector information licensed under the Open Government Licence
v3.0."

---

## Deliberately stubbed — do not backfill

**Applies to:** `package/iso/27001/2022`, `package/iso/27002/2022`,
`package/iso/42001/2023`, `package/iec/60601/2021`, `package/cn/csl/v1`,
`package/sa/pdpl/v1`, `package/naic/mdl/v1`.

These sources are copyrighted and are **not** licensed for redistribution. The
packages therefore carry only what is not protected — control identifiers,
clause numbers and titles — with the description field reduced to a pointer at
the official source (for example, *"Buy a copy of ISO 27001 for control
content"*). No requirement text is reproduced, so no attribution is owed and
no license is breached.

**This state is intentional and must be preserved.** Do not populate the
description fields of these packages from the source documents, whether by hand
or by an automated fetcher. A well-meaning "the descriptions are empty, let's
fill them in" is exactly how this protection gets undone — the emptiness is the
compliance measure, not a gap.

If full text becomes a product requirement, it needs a paid license from the
publisher (ISO/IEC and NAIC each require a separate written agreement), not a
regeneration.

---

## Maintaining this file

Add a section whenever a package is added whose source is not a US government
work or an edict of government. The licensing assessment behind these entries —
including the packages deliberately reduced to identifiers rather than
reproducing protected text — is recorded in
[LICENSING_REVIEW.md](LICENSING_REVIEW.md).

This file records attribution; it is not legal advice.
