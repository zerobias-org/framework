Assessment is required when: The IdP utilizes a blocklist for RPs.

**Assessment objective**

Determine whether the IdP refuses to issue assertions to blocklisted RPs.

**Assessment methods**

- TEST: Test by adding a test RP to the IdP's blocklist, then submitting a federation request as the blocklisted RP.  Verify the IdP refuses to produce an assertion.
