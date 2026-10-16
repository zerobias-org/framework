Assessment is required when: The IdP is party to a trust agreement with an RP but does not have that RP on an allowlist.

If a given RP is allowed to request a connection from an IdP, and that RP has not been allowlisted by the IdP, then the IdP must present a runtime authorization decision to the authorized party identified in the trust agreement. The purpose of this requirement is to allow authorized party-driven connection decisions where possible in addition to traditional pre-negotiated connections enabled by allowlists.

**Assessment objective**

Determine whether a request for information release by an RP that is not allowlisted triggers a runtime authorization decision by the authorized party.

**Assessment methods**

- EXAMINE: Examine the IdP configuration to verify that a default policy exists requiring runtime authorization decisions for non-allowlisted RPs.
- TEST: Test by initiating a federation transaction from a non-allowlisted RP and verify that the IdP presents a runtime authorization decision to the authorized party, who can both approve and deny the request.
