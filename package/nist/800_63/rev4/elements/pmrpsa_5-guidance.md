Assessment is required when: Ephemeral Provisioning is used, and a federation identifier is supplied in the assertion.

When processing an assertion, the RP establishes a link between that assertion and a new or existing RP subscriber account but removes that link when the authenticated session ends. This process is similar to just-in-time provisioning, but the RP keeps no long-term record of the subscriber when the session is complete, in accordance with Sec. 3.11.3. This form of provisioning is useful for RPs that fully externalize access rights to the IdP, allowing the RP to be more simplified with less internal state. If this form of provisioning is used, the federated identifier is not required in the assertion.

**Assessment objective**

Determine whether the RP removes any linkage between the federated identifier and the RP subscriber account when using ephemeral provisioning.

**Assessment methods**

- EXAMINE: Examine RP system documentation and data retention policies to verify that federated identifiers are not persistently linked to ephemerally provisioned RP subscriber accounts.
- TEST: Test by conducting an ephemeral provisioning transaction and verifying that the federated identifier is not retained or linked to the RP subscriber account after the session ends.
