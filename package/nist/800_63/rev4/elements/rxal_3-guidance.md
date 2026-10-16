The RP obtains this IAL information from a combination of the terms of the trust agreement (see Sec. 3.5) and information included in the assertion (see Sec. 4.9 and Sec. 5.8).

**Assessment objective**

Determine whether the IdP informs the RP of the IAL for each federation transaction.

**Assessment methods**

- EXAMINE: If the IAL is static: Satisfied by RXAL-6. If the IAL is variable: Examine the IdP assertion schema, metadata, or other documentation to confirm that the IdP provides either a claim or attribute conveying the IAL of the subscriber account, or a defined mechanism by which no IAL claim is made in the assertion format used by the IdP.
- TEST: Test by initiating a transaction in which the IdP asserts an IAL value and determine that the assertion or associated message includes that value. Then, initiate a transaction in which the IdP omits an IAL claim and determine that the assertion output matches the IdP's documented no-claim mechanism.
