Attribute bundles carry the CSP's signature attesting to the authenticity of the attributes. The assertion signature (validated per FAL1-2) protects the bundle from substitution or tampering during the federation transaction. See ARTVL-1 for the equivalent requirement in subscriber-controlled wallet scenarios.

**Assessment objective**

Determine whether the RP validates both the signature specific to the attribute bundle and any container signatures such as the assertion signature.

**Assessment methods**

- TEST: IdP assertion signature validation is satisfied by FAL1-2. For CSP-issued attribute bundles:                                                                                                                                                                Examine the RP's assertion processing documentation to verify that it validates the CSP's signature on the attribute bundle. Test by presenting an assertion containing an attribute bundle with an invalid bundle signature but a valid assertion signature. Verify that the RP rejects it.
