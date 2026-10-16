Assessment is required when: The IdP provides assertions to one or more federal agencies or the IdP is a federal agency.

**Assessment objective**

Determine whether the IdP protects assertion-signing keys using cryptographic modules validated at FIPS 140 Level 1 or higher.

**Assessment methods**

- EXAMINE: Examine the IdP's federation system documentation and configuration to verify that assertion-signing keys are generated, stored, and used only within a FIPS 140-validated cryptographic module. Confirm that the module appears on the CMVP validation list with a status of Active and is validated at Level 1 or higher.
