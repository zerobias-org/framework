Assessment is required when: The assertion requires authentication with a bound authenticator at FAL3.

When an assertion indicates that a bound authenticator is required for FAL3, the RP must verify the bound authenticator before creating an authenticated session - the assertion signature alone is not sufficient. The bound authenticator is registered to the RP subscriber account and managed by the RP.

Note: If bound authenticator verification occurs as part of a binding ceremony (see SUBPB-7), this requirement is not satisfied. A new FAL3 federation transaction must be initiated after the binding ceremony completes.

**Assessment objective**

If the assertion requires authentication with a bound authenticator, determine whether the RP verifies a bound authenticator before associating the RP subscriber account with an authenticated session.

**Assessment methods**

- EXAMINE: Satisfied by RPPHBA-1 and RPPHBA-4.
