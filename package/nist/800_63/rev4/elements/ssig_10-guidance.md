Assessment is required when: Shared signaling is used and the RP allows account linking to multiple IdPs.

This control addresses the ambiguity that arises when a signal pertains to one IdP's subscriber account, but the RP subscriber account is also accessible via other IdPs. Without documented practices, signal handling for linked accounts is ad hoc and potentially inconsistent.

Related: SSIG-11 constrains these practices by requiring that shared signals not reveal the identity of a subscriber's linked IdPs

**Assessment objective**

Determine whether the RP documents its practices for handling shared signals that affect RP subscriber accounts linked to multiple IdPs.

**Assessment methods**

- EXAMINE: Examine the RP policy documentation for practices governing how signals received from one IdP are applied to an RP subscriber account that is also linked to one or more other IdPs (e.g., whether a compromise signal from one IdP triggers suspension of the entire RP subscriber account or only the affected federated identifier).
