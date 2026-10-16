**Requirement:** FCS_CKM.2 · **Status:** Selection-Based

**FCS_CKM.2.1** The application shall [**selection**: invoke platform-provided functionality, implement functionality] to perform cryptographic key establishment in accordance with a specified cryptographic key establishment method:

[**selection**:
- CNSA 2.0 Compliant Algorithm: **Module-Lattice-Based Key-Encapsulation Mechanism Standard** using the **parameter set ML-KEM-1024** that meets the following: [FIPS 203, Module-Lattice-Based Key-Encapsulation Mechanism Standard]
- CNSA 1.0 Compliant Algorithms: [**selection**: **[RSA-based key establishment schemes]** that meet the following: **[NIST Special Publication 800-56B, “Recommendation for Pair-Wise Key Establishment Schemes Using Integer Factorization Cryptography”]**, **[Elliptic curve-based key establishment schemes]** that meets the following: **[NIST Special Publication 800-56A, “Recommendation for Pair-Wise Key Establishment Schemes Using Discrete Logarithm Cryptography”]**, **[FFC Schemes using “safe-prime” groups]** that meet the following: **‘NIST Special Publication 800-56A Revision 3, “Recommendation for Pair-Wise Key Establishment Schemes Using Discrete Logarithm Cryptography”** and [**selection**: RFC 3526, RFC 7919]]
].
