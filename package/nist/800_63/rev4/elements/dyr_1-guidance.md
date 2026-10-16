Assessment is required when: Dynamic registration is used.

At FAL1 and FAL2, the cryptographic keys and identifiers of the RP can be exchanged in a dynamic process, whereby the RP software presents its configuration to the IdP either directly or through a trusted third party and receives the identifier to use with that IdP. This process is specific to the federation protocol in use but requires machine-readable configuration data to be made available over the network.

**Assessment objective**

Determine whether configuration information transmitted during dynamic registration uses an authenticated protected channel to endpoints associated with the IdP per the trust agreement artifact(s).

**Assessment methods**

- EXAMINE: Examine the relevant trust agreement artifact(s) to identify the endpoint(s) associated with the IdP's identifier for dynamic registration.  Verify the RP is configured to use the specified endpoint(s).
- TEST: Test by initiating a dynamic registration from the RP and verify that configuration information is transmitted only to the endpoint(s) specified in the trust agreement artifact(s). The requirement that an authenticated protected channel be used is satisfied by ICKM-2.
