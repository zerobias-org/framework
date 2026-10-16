Assessment is required when: The subscriber is identified using a federated identifier.

The subject identifier is separated from the unconditional assertion requirements in ARTC-3 because subscriber-controlled wallets acting as IdPs may not include a subject identifier in their assertions. For example, mobile driver's licenses may identify the subscriber through the driver's license number and issuer rather than a subject identifier. This control ensures a subject identifier is present when federated identifiers are the identification method.

**Assessment objective**

Determine whether the assertion includes a subject identifier when the subscriber is identified using a federated identifier.

**Assessment methods**

- EXAMINE: Examine the IdP's assertion generation configuration to verify that a subject identifier is included in assertions when federated identifiers are the subscriber identification method.
