Assessment is required when: The IdP is party to a trust agreement with an RP but does not have that RP on an allowlist.

The IdP is a trusted holder of information for the subscriber. When the subscriber interacts with the IdP, the IdP may need to display sensitive information to the subscriber to allow the subscriber to confirm and authorize its release to the RP. When doing so, the IdP must present that information so that the full value of the sensitive information is not displayed on the screen by default.

**Assessment objective**

Determine whether sensitive information is masked upon display by default.

**Assessment methods**

- TEST: Test by initiating a federation transaction that triggers a runtime decision. Verify that all sensitive information displayed to the subscriber is masked by default.
