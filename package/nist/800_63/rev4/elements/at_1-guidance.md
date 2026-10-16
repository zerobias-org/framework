Applies to sessions established through federation. Note: last sentence of 5.1.2, "authentication session" -> "authenticated session"

**Assessment objective**

Ensure that session secrets rather than access/refresh tokens define validity of a session.

**Assessment methods**

- TEST: Test by logging out of a federated session while a valid access token exists and verify that the session has been terminated.
