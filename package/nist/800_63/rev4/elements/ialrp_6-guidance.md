Assessment is required when: The IdP utilizes an allowlist for RPs.

This control ensures that allowlist entries are not simply bypassed by an RP requesting additional attributes. The IdP must have a policy for handling such requests and enforce it.

**Assessment objective**

Determine whether the IdP handles RP requests for attributes beyond the allowlist entry by either obtaining authorized party approval, redacting to allowlist attributes, or denying the request.

**Assessment methods**

- TEST: Test by configuring an allowlist entry for a test RP with a defined set of attributes, then submitting a federation request from that RP that includes a request for additional attributes beyond those listed in the allowlist entry. Verify the IdP responds with one of the following: (a) Prompts the authorized party to approve the additional attributes (see IDPRD-1 through IDPRD-6), or (b) returns only the attributes specified in the allowlist entry, or (c) denies the request entirely.
