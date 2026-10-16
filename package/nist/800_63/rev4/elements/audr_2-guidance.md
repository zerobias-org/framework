If the RP utilizes an IdP that lists multiple RPs in a single assertion at FAL1, confirm that the RP correctly handles assertions containing multiple RP identifiers.

**Assessment objective**

Determine whether RPs enforce audience restrictions in presented assertions.

**Assessment methods**

- EXAMINE: Examine the RP documentation and configuration to confirm that audience validation occurs and that only assertions listing the RP's identifier are accepted.
- EXAMINE: Examine the documented results of conformance testing to the federation standards, protocols, and/or profiles implemented by the RP, if available.
- TEST: Test by presenting an assertion whose audience contains the RP's identifier and determining that the RP accepts it, and an assertion whose audience does not contain the RP's identifier and determining that the RP rejects it. If the RP accepts assertions with multiple audience identifiers at FAL1, test an assertion that contains the RP's identifier along with other RP identifiers and determine that the RP processes it correctly.
