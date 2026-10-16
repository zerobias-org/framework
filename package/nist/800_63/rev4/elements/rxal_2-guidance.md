IdPs must report the actual IAL, AAL, and FAL in the assertion, regardless of what the RP requested. This allows RPs to make informed access decisions when requirements aren't met. For example, if the subscriber has an active session that was authenticated at AAL1, but the RP has requested AAL2, the IdP needs to prompt the subscriber for AAL2 authentication to increase the security of the session at the IdP during the subscriber's interaction at the IdP, if possible. The IdP sends the resulting AAL as part of the returned assertion, whether it is AAL1 (i.e., the step-up authentication request was not met) or AAL2 (i.e., the step-up authentication request was met successfully).

**Assessment objective**

Determine whether the IdP includes the actual xAL values achieved in every assertion.

**Assessment methods**

- EXAMINE: The presence of xALs in assertions is satisfied by RXAL-3 (IAL), RXAL-4 (AAL), and RXAL-5 (FAL). Examine the IdP's federation processing logic, assertion-generation logic, configuration, and documentation to determine how the IdP handles transactions in which the RP requests xAL values that the IdP cannot satisfy. Determine whether the IdP issues an assertion containing the xAL values actually achieved, or fails the request and does not issue an assertion.
- TEST: Test the IdP using a transaction in which the RP requests xAL values that the IdP cannot satisfy. If the IdP is designed to issue an assertion in that case, determine that the assertion contains the xAL values actually achieved rather than the xAL values requested by the RP. If the IdP is designed to fail the request in that case, determine that the transaction fails and that no assertion is issued.
