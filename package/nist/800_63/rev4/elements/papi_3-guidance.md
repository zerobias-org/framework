Assessment is required when: The IdP provides a provisioning API.

A mutually authenticated protected channel requires both parties (IdP and RP) to authenticate to each other, unlike a standard authenticated protected channel where only the server is authenticated.

**Assessment objective**

Determine whether access to the provisioning API occurs over a mutually authenticated protected channel.

**Assessment methods**

- EXAMINE: Examine the provisioning API configuration and documentation to verify that mutual authentication is required for all connections.
- TEST: Test by attempting to access the provisioning API without presenting RP credentials and verify that access is denied.
