Assessment is required when: Proxied federation is used.

When a proxy acts as an intermediary between an upstream IdP and downstream RP, it creates new assertions based on upstream assertions. The federated identifier in the proxy's assertion must show the proxy as the issuer, not the original upstream IdP. This ensures proper attribution and prevents confusion about the assertion's source.

**Assessment objective**

Determine whether the federated identifier of an assertion from a proxy indicates the proxy as the issuer of the assertion.

**Assessment methods**

- EXAMINE: Examine the proxy's assertion templates, identifier-generation logic, or documentation to confirm that assertions issued by the proxy use an identifier that unambiguously represents the proxy itself as the issuer. Verify that no upstream IdP identifiers appear as the federated identifier in proxy-issued assertions.
- TEST: Test by first receiving an assertion from the upstream IdP at the proxy and verifying the upstream IdP is the issuer in the assertion, then by generating an assertion from the proxy to the downstream RP and verifying that the proxy is the issuer in the assertion.
