This control addresses the security response when a bound authenticator is removed, whether initiated by the subscriber (e.g., lost or compromised authenticator) or by the RP (e.g., authenticator no longer meets requirements). Terminating all FAL3 sessions and requiring reauthentication ensures that any sessions potentially established using the removed authenticator are invalidated.

See SUBPB-12 for the related requirement that the RP not prompt for the removed authenticator during this process.

**Assessment objective**

Determine whether the RP terminates all active FAL3 sessions for the subscriber and requires IdP reauthentication at FAL3 when a bound authenticator is removed from the RP subscriber account.

**Assessment methods**

- TEST: Test using a test subscriber account with at least one bound authenticator and an active FAL3 session by doing the following: (1) Establish one or more additional active FAL3 sessions for the test subscriber (e.g., multiple browser sessions or devices). (2) Remove a bound authenticator from the RP subscriber account. (3) Verify that all active FAL3 sessions for the subscriber are immediately terminated. (4) Attempt to access the RP at FAL3. Verify that the RP requires a new assertion from the IdP at FAL3 before granting access.
