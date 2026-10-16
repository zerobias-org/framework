**Requirement:** FCS_STO_EXT.1 · **Status:** Mandatory

**FCS_STO_EXT.1.1** The application shall

[**selection**:
- not store any credentials
- invoke the functionality provided by the platform to securely store [**assignment**: list of credentials]
- securely store [**assignment**: list of credentials] with platform provided [**selection**: [**selection**: AES-CBC (as defined in NIST SP 800-38A) mode, AES-GCM (as defined in NIST SP 800-38D) mode, AES-XTS (as defined in NIST SP 800-38E) mode] and cryptographic key size of 256-bits., PBKDF2 function that uses [**selection**: HMAC-SHA256, HMAC-SHA384, HMAC-SHA512] with [**assignment**: positive integer of 1,000 or greater] iterations and output cryptographic key size of [**assignment**: positive integer of 256 of greater] bits that meet the following [*NIST SP 800-132*].]
- implement functionality to securely store [**assignment**: list of credentials] according to [**selection**: FCS_COP.1/SKC, FCS_PBKDF_EXT.1]
]

to non-volatile memory.

**Dependencies:** No dependencies.
