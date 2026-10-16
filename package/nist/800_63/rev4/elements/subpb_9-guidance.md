This requirement applies to the alternative binding ceremony workflow for adding authenticators to accounts that already have bound authenticators. Unlike the initial binding ceremony (SUBPB-1 through SUBPB-8), which uses federation at FAL3 with a trust-on-first-use approach, this workflow requires proof of possession of an existing bound authenticator before new authenticators can be bound.

See SUBPB-10 for the subsequent step of authenticating with and associating the new authenticator.

**Assessment objective**

Determine whether the RP requires authentication with an existing bound authenticator during the initial step of the binding ceremony when adding additional bound authenticators to an account that already has one or more.

**Assessment methods**

- EXAMINE: Examine the RP's binding ceremony implementation to confirm that when a subscriber account has one or more existing bound authenticators, the workflow for adding additional authenticators requires initial authentication with an existing bound authenticator at FAL3.
- TEST: Test by identifying a test subscriber account with at least one existing bound authenticator. Using that account, initiate a binding ceremony for an additional authenticator.  Verify the RP requests authentication with an existing bound authenticator as the initial step. Next, attempt to proceed with the binding ceremony without authenticating with an existing bound authenticator; verify the RP rejects the attempt.
