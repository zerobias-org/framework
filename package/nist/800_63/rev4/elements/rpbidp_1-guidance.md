Assessment is required when: The RP maintains an IdP blocklist.

Unlike allowlists, blocklists may use wildcard domain identifiers to block multiple malicious or untrusted IdPs under a common domain.

The Current text incorrectly states:

"RP blocklists SHALL uniquely identify IdPs through fully qualified domain names, cryptographic keys, or other identifiers that are applicable to the federation protocol in use."

The text will be updated in the errata volume.

**Assessment objective**

Determine whether the RP's blocklist identifies IdPs using appropriate identifiers for the federation protocol in use and treats entities sharing an identifier as equivalent for blocking purposes.

**Assessment methods**

- EXAMINE: Examine the RP blocklist entries and verify that each IdP is identified using domain names, cryptographic keys, or other protocol-applicable identifiers.
- TEST: Test with representative matching IdPs and determine that all matching entities are treated as equivalent for blocklist purposes, if the RP uses an identifier that can match multiple IdPs,
