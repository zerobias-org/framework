**Assessment objective**

Determine whether the RP verifies the bound authenticator during FAL3 assertion processing, rather than in a separate transaction.

**Assessment methods**

- EXAMINE: Examine the RP's transaction flow documentation to verify that bound authenticator verification is integrated into the FAL3 assertion processing flow rather than performed as a separate authentication transaction.
- TEST: Test by initiating an FAL3 federated transaction requiring a bound authenticator, and successfully complete the bound authenticator verification. Verify that the RP accepts the bound authenticator and establishes the FAL3 session. Review the RP transaction logs to confirm the bound authenticator verification is recorded as part of the assertion processing event, not as a separate authentication event.
