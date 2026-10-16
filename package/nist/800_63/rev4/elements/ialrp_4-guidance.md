Assessment is required when: The IdP utilizes an allowlist for RPs.

For blocklists, see IDPBRP-2.

**Assessment objective**

Determine whether IdP allowlist entries uniquely identify RPs using appropriate identifiers, and whether entities sharing an identifier are treated as equivalent.

**Assessment methods**

- EXAMINE: Examine the IdP allowlist entries and verify each RP is identified using fully qualified domain names, cryptographic keys, or other protocol-appropriate unique identifiers. Verify that no wildcard domain identifiers are used.
