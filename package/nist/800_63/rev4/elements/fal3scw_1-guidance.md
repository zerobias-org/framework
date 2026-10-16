Assessment is required when: A subscriber-controlled wallet on a hosted service is used at FAL3.

Device-based subscriber-controlled wallets inherently hold signing keys that can satisfy HoK requirements. Hosted wallets do not, because the subscriber does not directly control the key material. This control requires hosted wallets to bridge that gap through either an additional HoK authenticator separate from the wallet's signing key, or a bound authenticator at the RP.

FAL3SCW-2 requires all other FAL3 requirements (Sec. 2.4) to also be met.

**Assessment objective**

Determine whether federation transactions with a hosted subscriber-controlled wallet at FAL3 use either a holder-of-key assertion or a bound authenticator.

**Assessment methods**

- EXAMINE: For holder-of-key assertions, satisfied by HKA-1 through HKA-5. For assertions that use bound authenticators, satisfied by BAUTH-1 through BAUTH-8.
