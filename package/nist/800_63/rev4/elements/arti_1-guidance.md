Unique identification supports replay protection, logging, auditing, and correlation of federation events. Common techniques include the use of an embedded nonce, an issuance timestamp, an assertion identifier, or a combination of these techniques.

**Assessment objective**

Determine whether assertions are sufficiently unique to permit unique identification by the target RP.

**Assessment methods**

- EXAMINE: Examine IdP's assertion structure(s) and documentation to verify inclusion of elements that enable unique identification (e.g., assertion identifier, embedded nonce, issuance timestamp).
- TEST: Test by generating multiple assertions and verifying that each can be uniquely identified by an RP.
