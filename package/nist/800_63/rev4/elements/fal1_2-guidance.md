This requirement ensures that the RP verifies the cryptographic signature on assertions to confirm their authenticity and integrity. The RP must use the verification key specifically associated with the expected IdP. For assessment of how the RP obtains and establishes that key through trusted mechanisms (discovery, registration, manual exchange, or federation authorities), see ICKM-1 and ICKM-2. For assessment of the specific signature mechanism type, see SIGNA-4.

**Assessment objective**

Determine whether the RP validates the assertion signature using the verification key associated with the expected IdP.

**Assessment methods**

- EXAMINE: Examine the RP's signature-validation logic, configuration, and key-establishment documentation to verify that the RP selects the verification key based on the expected IdP identifier and validates assertion signatures only with the verification key associated with that IdP.
- EXAMINE: Examine the documented results of conformance testing to the IdP/RP implemented standards, protocols, and profiles if available (e.g., OIDC federation OP test)
- TEST: Test by setting up a test IdP and (1) Presenting a valid assertion signed by the expected IdP's key. Verify acceptance. (2) Presenting an assertion signed by a different trusted IdP's valid key. Verify rejection. (3) Presenting an assertion claiming the expected IdP as issuer but signed with a different IdP's key. Verify rejection. (4) Presenting an assertion signed with an unknown or untrusted key. Verify rejection. (5) Presenting an assertion with no signature. Verify rejection.
