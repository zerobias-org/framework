Assessment is required when: A back-channel presentation is used.

The assertion reference is a temporary artifact whose sole purpose is to allow the RP to retrieve the full assertion from the IdP. A short lifetime limits the window for interception, replay, or misuse. The guidelines recommend (SHOULD) a validity window of no more than five minutes.

**Assessment objective**

Determine whether assertion references are time-limited.

**Assessment methods**

- EXAMINE: Examine the IdP's federation protocol configuration (e.g., authorization code lifetime in OIDC, artifact validity window in SAML) to identify the configured assertion reference lifetime.
- TEST: Test by completing a back-channel federation transaction up to the point where the test RP receives the assertion reference, but do not immediately redeem it. Wait beyond the configured lifetime, then have the test RP present the reference to the IdP. Confirm that the IdP rejects the expired reference.
