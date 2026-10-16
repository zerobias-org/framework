Assessment is required when: The IdP is party to a trust agreement with an RP but does not have that RP on an allowlist, and the IdP employs a mechanism to remember the authorized party's decision.

Related Control:

IDPRD-8 requires the IdP to allow revocation of remembered decisions.

**Assessment objective**

Determine whether the IdP discloses to the authorized party that a mechanism is in use to remember their authorization decision.

**Assessment methods**

- EXAMINE: Examine the runtime decision screens and IdP documentation to verify that disclosure of the remembered decision mechanism is presented to the authorized party.
- TEST: Test by initiating a federation transaction that triggers a runtime decision and verify that the IdP either (a) gives the authorized party a choice whether or not the decision should be remembered for future transactions or (b) discloses that the authorization decision may be remembered for future transactions.
