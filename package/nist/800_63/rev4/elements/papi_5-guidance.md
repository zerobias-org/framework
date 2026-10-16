Assessment is required when: The IdP provides a provisioning API.

**Assessment objective**

Determine whether the IdP restricts provisioning API access to RPs with established trust agreements.

**Assessment methods**

- EXAMINE: Examine IdP provisioning API access control configuration to verify that each RP with API access has a corresponding established trust agreement with the IdP that allows provisioning API access (see PAPI-2).
- TEST: Test by attempting to access the provisioning API as an RP without an established trust agreement with the IdP. Verify that access is denied.
