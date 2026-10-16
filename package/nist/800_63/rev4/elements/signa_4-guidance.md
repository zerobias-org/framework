Assertions must be signed using one of two mechanisms: a digital signature using asymmetric keys, or a MAC using a symmetric key shared between the IdP and RP. Both mechanisms must use approved cryptography as defined in SP 800-63C-4. For digital signatures, the relevant standard is FIPS 186-5 (Digital Signature Standard). For MACs, relevant standards include FIPS 198-1 (HMAC) and SP 800-38B (CMAC). Assessors should verify the algorithm and key size against SP 800-131A.

**Assessment objective**

Determine whether the signature method used to protect the assertion and the keys used to create and verify it falls under one of these defined categories.

**Assessment methods**

- EXAMINE: Examine the IdP's assertion signing configuration and documentation to verify that (1) the assertion signature uses either a digital signature with asymmetric keys or a MAC with a symmetric key shared between the RP and IdP, and (2) that the algorithm and key size conform to NIST-approved cryptography requirements as defined in SP 800-63C-4.
- TEST: Test by generating an assertion and verifying that the signature method is one of the two permitted mechanisms and uses approved cryptography.
