Assessment is required when: The RP performs account resolution when verifying an authenticator used in a holder-of-key assertion for the first time.

When an RP encounters a holder-of-key authenticator for the first time, it must associate that authenticator with an RP subscriber account. Since the RP did not issue the authenticator, it does not know which account it belongs to. The RP uses attributes carried with the authenticator to resolve to the correct account before accepting the authenticator for FAL3 sessions.

**Assessment objective**

Determine whether the RP ensures that attributes carried with a holder-of-key authenticator uniquely resolve to an RP subscriber account before accepting the authenticator.

**Assessment methods**

- EXAMINE: Satisfied by ACCR-1.
