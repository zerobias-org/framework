In some larger federation systems, particularly multilateral federations managed by federation authorities, multiple CSPs may be involved in the same trust agreement. In such cases, it may be desirable for CSPs to share information with one another to support activities such as fraud mitigation (e.g., to prevent an attacker from jumping between CSPs with different accounts to avoid detection). While sharing information in this way can help mitigate fraud, there are also substantial privacy concerns, as CSPs could learn subscriber attributes and actions from each other that were not initially disclosed to all CSPs the subscriber uses.

Similar information sharing could be desirable between IdPs that operate independently of the CSP, such as between subscriber-controlled wallets hosted on remote systems, and such sharing entails similar privacy considerations.

(See NISTIR 8062 for guidance on privacy engineering objectives, including predictability and manageability.)

**Assessment objective**

Determine whether information transmissions between CSPs and/or IdPs comply with the limitations enumerated for IdPs in Sec. 3.10.1.

**Assessment methods**

- EXAMINE: Examine documentation that identifies all information transmitted between CSPs and/or IdPs. For each category of information/attributes transmitted, apply the assessment methods from TSI-1, TSI-2, and TSI-3 to verify that the transmission complies with the stated information-sharing limitations.
