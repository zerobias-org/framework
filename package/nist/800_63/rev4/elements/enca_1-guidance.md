SP 800-63C-4 defines approved cryptography as an encryption algorithm, hash function, random bit generator, or similar technique that is FIPS-approved or NIST-recommended. Approved algorithms and techniques are either specified or adopted in a FIPS or NIST recommendation. Assessors must verify that the IdP's assertion encryption algorithm and key size conform to these requirements.

**Assessment objective**

Determine whether the IdP uses approved cryptography and the RP's encryption key when encrypting assertions.

**Assessment methods**

- EXAMINE: Examine the IdP's assertion encryption configuration and documentation  to verify that assertions are encrypted using the RP's encryption key, and that the encryption algorithm and key size conform to NIST-approved cryptography requirements as defined in SP 800-63C-4.
- TEST: Test by generating an encrypted assertion and determining that it is encrypted for the intended RP using the configured encryption mechanism.
