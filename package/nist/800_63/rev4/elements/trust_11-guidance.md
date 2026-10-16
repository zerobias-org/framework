This control is a prerequisite for TRUST-10, which requires that trust agreement terms be disclosed to subscribers in clear, understandable language. While subscribers need sufficient information to understand how their data is handled, the disclosure must not inadvertently reveal security details that could be exploited by attackers.

Sensitive security information that should be protected from disclosure may include specific fraud-detection mechanisms, security-monitoring thresholds, incident-response procedures, cryptographic implementation details beyond what is necessary for subscriber understanding, and internal system architecture that could aid targeted attacks.

The review must include all parties responsible for informing subscribers. Which parties bear this responsibility depends on the trust agreement structure: in bilateral agreements, the IdP and RP coordinate directly; in multilateral agreements, the federation authority may also be involved.

**Assessment objective**

Determine whether all parties responsible for informing subscribers of trust agreement terms have reviewed those terms before disclosure to avoid revealing sensitive security information.

**Assessment methods**

- EXAMINE: Examine documentation of the review process, including records of which parties participated in the review, what was reviewed, and any redactions or modifications made to protect sensitive security information. Examine the subscriber-facing disclosure to verify that sensitive security details (e.g., security monitoring capabilities, fraud detection thresholds) are not exposed.
- INTERVIEW: Interview representatives from each party responsible for subscriber disclosure to confirm that a review occurred prior to disclosure and to understand the criteria used to identify and protect sensitive security information.
