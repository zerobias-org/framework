Assessment is required when: Authentication is required at both the IdP and the RP.

Note:

This control was intended to apply to both HoK and bound authenticator assertions.

When the errata corrections are issued, this control will be updated to read:

"Failure to verify the authenticator SHALL result in an error at the RP and SHALL NOT create an authenticated session at the RP."

**Assessment objective**

Determine whether the RP rejects the transaction and prevents session creation when the subscriber fails to successfully authenticate at the RP.

**Assessment methods**

- TEST: Test, using a test subscriber account with a bound authenticator, by initiating an FAL3 federation transaction with a valid bound authenticator assertion. When prompted for the bound authenticator, fail authentication (e.g., cancel the prompt, provide an incorrect activation factor, or allow the request to timeout). Verify that the RP returns an error and does not create an authenticated session.
