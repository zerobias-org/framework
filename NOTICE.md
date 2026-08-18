# Content Attribution Notices

The framework packages in this repository reproduce compliance content whose
source material is owned by third parties and used under their published
licenses. This file records the attribution those licenses require. It travels
with the repository; the same notices apply to the npm packages published
from it.

The `"license"` field in each package's `package.json` describes the packaging
and build scaffolding, not the framework content. The content licenses below
govern the substantive framework data.

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
