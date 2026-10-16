Assessment is required when: The assertion is a holder-of-key assertion at FAL3.

A holder-of-key assertion contains a reference to an authenticator. Before creating an authenticated session, the RP must verify that the subscriber controls this authenticator - the assertion signature alone is insufficient.

**Assessment objective**

Determine whether the RP verifies the authenticator indicated in a holder-of-key assertion before associating the RP subscriber account with an authenticated session.

**Assessment methods**

- EXAMINE: Examine RP documentation to verify that holder-of-key authenticator verification occurs before session creation.
- TEST: Test by presenting a holder-of-key assertion and verifying that the RP requires proof of the indicated authenticator before creating an authenticated session.
