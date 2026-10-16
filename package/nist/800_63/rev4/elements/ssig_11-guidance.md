Assessment is required when: Shared signaling is used and the RP allows account linking to multiple IdPs.

Companion to SSIG-10, which requires the RP to document its signal-handling practices for linked accounts. This control constrains what those signals may contain. Revealing linked IdP identities could enable profiling of a subscriber's identity provider relationships, undermining federation privacy goals.

**Assessment objective**

Determine whether the RP's shared signals are constructed so as not to reveal the identity of any other IdPs linked to the subscriber's RP subscriber account.

**Assessment methods**

- EXAMINE: Examine the RP shared signal message content and structure to verify that no signal includes or implies the identity of other IdPs linked to the subscriber's RP subscriber account (e.g., IdP identifiers, IdP-specific federated identifiers, or attributes uniquely associated with a particular IdP).
- TEST: Test by generating one or more shared signals for a test RP subscriber account linked to multiple IdPs and verifying that the outbound signal content does not directly or indirectly reveal the identity of any other linked IdP.
