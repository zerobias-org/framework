ARTC-8 establishes the equivalent requirement for traditional federation (Sec. 4.9 H). In the wallet model, the wallet's own signing key may also serve as the holder-of-key authenticator, since the attribute bundle from the CSP already binds that key to the subscriber.

**Assessment objective**

Determine whether the wallet's assertion at FAL3 includes either a holder-of-key identifier or a bound authenticator indicator.

**Assessment methods**

- TEST: Test by initiating a federation transaction at FAL3 with a subscriber-controlled wallet. Capture the assertion and verify it contains either: (a) a public key, key identifier, or other identifier for a holder-of-key assertion, or (b) an indicator that verification of a bound authenticator is required.
