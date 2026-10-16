Assessment is required when: The subscriber is identified in the assertion using a federated identifier.

See ARTC-11 for the equivalent requirement for non-wallet federation.

**Assessment objective**

Determine whether the RP scopes the subject identifier to the namespace of the CSP that issued the signed attribute bundle.

**Assessment methods**

- EXAMINE: Examine the RP's assertion processing logic to confirm that subject identifiers extracted from CSP-signed attribute bundles are paired with the CSP's issuer identifier when resolving to an RP subscriber account.
- TEST: Test by presenting assertions from two different CSPs containing attribute bundles with the same subject identifier value. Confirm the RP treats them as different subscribers.
