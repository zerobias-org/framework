Assessment is required when: A back-channel presentation is used.

In this model, the assertion reference is traded for the assertion by the RP making a direct call to the IdP. This call, which carries both the assertion reference and the assertion itself, needs to be protected from attackers by using an authenticated protected channel, such as HTTPS over TLS connections.

**Assessment objective**

Determine whether the connection between the RP and IdP takes place over an authenticated protected channel.

**Assessment methods**

- EXAMINE: Examine the relevant federation configuration to verify that assertion references are conveyed between the RP and IdP only over authenticated protected channels.
- TEST: Test by attempting to convey the assertion reference between the RP and IdP over an unprotected channel (e.g., plain HTTP) and verify that the attempt fails, is rejected, or the connection is refused.
