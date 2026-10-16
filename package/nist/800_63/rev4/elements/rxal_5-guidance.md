The RP obtains this FAL information from a combination of the terms of the trust agreement (see Sec. 3.5) and information included in the assertion (see Sec. 4.9 and Sec. 5.8).

**Assessment objective**

Determine whether the IdP informs the RP of the FAL for each federation transaction.

**Assessment methods**

- EXAMINE: If the FAL is static: Satisfied by RXAL-6. If the FAL is variable: Examine the IdP assertion schema, metadata, or other documentation to confirm that the IdP provides a claim or attribute that conveys the FAL of the federation transaction.
- TEST: Test by initiating a transaction where the IdP asserts an FAL value - verify that the assertion or associated message includes that value.
