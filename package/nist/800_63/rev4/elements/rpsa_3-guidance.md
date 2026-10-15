Changes to federated identifiers associated with an RP subscriber account are security-relevant events. Adding a federated identifier grants a new means of access; removing one revokes access from that identity. Notifying the subscriber allows them to detect unauthorized account linking or removal.

**Assessment objective**

Determine whether the RP provides notice to the subscriber when a federated identifier is added to or removed from an RP subscriber account.

**Assessment methods**

- EXAMINE: Examine RP notification mechanisms and configurations to verify that notices are sent when federated identifiers are added or removed.
- TEST: Test by adding a new federated identifier to a test RP subscriber account and verifying that the subscriber receives a notification. Next, remove a federated identifier from a test RP subscriber account without terminating the account, and verify that the subscriber is notified.
