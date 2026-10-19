**FCS_SNI_EXT.1.1**

**Evaluation activities**

*TSS:*

If salts are used, the evaluator shall ensure the TSS describes how salts are generated. The evaluator shall confirm that the salt is generating using an RBG described in FCS_RBG_EXT.1.

If nonces are used the evaluator shall ensure the TSS describes how nonces are created verify they are a minimum of 64 bits in size.

If initialization vectors (IV) are used the evaluator shall ensure the TSS describes how IVs and tweaks are handled based on the AES mode. The evaluator shall confirm that the IVs and tweaks meet the stated requirements for each AES mode.

If using a GCM IV, the evaluator shall confirm the TSS describes the GCM IV construction and that it matches one of two allowed construction methods given in Section 8.2 of SP800-38D.

*Guidance:*

None.

*Tests:*

None.

**FCS_SNI_EXT.1.3**

*Application note:* This requirement ensures that salts, nonces, and initialization vectors are properly implemented. If the application is implementing a salt, nonce, or initialization vector they must select the corresponding selection. If the platform implements these functions, the corresponding "**use no...**" options are selected.

This requirement is dependent on selecting "implement functionality to securely store..." in FCS_STO_EXT.1.1 or any AES selection in FCS_COP.1.1/SKC.
