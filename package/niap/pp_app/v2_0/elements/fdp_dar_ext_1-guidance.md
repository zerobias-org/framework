**FDP_DAR_EXT.1.1**

*Application note:* If "**implement functionality to encrypt sensitive data as defined in the PP-Module for File Encryption**" is selected, the TSF must claim conformance to a PP-Configuration that includes the File Encryption PP-Module.

Any file that may potentially contain sensitive data (to include temporary files) shall be protected. The only exception is if the user intentionally exports the sensitive data to non-protected files. ST authors should select "**protect sensitive data in accordance with FCS_STO_EXT.1**" for the sensitive data that is covered by the FCS_STO_EXT.1 SFR.

**Evaluation activities**

*TSS:*

If any selection other than **not store any sensitive data** is selected the evaluator shall examine the TSS to ensure that it describes the sensitive data processed by the application. The evaluator shall then ensure that the following activities cover all of the sensitive data identified in the TSS.

If **not store any sensitive data** is selected, the evaluator shall inspect the TSS to ensure that it describes how sensitive data cannot be written to non-volatile memory. The evaluator shall also ensure that this is consistent with the filesystem test below.

If **implement functionality to encrypt sensitive data** is selected the evaluator shall confirm the TSS describes how the application ensures all sensitive data is protected by the file encryption functions.

If **protect sensitive data in accordance with FCS_STO_EXT.1** is selected the evaluator shall confirm the TSS describes which data is protected via this mechanism and the selections within FCS_STO_EXT.1 that are leveraged. If multiple selections are included the evaluator shall ensure the TSS describes which sensitive data is captured by which selection.

If "**leverage platform-provided functionality...**" is selected, the evaluation activities will be performed as stated in the following requirements, which vary on a per-platform basis.

The evaluator shall inspect the TSS and verify that it describes how files containing sensitive data are stored with the `MODE_PRIVATE` flag set.

The Windows platform currently does not provide data-at-rest encryption services which depend upon invocation by application developers.

The evaluator shall inspect the TSS and ensure that it describes how the application uses the Complete Protection, Protected Unless Open, or Protected Until First User Authentication Data Protection Class for each data file stored locally.

The Linux platform currently does not provide data-at-rest encryption services which depend upon invocation by application developers.

The Solaris platform currently does not provide data-at-rest encryption services which depend upon invocation by application developers.

The macOS platform currently does not provide data-at-rest encryption services which depend upon invocation by application developers.

*Guidance:*

The evaluator shall confirm the operational guidance contains any instructions necessary for configuring the storage and protection of any sensitive data.

If **leverage platform-provided functionality to encrypt sensitive data** is selected the evaluator shall confirm the operational guidance contains the list of supported operational environments and any steps necessary to ensure the platform captures any sensitive data that is stored.

*Tests:*

If "**implement functionality to encrypt sensitive data as defined in the PP-Module for File Encryption**" or "**protect sensitive data in accordance with FCS_STO_EXT.1**" is selected, the evaluator shall inventory the filesystem locations where the application may write data. The evaluator shall run the application and attempt to store sensitive data. The evaluator shall then inspect those areas of the filesystem to note where data was stored (if any), and verify it has been encrypted.

If "**leverage platform-provided functionality...**" is selected no additional testing is required.
