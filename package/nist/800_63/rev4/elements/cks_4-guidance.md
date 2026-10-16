Assessment is required when: Non-exportable key storage is required or claimed.

This control addresses a different attack vector than CKS-3. Even if the key storage interface does not permit key export during normal operation (CKS-3), an attacker with host processor access could potentially modify the storage's firmware to add an export capability. This control requires that the key storage be designed such that the host processor cannot modify its firmware, configuration, or behavior in ways that would enable key extraction.

Related Controls:

- CKS-2 defines what qualifies as non-exportable key storage.
- CKS-3 requires that non-exportable key storage prohibit key export to the host processor.

**Assessment objective**

Determine whether non-exportable key storage is protected against reprogramming by the host processor to allow secret key extraction.

**Assessment methods**

- EXAMINE: Examine documentation and technical specifications for the key storage mechanism. Verify that the host processor cannot modify firmware, configuration, or behavior of the key storage in a way that would enable secret key extraction.
