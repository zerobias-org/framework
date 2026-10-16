Assessment is required when: The IdP is party to a trust agreement with an RP but does not have that RP on an allowlist.

This control goes beyond IDPRD-3 (which requires disclosure of which attributes will be released) by requiring the IdP to show the actual values of those attributes. This enables the subscriber to verify correctness and make an informed decision.

Related Controls:

- IDPRD-3 requires disclosure of which attributes will be released.
- IDPRD-6 requires masking of sensitive information by default.

**Assessment objective**

Determine whether the IdP provides the subscriber with a mechanism to view the actual attribute values and derived attribute values that will be transmitted to the RP.

**Assessment methods**

- EXAMINE: Examine the runtime decision screens to verify that mechanisms exist to display attribute and derived attribute values to the subscriber.
- TEST: Test by initiating a federation transaction as a subscriber that triggers a runtime decision. Verify that the subscriber can view the actual values of the attributes and derived attributes to be released.
