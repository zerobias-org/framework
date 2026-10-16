Assessment is required when: Shared signaling is used.

Related: SSIG-8 (4.8 H) requires the IdP to signal additional RPs if suspicious activity is confirmed.

**Assessment objective**

Determine whether the IdP reviews subscriber account activity upon receiving a compromise signal.

**Assessment methods**

- EXAMINE: Examine the IdP incident response procedures for documented processes triggered by receipt of a subscriber account compromise signal, including the scope of activity review (e.g., authentication events, attribute changes, federation transactions).
- TEST: Test by simulating a compromise signal for a test subscriber account and verifying that the IdP initiates a review of that account's activity.
