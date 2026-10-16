Some signature mechanisms allow for selective coverage of the signature, placing some items outside of the cryptographic protection. This requirement specifies that all the required fields and vital information of the assertion need to be covered by the signature mechanism in use.

**Assessment objective**

Determine whether the signature method used to protect the assertion covers all required components.

**Assessment methods**

- EXAMINE: Examine the IdP's assertion configuration and documentation to determine that all necessary elements of the  assertions are covered by the IdP signature.
- TEST: Test by having the IdP generate an assertion. Examine the assertion to determine whether all required assertion components are covered by the signature.
