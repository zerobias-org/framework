Assessment is required when: The RP maintains an IdP allowlist.

Wildcard identifiers (e.g., "*.example.com") are prohibited because they could match unintended IdPs, undermining the security of the allowlist.

**Assessment objective**

Determine whether the RP's allowlist uniquely identifies IdPs using appropriate identifiers for the federation protocol in use.

**Assessment methods**

- EXAMINE: Examine the RP's allowlist configuration to verify that each IdP entry uses a unique identifier such as a fully qualified domain name, cryptographic key, or other protocol-appropriate identifier, and that no entries use wildcard domain identifiers.
