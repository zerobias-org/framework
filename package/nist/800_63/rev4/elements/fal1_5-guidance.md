Replay protection ensures that a given RP does not accept the same assertion more than once within its validity time window. At FAL1, where multi-audience assertions are permitted, each RP in the audience may accept the assertion once - but no individual RP may accept it a second time. Common replay detection mechanisms include tracking assertion identifiers, validating nonces, and enforcing timestamp-based expiration windows.

**Assessment objective**

Verify that the RP enforces replay protection by detecting and rejecting any assertion that has already been accepted, ensuring the same assertion cannot be used more than once.

**Assessment methods**

- EXAMINE: Examine RP documentation, federation configuration, code, and test results to confirm that replay detection mechanisms exist (e.g., nonce validation, assertion ID, and timestamp) and that repeated assertions are rejected.
- EXAMINE: Examine documented results of conformance testing to the standards, protocols, and profiles implemented by the RP, if available.
- TEST: Test the RP configuration by replaying a previously accepted, valid assertion. Confirm rejection.
