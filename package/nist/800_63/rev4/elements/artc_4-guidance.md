Assessment is required when: The RP subscriber account does not use an ephemeral provisioning process.

**Assessment objective**

Determine whether the subscriber is identified in the assertion using a federated identifier or through attributes sufficient for account resolution, when the RP subscriber account does not use ephemeral provisioning.

**Assessment methods**

- EXAMINE: Examine sample assertions to determine which subscriber identification information they include for IdPs. If a federated identifier is used, satisfied by ARTC-5 (subject identifier) and FEDID-1. If account resolution is used, examine the trust agreement artifact(s) for the agreed-upon attributes used for resolution, then examine a sample of assertions to confirm that those attributes are present. For RPs, if a federated identifier is used, satisfied by FEDID-2. If account resolution is used, satisfied by ACCR-1.
