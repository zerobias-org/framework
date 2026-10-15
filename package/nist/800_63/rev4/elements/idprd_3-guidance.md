Assessment is required when: The IdP is party to a trust agreement with an RP but does not have that RP on an allowlist.

This control ensures informed decisions are made by requiring the IdP to show which attributes will be transmitted before the authorized party approves the transaction. Related Controls:

- IDPRD-2 requires explicit notice and positive confirmation before attribute transmission.
- IDPRD-5 requires the IdP to provide mechanisms for viewing attribute values.
- IDPRD-4 addresses selective disclosure of optional attributes.

**Assessment objective**

Determine whether the IdP discloses to the authorized party the specific attributes that will be released to the RP before the transaction is approved.

**Assessment methods**

- EXAMINE: Examine the IdP's runtime decision screens and related configurations to verify that a runtime decision prompt displays the list of attributes to be released prior to authorization.
- TEST: Test by initiating a federation transaction that triggers a runtime decision and verifying that the IdP presents the list of attributes to be released before the authorized party approves the transaction.
