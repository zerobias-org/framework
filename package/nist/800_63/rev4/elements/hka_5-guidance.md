The security of holder-of-key assertions stems from the separation of the key representing the subscriber and the assertion itself. The RP will need access to some set of keying material to verify the key presented by the subscriber in a holder-of-key assertion. There are different methods of identifying this keying material to the RP, such as including the public key of an asymmetric key pair in the assertion or including an identifier for a key that the RP can securely dereference. However, if the assertion were to include private key material or a symmetric key, then any reader of the assertion would be able to create a proof to present alongside the assertion. Therefore, these types of keys are not allowed to be included in the assertion in holder-of-key presentations.

**Assessment objective**

Determine whether the subscriber keys present in a holder-of-key assertion are of an appropriate type.

**Assessment methods**

- EXAMINE: Examine IdP assertion generation documentation to confirm that assertions do not result in exposure of private keys or symmetric keys. Examine test assertions and logs of assertion tests to validate the operational configuration.
- TEST: Test by generating a holder-of-key assertion and ensure that the assertion does not include an unencrypted private key or symmetric key as the subscriber key.
