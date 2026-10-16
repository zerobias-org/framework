**Assessment objective**

Prevent attackers from reusing stolen or observed authentication data to hijack accounts.

**Assessment methods**

- EXAMINE: Examine the combinations of authenticators that can be used at AAL2 and verify that for each combination, at least one authenticator is replay-resistant.  OTP authenticators, cryptographic authenticators, and look-up secrets are considered replay resistant.
- TEST: Test if verifying a physical authenticator that does not implement a cryptographic challenge/response protocol, attempt to authenticate more than once using the same authenticator output (during its validity period, if time-based). If a subsequent authentication succeeds, the test of replay resistance has failed.
