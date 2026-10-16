Assessment is required when: Symmetric keys, rather than asymmetric key pairs, are used for the federation relationship.

Since symmetric keys allow for both the creation and verification of both signed and encrypted content by all parties who possess the key, it's important that any symmetric keys be limited to use between only a single pair of connected parties. If symmetric keys are made available to any other parties, those parties can impersonate each other.

Reusing symmetric keys across multiple federation relationships also increases the risk of key compromise: a compromise of one relationship would compromise all relationships that use the same key. This control ensures that a key shared between an IdP and RP-A is different from the key shared between the same IdP and RP-B.

**Assessment objective**

Determine whether symmetric keys are unique to each pair of federation participants.

**Assessment methods**

- EXAMINE: Examine documentation describing symmetric key generation and assignment processes. Verify that the documented process produces a unique symmetric key for each pair of federation participants. Determine whether the process ensures that any symmetric key used for one pair of federation participants is not reused for any other pair.
- EXAMINE: Examine key management system records or configuration entries for a sample of federation relationships. Verify that distinct key identifiers or key entries exist for each pair of participants.
