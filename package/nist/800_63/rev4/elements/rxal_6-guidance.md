Assessment is required when: The xAL is the same for all messages between the IdP and RP (e.g., enterprise scenarios in which all subscribers are identity-proofed at the same IAL and use the same authenticator type).

The IdP MAY indicate that no claim is made to the IAL or AAL for a given federation transaction. In such cases, no default value is assigned to the resulting xAL by the RP. That is, a federation transaction without an IAL declaration in either the trust agreement or the assertion is functionally considered to have "no IAL" and the RP cannot assume the account meets "IAL1," which is the lowest numbered IAL described in this suite.

**Assessment objective**

Determine whether the xAL information is included in the terms of the trust agreement between the IdP and RP when the xAL is unchanging for all messages.

**Assessment methods**

- EXAMINE: Examine the trust agreement artifact(s) the IdP has established with its RPs to verify that values are stated for all static xALs. If PETA-1 item (m) documents fixed xAL values, confirm those values reflect the actual, unchanging xALs for all transactions between the IdP and each RP.
