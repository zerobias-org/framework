Wildcards in identifiers create ambiguity about which party is being identified, potentially allowing unintended parties to match the identifier. For example, if an RP is deployed at "www.example.com", "service.example.com", and "gateway.example.com", each identifier must be registered separately. A wildcard of "*.example.com" cannot be used, as it would unintentionally match "user.example.com" and "unknown.example.com" under the same RP identifier.

**Assessment objective**

Determine whether party identifiers avoid the use of wildcards.

**Assessment methods**

- EXAMINE: Examine system configurations, discovery/registration records, and trust agreement artifact(s) for party identifiers. Verify that no identifiers contain wildcards (e.g., "*.csp.com").
- TEST: Test by attempting to register or configure a party identifier containing a wildcard and verify that the system rejects it, if identifier establishment is performed through an automated interface.
