The activation factor ensures the subscriber is present and consenting before any signing operation occurs. If the activation factor is a secret (e.g., PIN or password), it must meet the activation secret requirements in SP 800-63B Sec. 3.2.10. If the activation factor is biometric, it must meet the requirements in SP 800-63B Sec. 3.2.3. WACT-2 addresses the requirement that wallet activation be separate from device unlock for device-based wallets.

**Assessment objective**

Determine whether the subscriber-controlled wallet requires presentation of an activation factor from the subscriber before performing signing operations with the wallet's signing keys.

**Assessment methods**

- EXAMINE: Examine the wallet platform's security architecture documentation to confirm that signing-key operations are gated behind the presentation of an activation factor. Confirm that the architecture does not allow access to the signing key without activation.
- TEST: Test by doing the following: (1) During an attribute bundle issuance flow with a CSP, observe that the wallet prompts the subscriber for an activation factor before completing proof-of-possession of the signing key. (2) During a federation transaction with an RP, observe that the wallet prompts the subscriber for an activation factor before signing the assertion for presentation. (3) For each operation above, dismiss or cancel the activation prompt and confirm that the signing operation does not proceed.
