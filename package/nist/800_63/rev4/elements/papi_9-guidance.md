Assessment is required when: The IdP provides a provisioning API.

PRIVR-9 addresses the specific requirement to deprovision terminated accounts via the provisioning API.

**Assessment objective**

Determine whether the IdP signals the RP through the provisioning API when the state of a subscriber account changes.

**Assessment methods**

- EXAMINE: Examine the IdP's provisioning API documentation and procedures to verify that account state changes (termination, disabling, etc.) trigger signals to the RP.
- TEST: Test by changing the state of a subscriber account (e.g., disable the account) and verifying that the IdP sends a signal to the RP indicating the state change.
