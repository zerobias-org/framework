Assessment is required when: The IdP provides a provisioning API.

**Assessment objective**

Determine whether the IdP revokes RP access to the provisioning API when no longer required or when the trust agreement is terminated

**Assessment methods**

- EXAMINE: Examine IdP policies and procedures for provisioning API access lifecycle management to verify that access is terminated when the trust agreement is terminated or when the RP notifies the IdP that access is no longer needed.
- TEST: Test by revoking a test RP's provisioning API access and verifying that the RP can no longer access the API.
