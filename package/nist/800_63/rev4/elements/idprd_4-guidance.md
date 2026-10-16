Assessment is required when: The IdP is party to a trust agreement with an RP but does not have that RP on an allowlist, and the federation protocol supports optional attributes in the request

Some federation protocols allow for attributes to be requested for optional release. In such cases, the IdP must provide the authorized party with the opportunity to decide, during the process, whether to transmit those optional attributes to the RP. Optional attributes and the selection method need to be clearly delineated for the authorized party.

**Assessment objective**

Determine whether the authorized party can selectively approve or deny the RP access to any optional attributes without terminating the transaction.

**Assessment methods**

- EXAMINE: Examine the IdP's runtime decision interface to verify that optional attributes are clearly delineated from required attributes and that the authorized party is given the option to approve or deny individual optional attributes.
- TEST: Test by initiating a federation transaction that includes a request for optional attributes. Verify that: (1) The authorized party is presented with a clear distinction between required and optional attributes.  (2) The authorized party can deny optional attributes. (3) Denied optional attributes are not released to the RP. (4) The transaction continues after the denial of optional attributes.
