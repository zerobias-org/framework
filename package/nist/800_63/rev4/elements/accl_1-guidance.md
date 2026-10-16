Assessment is required when: The RP allows a subscriber to link multiple subscriber accounts.

Account linking allows a subscriber to associate multiple federated identifiers with a single RP subscriber account. This is a security-sensitive operation - without an authenticated session, an attacker could link their own federated identifier to a victim's account and gain unauthorized access.

Requiring an authenticated session ensures that only the legitimate account holder can add new federated identifiers.

**Assessment objective**

Determine whether the RP requires an authenticated session for account linking functions.

**Assessment methods**

- EXAMINE: Examine RP policies and system configurations to verify that account linking functions require an authenticated session.
- TEST: Test by attempting to link a new federated identifier to an RP subscriber account and verify that an authenticated session is required before the linking function is permitted.
