**Applies to:** RP · **Assurance level:** ALL · **Section:** SP 800-63C-4 3.9 A

An authenticated session SHALL be created by the RP only when the following conditions are true:

- (a) The RP has processed and verified a valid assertion.
- (b) The assertion is from the expected IdP for a transaction.
- (c) The IdP that issued the assertion is the IdP identified in the federated identifier of the assertion.
- (d) The assertion is associated with an RP subscriber account, which may be ephemeral.
- (e) The RP subscriber account has been provisioned at the RP through the method specified in the trust agreement.
