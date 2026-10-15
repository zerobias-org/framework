The cryptographic nonce binds the assertion to the specific request, preventing replay and injection attacks. The RP's request should also contain the set of requested attributes and their purpose, and the authentication event requirements.

**Assessment objective**

Determine if the RP includes the required identifier and cryptographic nonce in requests for an assertion.

**Assessment methods**

- EXAMINE: Examine the RP's federation configuration to confirm that it sends its identifier and a cryptographic nonce in all assertion requests.
- TEST: Test by initiating a request for an assertion.  Examine the request and verify that the request contains a unique identifier for the RP and a cryptographic nonce.
