**FPT_TUD_EXT.1.1**

*Application note:* This requirement is about the ability to "check" for updates. The actual installation of any updates should be done by the platform. This requirement is intended to ensure that the application can check for updates provided by the vendor, as updates provided by another source may contain malicious code.

**Evaluation activities**

*TSS:*

The evaluator shall verify the TSS contains a description of the update mechanism leveraged, how new updates are checked for, how the current version is checked for, and how the updates are signed.

*Guidance:*

The evaluator shall check to ensure the guidance includes a description of how to check for and apply new updates.

*Tests:*

The evaluator shall check for an update using procedures described in either the application documentation or the platform documentation and verify that the application does not issue an error. If it is updated or if it reports that no update is available this requirement is considered to be met.

**FPT_TUD_EXT.1.2**

**Evaluation activities**

*Guidance:*

The evaluator shall verify guidance includes a description of how to query the current version of the application.

*Tests:*

The evaluator shall query the application for the current version of the software according to the operational user guidance. The evaluator shall then verify that the current version matches that of the documented and installed version.

**FPT_TUD_EXT.1.3**

*Application note:* This requirement applies to the code of the application; it does not apply to mobile code technologies that are designed for download and execution by the application.

If "perform trusted updates" is selected then FPT_TUD_EXT.2 must be included in the ST.

**Evaluation activities**

*Tests:*

Conditional: If "not download, modify, replace or update its own binary code" is selected the evaluator shall verify that the application's executable files are not changed by the application with the following tests:

- **Apple iOS and iPadOS:** The evaluator shall consider the requirement met because the platform forces applications to write all data within the application working directory (sandbox).
- **Microsoft Windows, Android, Linux, Oracle Solaris, Apple macOS:** The evaluator shall install the application and then locate all of its executable files. The evaluator shall then, for each file, save off either a hash of the file or a copy of the file itself. The evaluator shall then run the application and exercise all features of the application as described in the ST. The evaluator shall then compare each executable file with either the saved hash or the saved copy of the files. The evaluator shall verify that these are identical.

**FPT_TUD_EXT.1.4**

*Application note:* The specifics of the verification of updates involves requirements on the platform (and not the application), so these are not fully specified here.

**Evaluation activities**

*TSS:*

The evaluator shall verify that the TSS identifies how updates to the application are signed by an authorized source. The definition of an authorized source must be contained in the TSS. The evaluator shall also ensure that the TSS (or the operational guidance) describes how candidate updates are obtained.

**FPT_TUD_EXT.1.5**

*Application note:* Application software that is distributed as part of the platform operating system is not required to be packaged for installation or uninstallation. If "**as an additional software package to the platform OS**" is selected, the requirements from FPT_TUD_EXT.2 must be included in the ST.

**Evaluation activities**

*TSS:*

The evaluator shall verify that the TSS identifies how the application is distributed. If "**as an additional package...**" is selected, the evaluator shall perform the tests in FPT_TUD_EXT.2.

*Guidance:*

None.

*Tests:*

If " **with the platform OS**" is selected, the evaluator shall perform a clean installation or factory reset to confirm that TOE software is included as part of the platform OS.
