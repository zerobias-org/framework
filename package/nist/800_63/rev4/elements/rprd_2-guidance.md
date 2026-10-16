Assessment is required when: The RP is in a trust agreement with an IdP, but does not include that IdP in an allowlist, and the RP employs a mechanism to remember the authorized party's decision.

This is the RP-side equivalent of IDPRD-7. The RP's remembered decision concerns which IdP to contact, not which attributes to release. Since this mechanism operates prior to authentication (e.g., via a browser cookie outside the authenticated session), it is separate from the RP subscriber account.

Related Controls: RPRD-3 requires the RP to allow revocation of remembered decisions.

**Assessment objective**

Determine whether the RP discloses to the authorized party that a mechanism is in use to remember their prior IdP authorization decision.

**Assessment methods**

- EXAMINE: Examine runtime decision screens and RP documentation to verify that the remembered IdP decision is disclosed to the authorized party.
- TEST: Test by initiating a federation transaction that triggers a runtime IdP selection and verify that the RP either (a) gives the authorized party a choice whether the decision should be remembered for future transactions, or (b) discloses that the decision may be remembered for future transactions.
