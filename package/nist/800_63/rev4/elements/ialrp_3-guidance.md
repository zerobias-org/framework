Assessment is required when: The IdP utilizes an allowlist for RPs.

When an RP is allowlisted by an IdP, some subset of the subscriber's information is made available to the RP during the login process without the subscriber being prompted at runtime for additional consent or confirmation. The IdP needs to make the list of allowlisted RPs available to subscribers to allow subscribers to view which sites their information will be sent to during a federation transaction without the subscriber being specifically prompted.

**Assessment objective**

Determine whether the list of allowlisted RPs is available to subscribers.

**Assessment methods**

- EXAMINE: Examine the IdP's allowlist configuration to identify the full set of allowlisted RPs applicable to a test subscriber.
- TEST: Test by requesting the allowlist from the IdP, as the same test subscriber above. Compare the returned list against the allowlist identified in the examine step and verify it is complete.
