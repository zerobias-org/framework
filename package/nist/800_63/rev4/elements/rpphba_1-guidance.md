Assessment is required when: Authentication is required at both the IdP and the RP.

Note:

This control was intended to apply to both HoK and bound authenticator assertions.

When the errata corrections are issued, this control will be updated to read:

"The subscriber SHALL prove possession of the authenticator to the RP, in addition to presenting the assertion itself."

**Assessment objective**

Determine whether the RP prompts the subscriber to prove possession of the expected authenticator and validates the authenticator output.

**Assessment methods**

- TEST: Test by doing the following: (1) Initiate an FAL3 federation transaction. Verify the RP prompts the subscriber to prove possession of the authenticator in addition to presenting the assertion. (2) Authenticate with the correct authenticator. Verify FAL3 access is granted. (3) Authenticate with an incorrect authenticator. Verify rejection. (4) Present the assertion without any authenticator. Verify rejection.
