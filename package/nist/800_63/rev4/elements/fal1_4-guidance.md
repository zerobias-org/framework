The RP must check that its identifier appears in the assertion's audience field. This prevents replay attacks where assertions intended for other RPs are injected at an unintended RP. If the RP utilizes an IdP that lists multiple RPs in a single assertion at FAL1, confirm that the RP correctly handles assertions containing multiple RP identifiers.

**Assessment objective**

Verify that the RP validates each received assertion to ensure its own identifier appears in the audience restriction and rejects any assertion not explicitly targeted to it.

**Assessment methods**

- EXAMINE: Satisfied by AUDR-2.
