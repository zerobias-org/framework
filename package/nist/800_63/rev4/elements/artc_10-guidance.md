This control consolidates the RP's assertion validation obligations into a single checklist.

Items 1, 2, 4, 6b, and 7 defer to dedicated controls; the unique assessment work here is time validation (item 3), nonce validation (item 5), and trust agreement xAL conformance (item 6a).

**Assessment objective**

Determine whether the RP validates all required elements of an assertion before accepting it.

**Assessment methods**

- EXAMINE: Verify that the RP's assertion validation process includes all of the following checks: (1) Signature validation, satisfied by FAL1-2. (2) Issuer verification, satisfied by ASRP-1 (b). (3) Time validation:  Examine the RP's assertion processing logic to confirm it compares the assertion's issuance time and expiration against the current timestamp and rejects assertions outside the validity window. (4) Audience restriction, satisfied by AUDR-2. (5) Nonce validation (required at FAL2 & FAL3): Test by doing the following: (a) Generate a test federation transaction at FAL2 or above and capture the nonce sent in the RP's federation request. (b) Verify the RP accepts an assertion containing the matching nonce. (c) Present an otherwise valid assertion containing a different nonce value - verify rejection. (d) Present an otherwise valid assertion with the nonce omitted - verify rejection. (6) Transaction terms: Examine the xAL terms established in the trust agreement artifact(s) (see TRUST-7) and ensure that the RP is configured to only accept those xALs. Suitability terms are satisfied by RXAL-8. (7) Assertion identifier: satisfied by FAL1-5.
