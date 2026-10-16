Assessment is required when: An Identity API is offered by the IdP.

Identity API access is separate from assertion validity and from the lifetime of any authenticated session. Therefore, the ability to call an identity API must not be treated as evidence of a successful federation transaction or used to create an authenticated session.

See also RASR-2, which prohibits using identity API access to extend an existing session.

**Assessment objective**

Determine whether the RP requires a valid assertion to establish an authenticated session for the subscriber, and does not establish sessions based solely on identity API access.

**Assessment methods**

- EXAMINE: Examine the RP's session establishment documentation to verify that a valid assertion is required to establish an authenticated session, and that identity API access alone is insufficient.
- TEST: Test by attempting to establish an RP session using only identity API access (without a valid assertion). Verify that the RP rejects session establishment.
