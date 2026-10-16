**Assessment objective**

Determine that appropriate expiration of sessions occurs to mitigate theft of session secrets or use of a forgotten session.

**Assessment methods**

- TEST: Test to authenticate, then idle for documented inactivity timeout and determine that reauthentication is required. Maintain a session for at least the overall timeout period and observe that reauthentication is required.
- EXAMINE: Examine verifier or CSP documentation to determine that required reauthentication requirements are enforced.
