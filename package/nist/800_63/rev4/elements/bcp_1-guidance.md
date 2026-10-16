Assessment is required when: A back-channel presentation is used.

Assertion references are used to limit the information that is exposed to different parties within the federation transaction, such as the user's browser. As a consequence, it is counterproductive to put any information about the subscriber in the assertion reference itself. Additionally, since the RP will trade the assertion reference for the actual assertion, the assertion reference needs to be something that an attacker can neither guess nor manipulate in order to alter the assertion received. It is recommended that assertion references be cryptographically random values.

**Assessment objective**

Determine whether the IdP generates and manages assertion references such that they are resistant to tampering and fabrication by an attacker.

**Assessment methods**

- EXAMINE: Examine the IdP's assertion reference design and generation process to verify that the assertion reference contains no subscriber information. Verify the reference is generated and managed in a way that resists tampering and fabrication by an attacker (e.g., cryptographic randomness with sufficient entropy, or cryptographic integrity protection).
- TEST: Test by obtaining a valid assertion reference, modifying it, and presenting the modified value to the IdP. Verify rejection. Present a fabricated reference not issued by the IdP. Verify rejection.
