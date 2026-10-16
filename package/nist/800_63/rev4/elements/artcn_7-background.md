**Applies to:** CSP · **Assurance level:** ALL · **Section:** SP 800-63C-4 5.8 G

The signed attribute bundle from the CSP SHALL contain:

- (1) Keys: A verification key or key identifier for the key used by the subscriber controlled wallet to sign assertions.
- (2) Issuer identifier: An identifier for the issuer of the attribute bundle (i.e., the CSP).
- (3) Issuance time: A timestamp that indicates when the CSP issued the attribute bundle.
- (4) IAL: Indicator of the IAL of the subscriber account being represented in the attribute bundle or an indication that no IAL is asserted.
- (5) Signature: A digital signature that uses asymmetric cryptography and covers the entire attribute bundle.
- (6) Attribute values and derived attribute values: Information about the subscriber.
