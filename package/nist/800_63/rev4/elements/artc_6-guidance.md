The IAL alone tells the RP the level of identity proofing, but not how it was achieved. SP 800-63A-4 defines multiple proofing pathways at each IAL, each with a different risk profile. Without the verification type and proofing pathway, the RP cannot make fine-grained, risk-informed access decisions; it can only make a binary accept/reject decision based on the IAL number. This control ensures the IdP provides that granularity.

**Assessment objective**

Determine whether all required xAL information is conveyed through the assertion contents or trust agreement artifact(s).

**Assessment methods**

- EXAMINE: Examine sample assertions where IAL and AAL are asserted. For IAL, verify that the verification method used during identity proofing (e.g., biometric, home address verification, cell phone verification) is provided. Also verify that the proofing process(es) used to establish the subscriber account are indicated. Where multiple proofing pathways are possible at a given IAL, the information provided must be sufficient for the RP to determine which process was used. The conveyance of the IAL is satisfied by RXAL-3. For AAL, satisfied by RXAL-4. For FAL, satisfied by RXAL-5
