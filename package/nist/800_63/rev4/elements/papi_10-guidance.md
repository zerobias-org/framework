Assessment is required when: The IdP provides a provisioning API.

In the errata publication, this control will be changed to:

When receiving a signal indicating that the account has been terminated or disabled, the RP SHALL remove the federated identifier from the RP subscriber account.

Related Controls:

- PAPI-9 requires the IdP to signal account state changes.
- ACCL-2 prohibits access once a federated identifier is removed.

**Assessment objective**

Determine whether the RP removes the federated identifier from the RP subscriber account upon receiving a signal that the subscriber account has been terminated or disabled.

**Assessment methods**

- EXAMINE: Examine the RP's design, configuration, and signal-processing logic for handling IdP signals indicating that a subscriber account has been terminated or disabled. Verify that receipt of such a signal causes the RP to remove the corresponding federated identifier from the affected RP subscriber account.
- TEST: Test by sending a signal indicating that a test subscriber account has been terminated or disabled. Verify that the RP removes the federated identifier associated with that IdP from the RP subscriber account.
