**FMT_CFG_EXT.1.1**

*Application note:* Default credentials are credentials (e.g., passwords, keys) that are automatically (without user interaction) loaded onto the platform during application installation. Credentials that are generated during installation using requirements laid out in FCS_RBG_EXT.1 or established by leveraging platform accounts are not by definition default credentials.

**Evaluation activities**

*TSS:*

The evaluator shall check that the TSS describes whether the application requires any type of application provided credentials and whether the application is pre-configured with default values for these credentials. If credentials are required, the evaluator shall verify that the TSS details how use of the TOE is restricted until new credentials are set (which includes the replacement of default credentials if any are present).

*Guidance:*

The evaluator shall verify the guidance documentation details regarding any default or null application provided credentials being used and how they would be updated.

*Tests:*

If the application uses any default credentials the evaluator shall run the following tests.

- **Test 1:** For any application provided credentials the evaluator shall install and run the application without generating or loading new credentials and verify that only the minimal application functionality required to set new credentials is available.
- **Test 2:** For any application provided credentials the evaluator shall attempt to clear all credentials and verify that only the minimal application functionality required to set new credentials is available.
- **Test 3:** For any application provided credentials the evaluator shall run the application, establish new credentials and verify that the original default credentials no longer provide access to the application.

**FMT_CFG_EXT.1.2**

*Application note:* The precise expectations for file permissions vary per platform but the general intention is that a trust boundary protects the application and its data.

**Evaluation activities**

*TSS:*

None.

*Guidance:*

None.

*Tests:*

The evaluator shall install and run the application. The evaluator shall inspect the filesystem of the platform (to the extent possible) for any files created by the application and ensure that their permissions are adequate to protect them. The method of doing so varies per platform.

- **Android:** The evaluator shall run the command `find -L . -perm /002` inside the application's data directories to ensure that all files are not world-writable. The command should not print any files (for this test, directories are not considered to be files).
- **Microsoft Windows:** The evaluator shall run the SysInternals tools Process Monitor and Access Check (or tools of equivalent capability, like icacls.exe) for Classic Desktop applications to verify that files written to disk during an application's installation have the correct file permissions, such that a standard user cannot modify the application or its data files. For Windows Universal Applications the evaluator shall consider the requirement met because of the AppContainer sandbox.
- **Apple iOS and iPadOS:** The evaluator shall determine whether the application leverages the appropriate Data Protection Class for each data file stored locally.
- **Linux:** The evaluator shall run the command `find -L . -perm /002` inside the application's data directories to ensure that all files are not world-writable. The command should not print any files.
- **Oracle Solaris:** The evaluator shall run the command `find . \( -perm -002 \)` inside the application's data directories to ensure that all files are not world-writable. The command should not print any files.
- **Apple macOS:** The evaluator shall run the command `find . -perm +002` inside the application's data directories to ensure that all files are not world-writable. The command should not print any files.
