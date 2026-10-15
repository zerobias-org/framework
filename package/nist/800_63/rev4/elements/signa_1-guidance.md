The IdP uses a signature to protect the contents of the assertion from modification by an attacker, and to prevent an attacker from creating a fraudulent assertion. Every assertion issued by the IdP needs to be signed and the signature attached to the assertion for transit and processing by the RP.

**Assessment objective**

Determine whether assertions are signed by the IdP using appropriate cryptography.

**Assessment methods**

- EXAMINE: Examine the IdP's assertion configuration and documentation to determine that assertions are cryptographically signed by the IdP.
- TEST: Test by having the IdP issue an assertion. Examine the assertion to determine whether it includes a digital signature or MAC that uses NIST-approved cryptography.
