Assessment is required when: Federated identifiers are used.

Different IdPs manage their subject identifiers independently and may assign identical values to different subscribers. The RP must never process a subject identifier without accounting for the issuer. Failure to do so creates a collision risk where subscribers from different IdPs are incorrectly mapped to the same RP subscriber account.

**Assessment objective**

Determine whether the RP associates each federated identifier with a single subscriber.

**Assessment methods**

- EXAMINE: For IdP transactions: Satisfied by ARTC-11. For subscriber-controlled wallet transactions: Satisfied by ARTCN-11.
