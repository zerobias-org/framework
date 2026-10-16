Assessment is required when: Non-exportable key storage is required or claimed.

Some circumstances require the cryptographic keys to be stored in a non-exportable manner, such as reaching FAL3 with a subscriber-controlled wallet on a subscriber's device (see Sec. 5.4.1).

This control establishes the criteria for key storage to be considered non-exportable. Software-only key stores do not meet the definition of non-exportable, regardless of access controls or encryption applied to the stored keys.

**Assessment objective**

Determine whether key storage claimed as non-exportable meets the hardware or embedded processor/execution environment requirements.

**Assessment methods**

- EXAMINE: Examine documentation describing key storage mechanisms. Verify that any key storage claimed as non-exportable is either a separate piece of hardware or an embedded processor or execution environment that is separate from the host processor (e.g., secure element, TEE, TPM).
