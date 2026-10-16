Assessment is required when: An identity API is available to the RP.

The lifetime of the access to the identity API is independent of the lifetime of the assertion.

**Assessment objective**

Determine whether the RP refrains from using successful identity API attribute fetches to extend an existing authenticated session.

**Assessment methods**

- EXAMINE: The prohibition on session establishment via identity API access, is satisfied by IDAP-3. For the session extension prohibition: Examine the RP session-management logic, session renewal/extension code, and timeout handling to verify that successful identity API calls do not trigger session extension or reset the overall or inactivity timeout.
- TEST: Test by establishing an authenticated session at the RP and allowing it to approach an overall or inactivity timeout threshold. Successfully fetch attributes via the identity API. Verify that the session is not extended or refreshed solely as a result of the API call.
