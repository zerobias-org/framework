At FAL2, assertions must be explicitly scoped to a single RP to prevent cross-RP assertion replay. Unlike FAL1, where multiple audiences are permitted, FAL2 and above require one-to-one binding between the assertion and the RP, ensuring that a captured assertion cannot be reused at another RP within the federation.

**Assessment objective**

Verify that, at FAL2 and above, the IdP includes an audience restriction in each assertion that designates exactly one RP as the intended recipient.

**Assessment methods**

- EXAMINE: Satisfied by AUDR-1.
