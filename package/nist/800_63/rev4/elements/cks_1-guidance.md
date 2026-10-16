FIPS 140 establishes security requirements for cryptographic modules, including tamper resistance at higher levels. Federal agencies and their service providers are typically required to use FIPS 140-validated modules. The applicable FIPS 140 level depends on the organization's security requirements and applicable policies.

Related Controls:

- FAL2-7 requires Federal IdPs at FAL2 or higher to protect assertion signing keys with FIPS 140 Level 1 or higher validated mechanisms.
- CKS-2, CKS-3, and CKS-4 establish requirements for non-exportable key storage.
- KS-1 and KS-2 establish key storage requirements specific to subscriber-controlled wallets.

**Assessment objective**

Determine whether the assessed party stores signing keys, decryption keys, and symmetric keys securely and in accordance with applicable FIPS 140 requirements.

**Assessment methods**

- EXAMINE: Examine (1) Documentation describing key storage mechanisms for signing keys, decryption keys, and symmetric keys. Verify that the documented storage approach addresses protection from unauthorized access. (2) FIPS 140 validation certificates for cryptographic modules used to store keys, if applicable. Verify that the validated level meets the organization's requirements and applicable policies. (3) System configurations and access controls for key storage to verify that keys are protected consistent with the documented approach and FIPS 140 requirements.
