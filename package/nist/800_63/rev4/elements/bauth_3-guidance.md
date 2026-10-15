**Assessment objective**

Determine whether bound authenticators are unique per subscriber at the RP, such that two subscribers cannot present the same authenticator for their separate RP subscriber accounts.

**Assessment methods**

- EXAMINE: Examine RP-bound authenticator binding logic to verify that a uniqueness constraint prevents the same authenticator identifier from being associated with multiple RP subscriber accounts.
- TEST: Test by attempting to bind the same authenticator to two different RP subscriber accounts. Verify that the RP rejects the second binding.
