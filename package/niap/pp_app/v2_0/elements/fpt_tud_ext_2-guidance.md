**FPT_TUD_EXT.2.1**

**Evaluation activities**

*TSS:*

The evaluator shall verify that the TSS describes how the application is distributed and verify that description aligns with the selections in the ST.

*Guidance:*

None.

*Tests:*

If a container image is claimed, the evaluator shall verify that application updates are distributed as container images. If the format of the platform-supported package manager is claimed, the evaluator shall verify that application updates are distributed in the format supported by the platform. This varies per platform:

- **Android:** The evaluator shall ensure that the application is packaged in the Android application package (APK) format.
- **Microsoft Windows:** The evaluator shall ensure that the application is packaged in the standard Windows Installer (.MSI) format, the Windows Application Software (.EXE) format signed using the Microsoft Authenticode process, or the Windows Universal Application package (.APPX) format. See https://msdn.microsoft.com/en-us/library/ms537364(v=vs.85).aspx for details regarding Authenticode signing.
- **Apple iOS and iPadOS:** The evaluator shall ensure that the application is packaged in the IPA format.
- **Linux:** The evaluator shall ensure that the application is packaged in the format of the package management infrastructure of the chosen distribution. For example, applications running on Red Hat and Red Hat derivatives shall be packaged in `RPM` format. Applications running on Debian and Debian derivatives shall be packaged in `DEB` format.
- **Oracle Solaris:** The evaluator shall ensure that the application is packaged in the PKG format.
- **Apple macOS:** The evaluator shall ensure that the application is packaged in the DMG format, the PKG format, or the MPKG format.

**FPT_TUD_EXT.2.2**

*Application note:* Application software bundled with the system/firmware image are not subject to this requirement if the user is unable to remove the application through means provided by the OS.

**Evaluation activities**

*TSS:*

None.

*Guidance:*

The evaluator shall verify the guidance documentation details how uninstallation of the application is performed.

*Tests:*

- **Android:** The evaluator shall consider the requirement met because the platform forces applications to write all data within the application working directory (sandbox).
- **Apple iOS and iPadOS:** The evaluator shall consider the requirement met because the platform forces applications to write all data within the application working directory (sandbox).

For all other platforms, the evaluator shall record the path of every file on the entire filesystem prior to installation of the application, and then install and run the application. Afterward, the evaluator shall uninstall the application, and compare the resulting filesystem to the initial record to verify that no files, other than configuration, output, and audit or log files, have been added to the filesystem.

**FPT_TUD_EXT.2.3**

*Application note:* The specifics of the verification of installation packages involves requirements on the platform (and not the application), so these are not fully specified here.

If "**Leighton-Micali Signature**" or "**eXtended Merkle Signature Scheme**" is selected, the corresponding selection must be made in FCS_COP.1/SigVer.

**Evaluation activities**

*TSS:*

The evaluator shall verify that the TSS identifies how the application installation package is signed by an authorized source. The definition of an authorized source must be contained in the TSS.

*Guidance:*

None.

*Tests:*

Conditional: if "the application can verify them using" is selected the evaluator shall perform the following tests:

- **Test 1:** The evaluator shall ensure that the update has a digital signature belonging to the vendor prior to its installation. The evaluator shall modify the downloaded update in such a way that the digital signature is no longer valid. The evaluator will then attempt to install the modified update. The evaluator shall ensure that the modified update fails to install.
- **Test 2:** The evaluator shall ensure that the update has a digital signature belonging to the vendor. The evaluator shall then attempt to install the update (or permit installation to continue). The evaluator shall ensure that the the update successfully installs.
