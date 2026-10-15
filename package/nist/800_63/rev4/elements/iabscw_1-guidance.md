This is a process-level control covering the end-to-end issuance process from the CSP's perspective.

SP 800-63C-4 uses the terms "signing key" and "verification key" throughout Section 5 rather than the "private key" and "public key" terminology used in other NIST cryptographic standards. The signing key is the wallet's private key used to sign assertions; the verification key is the corresponding public key.

The CSP cannot observe wallet activation at runtime but can control which wallet platforms it issues to. Before issuing attribute bundles to a given wallet platform, the CSP should verify that the platform enforces activation requirements. This may involve reviewing wallet platform documentation, security certifications, or independent security evaluations.

**Assessment objective**

Determine whether the CSP's issuance process requires the subscriber to prove their identity and prove possession of a wallet-generated key before an attribute bundle is issued.

**Assessment methods**

- EXAMINE: Examine the following: (1) The CSP's issuance process to confirm it requires subscriber identity verification (via identity proofing or authentication) before bundle creation. Identity proofing requirements are assessed under SP 800-63A; authentication requirements are assessed under SP 800-63B. (2) The CSP's documentation to confirm that the CSP has evaluated that the target wallet platform enforces activation factor requirements before permitting signing key operations. Wallet activation requirements are assessed separately under Section 5.4 controls. (3) The CSP's issuance protocol to confirm it requires and validates proof of possession of the wallet's signing key before creating the attribute bundle. (4) The CSP's bundle creation process to confirm the resulting attribute bundle includes subscriber attributes and the wallet's verification key or a reference to it. Attribute bundle content requirements are assessed under the ABUN series (Section 3.12.1). (5) The CSP's delivery mechanism to confirm the bundle is transmitted to the requesting wallet.
