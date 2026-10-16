Assessment is required when: The RP uses the federated identifier to identify the subscriber.

Even if an IdP uses a collision-resistant namespace such as a UUID for its subscriber identifiers, the tying of a specific identifier to a particular subscriber is still under the control of the IdP making the assertion. An RP's internal processing of an assertion needs to take this into account by processing the combination of the subject identifier along with the IdP that issued the assertion. If the RP does not account for the source IdP when determining the identity of the subscriber, a rogue or compromised IdP could impersonate subscribers from another IdP at a susceptible RP by mimicking the valid IdP's subject identifiers.

**Assessment objective**

Determine whether an RP treats the same subject identifier from different IdPs as different accounts.

**Assessment methods**

- EXAMINE: Examine the RP's code, configuration, and documentation to verify that subject identifiers are always interpreted in the context of the IdP that asserted them.
- TEST: Test by configuring two test IdPs to assert the same subject identifier. Submit an assertion from each IdP to the RP. Verify that the RP creates two distinct subscriber accounts and does not associate them.
