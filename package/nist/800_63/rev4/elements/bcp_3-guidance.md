Assessment is required when: A back-channel presentation is used.

The IdP is responsible for ensuring that once an assertion reference has been redeemed (i.e., used by the designated Relying Party to obtain the assertion), it cannot be used again. This control prevents replay attacks and the unauthorized reuse of valid assertion references by an attacker or another RP session.

**Assessment objective**

Determine whether assertion references can be successfully used only once.

**Assessment methods**

- EXAMINE: Examine the IdP's assertion reference lifecycle configuration to confirm that the IdP maintains a state record for each issued reference. Verify that references are invalidated (e.g., flagged or deleted) upon first successful redemption.
- TEST: Test by obtaining a valid assertion reference and redeeming it once through the IdP's assertion-resolution endpoint. Attempt a second redemption of the same reference; verify that the IdP rejects the request (e.g., returns an error such as "invalid_reference," "expired," or "already_used").
