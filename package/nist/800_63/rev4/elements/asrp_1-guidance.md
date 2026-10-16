The RP must verify all five conditions before creating an authenticated session. This prevents session creation based on invalid or incomplete assertions.

**Assessment objective**

Determine whether the RP creates authenticated sessions only once all required conditions are met.

**Assessment methods**

- EXAMINE: Examine RP assertion processing logic and session management documentation to verify that: (a) The assertion's signature and validity are verified before session creation; (b) The assertion's issuing IdP is checked against the expected IdP for the transaction, and the assertion is from the expected IdP; (c) The federated identifier's IdP matches the assertion's issuer; (d) The assertion is linked to an RP subscriber account; and (e) The provisioning method matches what is specified in the trust agreement artifact(s).
- TEST: Test by presenting a valid assertion meeting all conditions and verify that an authenticated session is created. Then present assertions that fail one or more conditions and verify that no authenticated session is created.
