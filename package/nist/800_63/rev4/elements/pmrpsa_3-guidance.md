Assessment is required when: Pre-Provisioning is used.

This requirement ensures that pre-provisioned RP subscriber accounts are not created without a defined path for subscribers to access them. The default mechanism is binding a federated identifier at provisioning time. If the trust agreement defines an alternative, such as account linking, account resolution, or direct authentication, that alternative must be documented and implemented.

**Assessment objective**

Determine whether pre-provisioned RP subscriber accounts have a defined means of subscriber access, either through a federated identifier bound at the time of provisioning or through an alternative means of access defined in the trust agreement artifact(s).

**Assessment methods**

- EXAMINE: Examine the provisioning model documentation assessed under PMRPSA-7, and identify the means by which subscribers access pre-provisioned RP subscriber accounts. If a federated identifier is bound at provisioning time, verify that provisioning records include a federated identifier for each pre-provisioned account. If an alternative means of access is used, verify that the trust agreement artifact(s) define the alternative access method (e.g., account linking per Sec. 3.8.1, account resolution per Sec. 3.8.2, or alternative authentication per Sec. 3.8.3) and that the method is implemented.
