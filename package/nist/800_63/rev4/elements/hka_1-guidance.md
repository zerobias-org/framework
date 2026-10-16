The public key allows the RP to verify that the subscriber controls the corresponding private key, binding the assertion to the subscriber.

**Assessment objective**

Determine whether HoK assertions include the public key (or key identifier) of the authenticator controlled by the subscriber.

**Assessment methods**

- EXAMINE: Examine the IdP HoK documentation to confirm that HoK assertions contain the necessary authenticator identifier.
- TEST: Test by generating a HoK assertion and verifying it contains a unique identifier for the subscriber's authenticator (e.g., a public key or key identifier).
