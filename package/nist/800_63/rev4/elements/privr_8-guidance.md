Assessment is required when: The IdP provides attributes through a provisioning API.

Provisioning APIs can pre-populate RP subscriber accounts before subscribers authenticate. The IdP must ensure that only subscribers authorized to use the RP under the trust agreement artifact(s) are included. This prevents the RP from receiving data about subscribers who have no relationship with the RP.

**Assessment objective**

Determine whether the IdP limits the subscriber accounts available via the provisioning API to the population of subscribers authorized to use the RP as specified in the trust agreement artifact(s).

**Assessment methods**

- EXAMINE: Examine the IdP provisioning API configuration and access control documentation to verify that only subscribers authorized to use the RP per the trust agreement artifact(s) are included in the provisioned population.
