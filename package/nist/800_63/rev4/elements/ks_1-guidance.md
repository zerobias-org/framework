CKS-1 covers general secure key storage requirements under FIPS 140; this control adds the wallet-specific prohibition on key syncing across devices. Non-exportable key storage becomes a SHALL for wallets whose signing key is used as a holder-of-key authenticator at FAL3 (see KS-2). The definition of non-exportable key storage is established in CKS-2.

**Assessment objective**

Determine whether wallet signing keys used for assertions are prohibited from being synced or shared across devices.

**Assessment methods**

- EXAMINE: Examine the wallet's key management architecture, configuration, and subscriber-facing key management features to confirm that signing keys are generated and stored per-device and that no mechanism exists to sync, replicate, or share signing keys across devices (e.g., cloud key sync, cross-device backup, or key export functionality).
