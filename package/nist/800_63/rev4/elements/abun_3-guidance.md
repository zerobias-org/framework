Assessment is required when: The attribute bundle includes a verification key for the IdP.

This control establishes a CSP-to-IdP binding. When the CSP signs an attribute bundle containing a specific IdP's verification key, the CSP restricts which IdP may present that bundle. The RP enforces this restriction by verifying the assertion signature against the embedded key, rather than a key obtained from metadata or trust agreement artifact(s).

Note: The phrase "identity claimed in the attribute bundle" in the source text refers to the IdP whose verification key is embedded in the CSP-signed bundle.

**Assessment objective**

Determine whether the RP uses the IdP verification key embedded in the CSP-signed attribute bundle to verify the assertion signature, thereby confirming the assertion was issued by the IdP authorized by the CSP to present the bundle.

**Assessment methods**

- EXAMINE: Examine the RP's assertion-processing documentation to confirm that the RP extracts the IdP's verification key from the CSP-signed attribute bundle and uses it to verify the assertion's signature.
- TEST: Test by presenting an assertion containing an attribute bundle with a valid embedded IdP verification key. Verify that the RP successfully validates the assertion signature using that key. Then, present an assertion signed by a different IdP than the one whose key is embedded in the attribute bundle. Verify the RP rejects the assertion.
