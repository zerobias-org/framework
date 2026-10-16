In a federation context, the IdP acts as the verifier for authenticators bound to the subscriber account, as described in [SP800-63B]. Verification of one or more authenticators creates an authentication event that begins the authenticated session at the IdP. This authentication event serves as the basis of the IdP's claim that the subscriber is present.

**Assessment objective**

Determine whether the IdP requires the subscriber to have an authenticated session before approving attribute release, creating/issuing assertions, or establishing subscriber-driven trust agreements.

**Assessment methods**

- TEST: Test by (1) attempting to approve attribute release without an authenticated session. Verify that the IdP rejects the attempt. (2) Attempt to trigger assertion creation without an authenticated session. Verify that the IdP rejects the attempt. (3) If subscriber-driven trust agreements are supported, attempt to establish one without an authenticated session. Verify that the IdP rejects the attempt.
