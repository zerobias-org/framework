IdP-initiated federation processes are prohibited at FAL2 and FAL3 to prevent the RP from accepting unsolicited assertions and assertion references from the IdP. Inclusion and validation of RP-provided nonces in assertions is an indication of an RP-initiated transaction. However, this prohibition does not include processes in which an external party (e.g., the IdP or a federation authority) signals the RP to start a federation process with the IdP, allowing the RP to begin the federation transaction and securely await a response within that transaction.

**Assessment objective**

Verify that, at FAL2 and above, all federation transactions are initiated by the RP rather than the IdP.

**Assessment methods**

- EXAMINE: Examine the RP's federation implementation and protocol configuration to confirm that all authentication requests originate from the RP. Verify that unsolicited IdP-initiated assertions are not accepted at FAL2 or above.
- TEST: Test the RP flow by delivering an assertion directly to the RP's federation endpoint without initiating the transaction at the RP. Confirm the RP rejects it.
