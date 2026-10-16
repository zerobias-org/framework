Assessment is required when: A back-channel presentation is used.

Before issuing an assertion to the RP in exchange for the assertion reference, the IdP needs to ensure that the RP making the exchange request is the same RP that the assertion reference was intended for. Otherwise, an attacker could substitute an assertion reference for one RP in order to get an assertion for a different RP, or trick the subscriber into authorizing one RP only to authorize the attacker's RP. The IdP can do this by associating a specific RP with the assertion reference when the reference is created.

**Assessment objective**

Determine whether an assertion reference is bound to a single RP identified by the IdP.

**Assessment methods**

- EXAMINE: Examine IdP documentation to ensure the IdP verifies the RP presenting the assertion reference using client credentials, PKCE, or alternative mechanism providing equivalent protections.
