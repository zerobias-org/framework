**FCS_STO_EXT.1.1**

*Application note:* This requirement ensures that persistent credentials (secret keys, PKI private keys, passwords, etc) are stored securely, and never persisted in cleartext form. Application developers are encouraged to use platform mechanisms for the secure storage of credentials. Depending on the platform that may include hardware-backed protection for credential storage. Application developers must choose a selection, or multiple selections, based on all credentials that the application stores. If "**not store any credentials**" is selected, then the application must not store any credentials. If "**invoke the functionality provided by the platform to securely store**" is selected, then the application developer must closely review the EA for their platform and provide documentation indicating which platform mechanisms are used to store credentials. If "**securely store**" is selected, the application shall leverage platform cryptographic APIs to implement storage of credentials. If "**implement functionality to securely store credentials**" is selected, then the following components must be included in the ST: (FCS_COP.1/SKC and FCS_SNI_EXT.1) or FCS_PBKDF_EXT.1. If the OS is Linux and Java KeyStores are used to store credentials, "**implement functionality to securely store credentials**" must be selected.

**Evaluation activities**

*TSS:*

The evaluator shall check the TSS to ensure that it lists all persistent credentials (secret keys, PKI private keys, or passwords) needed to meet the requirements in the ST. For each of these items, the evaluator shall confirm that the TSS lists for what purpose it is used, and how it is stored.

If **not store any credentials** is selected, the evaluator shall verify the TSS describes the behavior of the TOE in sufficient detail to verify that the TSF does not have any behavior that would require any credentials to be stored (e.g., because the TOE does not have any functionality requiring authentication).

If **securely store** is selected, the evaluator shall verify the TSS contains the platform functions utilized and verify those functions are documented by the platform to be non-deprecated functions meeting the specifications in the requirement.

If **invoke the functionality provided by the platform to securely store** is selected, the evaluator shall confirm the TSS describes how the platform storage is invoked for each supported platform. The evaluator shall confirm the invocation of the platform is using non-deprecated functions provided by the platform(s).

*Guidance:*

None.

*Tests:*

For all credentials for which the application implements functionality, the evaluator shall verify credentials are encrypted according to FCS_COP.1/SKC or conditioned according to FCS_PBKDF_EXT.1. For all credentials for which the application invokes platform-provided functionality, the evaluator shall perform the following actions which vary per platform.

- **Android:** The evaluator shall verify that the application uses the Android `KeyStore` or the Android `KeyChain` to store certificates.
- **Microsoft Windows:** The evaluator shall verify that all certificates are stored in the Windows Certificate Store. The evaluator shall verify that other credentials, like passwords, are stored in the Windows Credential Manager or stored using the Data Protection API (DPAPI). For Windows Universal Applications, the evaluator shall verify that the application is using the ProtectData class and storing credentials in IsolatedStorage.
- **Apple iOS and iPadOS:** The evaluator shall verify that all credentials are stored within a `Keychain`.
- **Linux:** The evaluator shall verify that all keys are stored using Linux keyrings.
- **Oracle Solaris:** The evaluator shall verify that all keys are stored using Solaris `Key Management Framework (KMF)`.
- **Apple macOS:** The evaluator shall verify that all credentials are stored within `Keychain`.
