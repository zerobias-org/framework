Assessment is required when: The subscriber is identified in the assertion using a federated identifier.

When wallets act as an IdP, the assertion has two issuers: the wallet (outer assertion) and the CSP (signed attribute bundle). The federated identifier must use the CSP as the issuer component because the CSP is the authority over the subscriber account and the subject identifier.

**Assessment objective**

Determine whether the RP uses the CSP's issuer identifier as the issuer component of the federated identifier.

**Assessment methods**

- TEST: Test by presenting a wallet assertion where the wallet's issuer identifier in the outer assertion differs from the CSP's issuer identifier in the signed attribute bundle. Confirm that the RP constructs the federated identifier using the CSP's issuer identifier.
