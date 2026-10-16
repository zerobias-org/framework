Assessment is required when: The RP may receive a signal from an IdP indicating that a subscriber account has been terminated or the subscriber's access to the RP has been revoked.

This notification enables the RP to review the associated RP subscriber account's activity for suspicious activity.

**Assessment objective**

Determine whether the IdP notifies the RP and includes the reason when terminating a subscriber account due to suspicious or fraudulent activity, as specified in the trust agreement artifact(s).

**Assessment methods**

- EXAMINE: Examine the trust agreement artifact(s) to determine whether notification of termination due to suspicious or fraudulent activity is required. If required, review IdP procedures for signaling terminations to verify that the procedures include notifying the RP of the reason for termination.
- TEST: Test by simulating a termination due to suspicious activity and verify that the IdP's signal to the RP includes the reason for termination, if the trust agreement artifact(s) require notification of termination due to suspicious or fraudulent activity.
