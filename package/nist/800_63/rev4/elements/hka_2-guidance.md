Holder-of-key assertions are built around proving that a subscriber is not only known to the IdP, and therefore able to get an assertion issued, but also able to present proof of a cryptographic key in the assertion. This key represents the subscriber, not the IdP or the RP, and the proof of possession of the key is presented by the subscriber directly to the RP. This requirement does not assume that the RP has registered the key for the subscriber, and the subscriber key might be unknown to the RP ahead of processing the assertion. Additionally, the technology in place might use different keys for a subscriber over time. Because of these aspects, the RP needs to validate the subscriber's key separately upon login.

**Assessment objective**

Determine whether the RP validates the subscriber's key for holder-of-key assertions.

**Assessment methods**

- EXAMINE: Examine the RP's assertion processing documentation to verify that holder-of-key authenticator verification is implemented before granting FAL3 access.
- TEST: Test by presenting a holder-of-key assertion and authenticating with the correct subscriber key. Verify that the RP grants FAL3 access. Next, present a holder-of-key assertion and authenticate with an incorrect key. Verify rejection. Finally, present a holder-of-key assertion without presenting any key. Verify rejection.
