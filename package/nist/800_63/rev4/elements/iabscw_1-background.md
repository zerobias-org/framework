**Applies to:** CSP · **Assurance level:** ALL · **Section:** SP 800-63C-4 5.1 A

When the CSP issues attribute bundles to the subscriber-controlled wallet, the process SHALL include the following steps:

- (1) The subscriber proves their identity to the CSP's issuance functionality using the CSP's identity proofing process or by authenticating to the subscriber account.
- (2) The subscriber activates the wallet using an activation factor, which might entail authenticating to a hosted wallet service.
- (3) The wallet generates or chooses a signing key and corresponding verification key. The wallet proves possession of its signing key to the CSP.
- (4) The CSP creates one or more attribute bundles that include subscriber attributes and the wallet's verification key (or a reference to that key).
- (5) The wallet stores the attribute bundle for later presentation to RPs.
