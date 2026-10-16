**Applies to:** CSP/IdP/RP · **Assurance level:** ALL · **Section:** SP 800-63C-4 3.5 A

A trust agreement SHALL address one or more of the following relationships:

IdP to CSP:

The IdP trusts the CSP to provide access to attributes in subscriber accounts, through either an IdP onboarding process or the issuance of attribute bundles. The IdP trusts the CSP's identity proofing processes used in the establishment of the subscriber account.

CSP to IdP:

The CSP trusts the IdP to accurately represent subscriber identity attributes to RPs and to not disclose identity attributes outside of agreed-upon functionality. The CSP trusts the IdP to protect the release of attributes, such as requiring authentication

of the subscriber or the presentation of an activation factor before attributes are released.

RP to IdP:

The RP trusts the IdP to accurately represent subscriber identity attributes as provided by the CSP. The RP trusts the IdP to authenticate or identify the subscriber when representing an authentication event.

IdP to RP:

The IdP trusts the RP to only use the requested attributes for its stated purposes

RP to CSP:

The RP trusts the CSP to provide access to subscriber identity attributes through IdPs. The RP trusts that the CSP has identity-proofed the subscriber and is managing the subscriber account.
