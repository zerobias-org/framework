**Applies to:** RP · **Assurance level:** ALL · **Section:** SP 800-63C-4 5.10 C

The RP SHALL validate the assertion by checking that all the following are true:

- (1) Bundle verification: Ensure that the bundle was issued to the wallet that is presenting the assertion to the RP.
- (2) Issuer verification: If a specific wallet was requested by the RP, ensure that the assertion was issued by the requested wallet.
- (3) Time validation: Ensure that the validity time window is within acceptable limits of the current timestamp.
- (4) Audience restriction: Ensure that this RP is the intended recipient of the assertion.
- (5) Nonce: Ensure that the cryptographic nonce included in the RP's request is also included in the presentation.
- (6) Transaction terms: Ensure that the IAL, AAL, and FAL represented by the assertion are allowable under the applicable trust agreement and are suitable for the RP's needs.
- (7) Assertion identifier: Ensure that the assertion has not been replayed within its validity time window at this RP by validating a transaction specific assertion identifier, such as a wallet-provided nonce.
