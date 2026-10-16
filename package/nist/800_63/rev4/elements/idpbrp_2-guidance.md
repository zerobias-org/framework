Assessment is required when: The IdP utilizes a blocklist for RPs.

The Current text incorrectly states:

IdP blocklists SHALL uniquely identify RPs through the means of fully qualified domain names, cryptographic keys, or other identifiers that are applicable to the federation protocol in use.

The text will be updated in the errata volume.

**Assessment objective**

Determine whether IdP blocklist entries identify RPs using appropriate identifiers, and whether entities sharing an identifier are treated as equivalent.

**Assessment methods**

- EXAMINE: Examine the IdP blocklist entries and verify that each RP is identified using domain names, cryptographic keys, or other protocol-applicable identifiers.
- TEST: Test by adding a wildcard entry (e.g., "*.example.com") to the IdP's blocklist, then submitting federation requests from multiple subdomains matching the wildcard (e.g., "www.example.com", "service.example.com"). Verify all matching requests are blocked.
