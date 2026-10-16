Assessment is required when: The RP is in a trust agreement with an IdP, but does not include that IdP in an allowlist.

For IdPs that are in a trust agreement with the RP but not allowlisted, the RP must present a runtime authorization decision to the authorized party. Common implementations include allowing the authorized party to type a directed identifier to facilitate discovery, or using an account chooser to select from available IdPs.

**Assessment objective**

Determine whether non-allowlisted IdPs are governed by a default policy in which runtime authorization decisions are made by the authorized party identified in the trust agreement artifact(s).

**Assessment methods**

- EXAMINE: Examine the trust agreement artifact(s) and RP decision logic to determine which party is designated as the authorized party for non-allowlisted IdPs.
- TEST: Test by initiating a federation transaction using an IdP that is in a trust agreement with the RP but is not allowlisted, and determine that the runtime decision is made by the authorized party identified in the trust agreement.
