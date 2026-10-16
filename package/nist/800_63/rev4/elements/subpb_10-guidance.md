**Assessment objective**

Determine whether the RP, after the subscriber authenticates with an existing bound authenticator (SUBPB-9), requests authentication with the new bound authenticator and stores its identifier in the RP subscriber account.

**Assessment methods**

- TEST: Test by identifying a test subscriber account with at least one existing bound authenticator. Using that account, complete a binding ceremony to add an additional authenticator. Verify that the RP then prompts the subscriber to authenticate with that new authenticator. Authenticate with the new authenticator. Then, inspect the RP subscriber account record to confirm that a unique identifier for the new authenticator (such as its public key) was stored and associated with the account as a bound authenticator. Confirm that the account now contains at least two unique bound authenticator identifiers. Verify that the new authenticator can be used for subsequent FAL3 transactions.
