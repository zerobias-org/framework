Note: SUBPB-2 through SUBPB-12 should be evaluated together.

This applies to the initial binding ceremony when no bound authenticator is yet associated with the RP subscriber account. The subscriber cannot prove possession of a bound authenticator at this stage because none has been bound yet.

**Assessment objective**

Determine whether the RP requires a valid FAL3 assertion with a bound authenticator indicator before initiating a binding ceremony.

**Assessment methods**

- EXAMINE: Examine the RP binding ceremony implementation to verify that it requires an FAL3 assertion containing a bound authenticator indicator before the ceremony proceeds.
- TEST: Test by initiating an FAL3 bound authenticator request for an account that lacks a bound authenticator. Verify that the RP performs validation per CFAL-2 and initiates a binding ceremony session only if validation succeeds.
