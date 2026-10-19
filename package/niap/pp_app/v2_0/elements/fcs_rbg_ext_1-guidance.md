**FCS_RBG_EXT.1.1**

*Application note:* The selection "**invoke platform-provided DRBG functionality**" should only be chosen for direct invocations of the platform DRBG by the TSF.

The selection "**use no DRBG functionality**" is chosen when the TSF calls a platform implementation of a function that subsequently calls a platform-provided DRBG itself, because this is not a direct invocation of the platform DRBG by the TSF.

If "**implement DRBG functionality**" is selected, FCS_RBG.1 must be claimed for the DRBG mechanism, and FPT_TST.1 and FPT_FLS.1 must be claimed for the self-testing and error handling of this mechanism.

In this requirement, cryptographic operations include all cryptographic key generation/derivation/agreement, IVs (for certain modes), as well as protocol-specific random values. Cryptographic operations in this requirement refer to the other cryptographic requirements in this PP, not additional functionality that is not in scope.

**Evaluation activities**

*TSS:*

If "**use no DRBG functionality**" is selected, the evaluator shall inspect the application and its developer documentation and verify that the application needs no random bit generation services.

If "**implement DRBG functionality**" is selected, the evaluator shall ensure that FCS_RBG.1 is claimed.

If "**invoke platform-provided DRBG functionality**" is selected, the evaluator performs the following activities. The evaluator shall examine the TSS to confirm that it identifies all functions (as described by the SFRs included in the ST) that obtain random numbers from the platform RBG. The evaluator shall determine that for each of these functions, the TSS states which platform interface (API) is used to obtain the random numbers. The evaluator shall confirm that each of these interfaces corresponds to the acceptable interfaces listed for each platform below.

It should be noted that there is no expectation that the evaluators attempt to confirm that the APIs are being used correctly for the functions identified in the TSS; the activity is to list the used APIs and then do an existence check via decompilation.

*Guidance:*

The evaluator shall verify the guidance documentation contains any information required for configuring the DRBG.

*Tests:*

If "**invoke platform-provided DRBG functionality**" is selected, the following tests shall be performed:

The evaluator shall decompile the application binary using a decompiler suitable for the application (TOE). The evaluator shall search the output of the decompiler to determine that, for each API listed in the TSS, that API appears in the output. If the representation of the API does not correspond directly to the strings in the following list, the evaluator shall provide a mapping from the decompiled text to its corresponding API, with a description of why the API text does not directly correspond to the decompiled text and justification that the decompiled text corresponds to the associated API.

The following are the per-platform list of acceptable APIs:

- **Android:** The evaluator shall verify that the application uses at least one of `javax.crypto.KeyGenerator` class or the `java.security.SecureRandom` class or `/dev/random` or `/dev/urandom`.
- **Microsoft Windows:** The evaluator shall verify that `rand_s`, `RtlGenRandom`, `BCryptGenRandom`, or `CryptGenRandom` API is used for classic desktop applications. The evaluator shall verify the application uses the `RNGCryptoServiceProvider` class or derives a class from `System.Security.Cryptography.RandomNumberGenerator API` for Windows Universal Applications. It is only required that the API is called/invoked, there is no requirement that the API be used directly. In future versions of this document, `CryptGenRandom` may be removed as an option as it is no longer the preferred API per vendor documentation.
- **Apple iOS and iPadOS:** The evaluator shall verify that the application invokes either `SecRandomCopyBytes`, `CCRandomGenerateBytes`, or `CCRandomCopyBytes`, or uses `/dev/random` directly to acquire random.
- **Linux:** The evaluator shall verify that the application collects random from `/dev/random` or `/dev/urandom`.
- **Oracle Solaris:** The evaluator shall verify that the application collects random from `/dev/random`.
- **Apple macOS:** The evaluator shall verify that the application invokes either `CCRandomGenerateBytes` or `CCRandomCopyBytes`, or collects random from `/dev/random`.

If invocation of platform-provided functionality is achieved in another way, the evaluator shall ensure the TSS describes how this is carried out, and how it is equivalent to the methods listed here (e.g. higher-level API invokes identical low-level API).
