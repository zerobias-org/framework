Assessment is required when: A federated identifier is not present in the wallet assertion and account resolution is used.

ACCR-1 requires that the requested attributes are sufficient for unique resolution; this control requires that they are no more than necessary. Together they establish the bound: request enough to resolve accurately, but nothing beyond that. This supports the data minimization principles in Sec. 7.

**Assessment objective**

Determine whether the RP requests only the minimum attributes necessary for accurate account resolution when a federated identifier is not present.

**Assessment methods**

- EXAMINE: Examine the set of attributes that the RP requests from the wallet for account resolution. Confirm that each requested attribute is necessary for accurate resolution and that no extraneous attributes are included.
