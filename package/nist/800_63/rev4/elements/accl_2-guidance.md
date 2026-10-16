When a federated identifier is unlinked from an RP subscriber account, it must no longer grant access to that account. While this may seem self-evident, the requirement addresses potential implementation patterns that could inadvertently preserve access, such as soft-deleting or marking the identifier as "inactive" without enforcing access prohibition and caching mechanisms that do not immediately reflect the removal.

The assessment verifies that removal is immediately and completely effective.

**Assessment objective**

Determine whether the RP disallows access to the RP subscriber account from a removed federated identifier.

**Assessment methods**

- EXAMINE: Examine the RP implementation logic to verify that removing a federated identifier immediately revokes access to the account previously associated with that identifier.
- TEST: Test by removing a federated identifier from a test RP subscriber account and attempting to authenticate using the removed federated identifier. Verify that access is denied.
