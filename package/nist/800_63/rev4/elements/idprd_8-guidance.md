Assessment is required when: The IdP is party to a trust agreement with an RP but does not have that RP on an allowlist, and the IdP employs a mechanism to remember the authorized party's decision.

When the IdP remembers an authorized party's runtime decision, the IdP must provide a mechanism for the authorized party to revoke that decision so that future transactions with the same RP will trigger a new runtime authorization prompt.

Related control: IDPRD-7 requires the IdP to disclose that the remembered decision mechanism is in use.

**Assessment objective**

Determine whether a previous runtime decision can be revoked by the authorized party.

**Assessment methods**

- EXAMINE: Examine the IdP interface to verify that the authorized party can view and revoke remembered authorization decisions.
- TEST: Test by approving a non-allowlisted RP at runtime and have the IdP remember the decision. Then, initiate a new transaction with the same RP. Verify no runtime prompt appears.
- TEST: Test by revoking the above remembered decision using the IdP's revocation mechanism. Then, initiate another transaction with the same RP. Verify the runtime prompt reappears.
