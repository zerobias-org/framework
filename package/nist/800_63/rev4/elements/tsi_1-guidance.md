Typical system functions include the following:

- Identity proofing, authentication, or attribute assertions (collectively "identity service");
- A specific subscriber request to transmit the information;
- Fraud mitigation related to the identity service; or - Responding to a security incident related to the identity service.

RP compliance with data exchange minimization is assessed under PRIVR-10.

**Assessment objective**

Determine whether the IdP limits transmission of subscriber information to only what is (1) necessary for permissible system functions and (2) stipulated and disclosed in the trust agreement artifact(s).

**Assessment methods**

- EXAMINE: Examine the trust agreement artifact(s) documenting transmissible attributes and their purposes. For each attribute authorized for transmission, verify that it maps to a necessary system function (such as identity service, specific subscriber request, fraud mitigation, or security incident response) and has a documented functional justification. Review IdP attribute release configuration and compare against trust agreement artifact(s) to verify no unauthorized attributes are transmitted.
- TEST: Test by generating an assertion for a test RP. Verify that no attributes appear in the assertion beyond those authorized by the trust agreement artifact(s). If the federation protocol permits runtime attribute requests, configure the test RP to request attributes outside the trust agreement artifact(s) and verify the IdP rejects or ignores the unauthorized request.
