**Applies to:** RP · **Assurance level:** ALL · **Section:** SP 800-63C-4 4.9 J

The RP SHALL validate the assertion by checking that all of the following are true:

- (1) Signature validation: Ensure that the signature of the assertion is valid and corresponds to a verification key that belongs to the IdP sending the assertion.
- (2) Issuer verification: Ensure that the assertion was issued by the expected IdP.
- (3) Time validation: Ensure that the validity time window is within acceptable limits of the current timestamp.
- (4) Audience restriction: Ensure that this RP is the intended recipient of the assertion.
- (5) Nonce: Ensure that the cryptographic nonce included in the RP's request (if applicable) is included in the presentation.
- (6) Transaction terms: Ensure that the IAL, AAL, and FAL represented by the assertion are allowable under the applicable trust agreement and are suitable for the RP's needs.
- (7) Assertion identifier: Ensure that the assertion has not been replayed within its validity time window at this RP.
