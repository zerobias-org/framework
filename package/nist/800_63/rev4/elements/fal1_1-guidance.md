SP 800-63-4 defines approved cryptography as any algorithm, hash function, random bit generator, or similar technique that is FIPS-approved or NIST-recommended.

For assertion signatures, the relevant standards are FIPS 186-5 (Digital Signature Standard, covering RSA, ECDSA, and EdDSA) and SP 800-131A (algorithm and key length transition schedules). Assessors should verify the IdP's signing algorithm and key size against these references.

**Assessment objective**

Determine whether approved cryptography is used for the assertion signature.

**Assessment methods**

- EXAMINE: Examine the IdP's assertion signing configuration to confirm that all assertions are cryptographically signed using approved algorithms and key sizes.
- TEST: Test by generating an assertion from the IdP and verifying the presence of a cryptographic signature using approved cryptography. See SIGNA-4 for assessment of the specific signature mechanism and key type.
