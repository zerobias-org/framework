Assessment is required when: The subscriber is identified in the assertion using a federated identifier.

**Assessment objective**

Determine whether the CSP includes the subject identifier within the signed attribute bundle issued to the wallet.

**Assessment methods**

- EXAMINE: Examine the CSP's attribute bundle issuance process and configuration to confirm that the subject identifier is included as a field within the signed attribute bundle.
- TEST: Test by requesting issuance of an attribute bundle from the CSP and inspect its signed contents to confirm the subject identifier is present inside the bundle (rather than in the outer wallet assertion).
