The IdP, CSP, and RP need access to cryptographic keying materials to validate signatures and encrypt content. The association of these keys with specific parties is vital to the security of the protocol. In order to prevent an attacker impersonating an IdP/CSP or RP, all keys have to be transferred using secure methods. Methods include the publication of asymmetric public keys over HTTPS (and therefore TLS) at a well-known and trusted URL associated with the IdP/CSP or RP, or the use of TLS to transfer keying material in the registration process. Alternatively, keys could be transferred and configured manually by administrators to ensure a strong mapping between the intended party and the value of the key itself.

**Assessment objective**

Determine whether all cryptographic key information is exchanged over an authenticated protected channel.

**Assessment methods**

- EXAMINE: Examine documentation describing the key exchange processes for all federation relationships. For each relationship, verify that the documented process specifies the use of an authenticated protected channel for all transfers of cryptographic key information, including shared secrets and public keys.
- TEST: Test by selecting a sample of key exchange operations across the federation deployment. For each, verify that the authenticated protected channel is properly implemented (e.g., TLS with server-side certificate validation). Specific key exchange scenarios are satisfied by their respective controls: DR-2 for RP retrieval of IdP keys over a network, DR-3: RP for registration with an IdP, DYR-1 for dynamic registration, and DISCR-1 for RP discovery of CSP wallet keys. If any key exchange in the deployment is not covered by a downstream control (e.g., key exchange between a separated CSP and IdP), document and assess it here.
