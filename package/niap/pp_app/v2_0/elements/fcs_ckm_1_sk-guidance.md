**FCS_CKM.1.1/SK**

*Application note:* This requirement is dependent on selecting any AES selection in FCS_COP.1.1/SKC. Symmetric keys may be used to generate keys along the key chain.

**Evaluation activities**

*TSS:*

The evaluator shall review the TSS to determine that it describes how the functionality described by FCS_RBG_EXT.1 is invoked.

If the application is relying on random bit generation from the host platform, the evaluator shall verify the TSS includes the name/manufacturer of the external RBG and describes the function call and parameters used when calling the external DRBG function. If different external RBGs are used for different platforms, the evaluator shall verify the TSS identifies each RBG for each platform. Also, the evaluator shall verify the TSS includes a short description of the vendor's assumption for the amount of entropy seeding the external DRBG. The evaluator uses the description of the RBG functionality in FCS_RBG_EXT or documentation available for the operational environment to determine that the key size being requested is identical to the key size and mode to be used for the encryption/decryption of the user data.

*Guidance:*

The evaluator shall verify the guidance documentation contains any information necessary to configure key sizes.

*Tests:*

None.
