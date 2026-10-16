The assertion validity window exists solely for the RP to process the assertion and create a local session; it is not a session duration directive from the IdP. Section 4.7 establishes that assertion validity, IdP session lifetime, and RP session lifetime are three independent time periods. An RP that terminates sessions when the assertion expires would force unnecessary reauthentication and effectively let the IdP dictate RP session policy. RP session management requirements are governed by SP 800-63B Section 5 (Session Management).

**Assessment objective**

Determine whether the RP manages its session lifetime independently of the assertion validity time window.

**Assessment methods**

- EXAMINE: Examine the RP's session management configuration to confirm the session timeout is set by RP policy, and is not the same as the assertion's expiration timestamp.
- TEST: Test by authenticating via federation and establishing an RP session. Confirm that the RP session remains valid after the assertion's validity window has expired.
