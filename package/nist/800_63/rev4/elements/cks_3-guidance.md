Assessment is required when: Non-exportable key storage is required or claimed.

This control ensures that the key storage interface does not permit secret key extraction. Cryptographic operations using the keys must occur within the secure storage environment itself, with only the results (e.g., signatures, decrypted data) returned to the host processor.

Related Controls:

- CKS-2 defines what qualifies as non-exportable key storage.
- CKS-4 requires that non-exportable key storage cannot be reprogrammed to allow key extraction.

**Assessment objective**

Determine whether non-exportable key storage is designed to prohibit export of secret keys to the host processor.

**Assessment methods**

- EXAMINE: Examine documentation and technical specifications for the key storage mechanism. Verify that the design does not include any interface or function that would allow secret keys to be exported to the host processor.
