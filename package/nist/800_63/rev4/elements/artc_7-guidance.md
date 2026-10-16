The nonce is a mechanism by which FAL2 achieves its defining security property: assertion injection protection (see FAL2-1). It cryptographically binds the RP's specific federation request to the resulting assertion, preventing an attacker from injecting a captured or manufactured assertion into a different transaction. The requirement operates as a three-part chain: the RP sends a nonce in its request (ARTRQ-1, Sec. 4.10 A), the IdP echoes it in the assertion (this control), and the RP validates its presence (ARTC-10 item 5).

In the errata publication, this control will be changed to:

At FAL2 and above, the assertion SHALL include the cryptographic nonce from the RP's federation request.

**Assessment objective**

Determine whether FAL2 and FAL3 assertions include a cryptographic nonce from the RP's federation request.

**Assessment methods**

- EXAMINE: Examine the sample assertions to verify that each contains a cryptographic nonce. Verify that the nonce in the assertion corresponds to the nonce provided in the RP's federation request (see ARTRQ-1).
