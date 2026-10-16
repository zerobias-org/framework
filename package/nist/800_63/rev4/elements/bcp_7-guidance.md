Assessment is required when: A back-channel presentation is used.

In this model, the assertion reference is passed through the front channel using the subscriber's browser. This process consists of two separate network connections over which information flows, from the subscriber to the IdP and the subscriber to the RP. Both legs of this connection have to be protected from attackers by using authenticated protected channels, such as HTTPS over TLS connections.

**Assessment objective**

Determine whether the delivery of the assertion reference occurs over authenticated protected channels, across all connections.

**Assessment methods**

- EXAMINE: Examine the endpoint configuration to confirm that assertion reference exchange occurs only over authenticated protected channels. (e.g., HTTPS/TLS).
- TEST: Test by attempting to convey the assertion reference from the IdP to the subscriber and from the subscriber to the RP over an unprotected channel (e.g., plain HTTP) and verify that each attempt fails, is rejected, or the connection is refused. A protocol-specific error is not required if the endpoints refuse unprotected connections entirely.
