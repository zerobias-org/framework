Assessment is required when: The RP is in a trust agreement with an IdP, but does not include that IdP in an allowlist, and the RP employs a mechanism to remember the authorized party's decision.

**Assessment objective**

Determine whether a previous runtime decision can be revoked by the authorized party.

**Assessment methods**

- EXAMINE: Examine the RP interface to verify a mechanism exists for the authorized party to view and revoke remembered IdP selection decisions.
- TEST: Test by selecting a non-allowlisted IdP at runtime and having the RP remember the decision. Then, initiate a new transaction and verify that no IdP selection prompt appears. Next, revoke the remembered decision using the RP's revocation mechanism. Initiate another transaction and verify that the IdP selection prompt reappears.
