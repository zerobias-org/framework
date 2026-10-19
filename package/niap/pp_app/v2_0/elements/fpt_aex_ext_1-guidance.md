**FPT_AEX_EXT.1.1**

*Application note:* Requesting a memory mapping at an explicit address subverts address space layout randomization (ASLR).

**Evaluation activities**

*TSS:*

The evaluator shall ensure that the TSS describes the compiler flags used to enable ASLR when the application is compiled. If any explicitly-mapped exceptions are claimed, the evaluator shall check that the TSS identifies these exceptions, describes the static memory mapping that is used, and provides justification for why static memory mapping is appropriate in this case.

*Guidance:*

None.

*Tests:*

The evaluator shall perform either a static or dynamic analysis to determine that no memory mappings are placed at an explicit and consistent address except for any exceptions claimed in the SFR. For these exceptions, the evaluator shall verify that this analysis shows explicit mappings that are consistent with what is claimed in the TSS. The method of doing so varies per platform. For those platforms requiring the same application running on two different systems, the evaluator may alternatively use the same device. After collecting the first instance of mappings, the evaluator must uninstall the application, reboot the device, and reinstall the application to collect the second instance of mappings.

- **Android:** The evaluator shall run the same application on two different Android systems. Both devices do not need to be evaluated, as the second device is acting only as a tool. Connect via ADB and inspect /proc/PID/maps. Ensure the two different instances share no memory mappings made by the application at the same location.
- **Microsoft Windows:** The evaluator shall run the same application on two different Windows systems and run a tool that will list all memory mapped addresses for the application. The evaluator shall then verify the two different instances share no mapping locations. The Microsoft SysInternals tool, VMMap, could be used to view memory addresses of a running application. The evaluator shall use a tool such as Microsoft's BinScope Binary Analyzer to confirm that the application has ASLR enabled.
- **Apple iOS and iPadOS:** The evaluator shall perform a static analysis to search for any mmap calls (or API calls that call mmap), and ensure that no arguments are provided that request a mapping at a fixed address.
- **Linux:** The evaluator shall run the same application on two different Linux systems. The evaluator shall then compare their memory maps using `pmap -x *PID*` to ensure the two different instances share no mapping locations.
- **Oracle Solaris:** The evaluator shall run the same application on two different Solaris systems. The evaluator shall then compare their memory maps using `pmap -x *PID*` to ensure the two different instances share no mapping locations.
- **Apple macOS:** The evaluator shall run the same application on two different Mac systems. The evaluator shall then compare their memory maps using `vmmap *PID*` to ensure the two different instances share no mapping locations.

**FPT_AEX_EXT.1.2**

*Application note:* Requesting a memory mapping with both write and execute permissions subverts the platform protection provided by DEP. If the application performs no just-in-time compiling, then the first selection must be chosen.

**Evaluation activities**

*TSS:*

None.

*Guidance:*

None.

*Tests:*

The evaluator shall verify that no memory mapping requests are made with write and execute permissions. The method of doing so varies per platform.

- **Android:** The evaluator shall perform static analysis on the application to verify that

    

    - mmap is never invoked with both the PROT_WRITE and PROT_EXEC permissions, and
    - mprotect is never invoked.
- **Microsoft Windows:** The evaluator shall use a tool such as Microsoft's BinScope Binary Analyzer to confirm that the application passes the NXCheck. The evaluator may also ensure that the `/NXCOMPAT` flag was used during compilation to verify that DEP protections are enabled for the application.
- **Apple iOS and iPadOS:** The evaluator shall perform static analysis on the application to verify that mprotect is never invoked with the PROT_EXEC permission.
- **Linux:** The evaluator shall perform static analysis on the application to verify that both

    

    - mmap is never invoked with both the PROT_WRITE and PROT_EXEC permissions, and
    - mprotect is never invoked with the PROT_EXEC permission.
- **Oracle Solaris:** The evaluator shall perform static analysis on the application to verify that both

    

    - mmap is never invoked with both the PROT_WRITE and PROT_EXEC permissions, and
    - mprotect is never invoked with the PROT_EXEC permission.
- **Apple macOS:** The evaluator shall perform static analysis on the application to verify that mprotect is never invoked with the PROT_EXEC permission.

**FPT_AEX_EXT.1.3**

*Application note:* This requirement is designed to ensure that platform security features do not need to be disabled in order for the application to run.

**Evaluation activities**

*TSS:*

None.

*Guidance:*

None.

*Tests:*

The evaluator shall configure the platform in the necessary manner and carry out one of the prescribed tests:

- **Android:** Applications running on Android cannot disable Android security features, therefore this requirement is met and no evaluation activity is required.
- **Microsoft Windows:** If the OS platform supports Windows Defender Exploit Guard, then the evaluator shall ensure that the application can run successfully with Windows Defender Exploit Guard Exploit Protection configured with the following minimum mitigations enabled; Control Flow Guard (CFG), Randomize memory allocations (Bottom-Up ASLR), Export address filtering (EAF), Import address filtering (IAF), and Data Execution Prevention (DEP). The following link describes how to enable Exploit Protection, https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/enable-exploit-protection?view=o365-worldwide.
- **Apple iOS and iPadOS:** Applications running on iOS cannot disable security features, therefore this requirement is met and no evaluation activity is required.
- **Linux:** The evaluator shall ensure that the application can successfully run on a system with either SELinux or AppArmor enabled and in enforce mode.
- **Oracle Solaris:** The evaluator shall ensure that the application can run with Solaris Trusted Extensions enabled and enforcing.
- **Apple macOS:** The evaluator shall ensure that the application can successfully run on macOS without disabling any security features.

**FPT_AEX_EXT.1.4**

*Application note:* The purpose of this requirement is to help ensure the integrity of application binaries by supporting file protection mechanisms such as directory-level file permissions and application allowlisting.

A user-modifiable file for purposes of this requirement is a file that is writable by an unprivileged user of the application -- either directly through application execution or independently of the application. If the application runs in the context of the application user, then the application should not be able to write to the directory containing the application binaries -- regardless of whether the files are configuration data, audit data, or temporary files.

Executables and user-modifiable files may not share the same parent directory, but may share directories above the parent.

**Evaluation activities**

*TSS:*

None.

*Guidance:*

None.

*Tests:*

The evaluator shall run the application and determine where it writes its files. For files where the user does not choose the destination, the evaluator shall check whether the destination directory contains executable files. This varies per platform:

- **Android:** The evaluator shall run the program, mimicking normal usage, and note where all user-modifiable files are written. The evaluator shall ensure that there are no executable files stored under /data/data/*package*/ where *package* is the Java package of the application.
- **Microsoft Windows:** For Windows Universal Applications the evaluator shall consider the requirement met because the platform forces applications to write all data within the application working directory (sandbox). For Windows Desktop Applications the evaluator shall run the program, mimicking normal usage, and note where all user-modifiable files are written. The evaluator shall ensure that there are no executable files stored in the same directories to which the application wrote user-modifiable files.
- **Apple iOS and iPadOS:** The evaluator shall consider the requirement met because the platform forces applications to write all data within the application working directory (sandbox).
- **Linux:** The evaluator shall run the program, mimicking normal usage, and note where all user-modifiable files are written. The evaluator shall ensure that there are no executable files stored in the same directories to which the application wrote user-modifiable files.
- **Oracle Solaris:** The evaluator shall run the program, mimicking normal usage, and note where all user-modifiable files are written. The evaluator shall ensure that there are no executable files stored in the same directories to which the application wrote user-modifiable files.
- **Apple macOS:** The evaluator shall run the program, mimicking normal usage, and note where all user-modifiable files are written. The evaluator shall ensure that there are no executable files stored in the same directories to which the application wrote user-modifiable files.

**FPT_AEX_EXT.1.5**

**Evaluation activities**

*TSS:*

(Conditional: The PE or ELF automated tests fail) The evaluator shall ensure that the TSS describes the stack-based buffer overflow compiler flags.

*Guidance:*

None.

*Tests:*

The evaluator will inspect every native executable included in the TOE to ensure that stack-based buffer overflow protection is present.

- **Microsoft Windows:** Applications that run as Managed Code in the .NET Framework do not require these stack protections. Applications developed in Object Pascal using the Delphi IDE compiled with RangeChecking enabled comply with this element. For other code, the evaluator shall review the TSS and verify that the /GS flag was used during compilation. The evaluator shall run a tool like, BinSkim, that can verify the correct usage of /GS.
- **Test 1:** **For PE**, the evaluator will disassemble each and ensure the following sequence appears:

    

    `mov rcx, QWORD PTR [rsp+(...)]`

    

    `xor rcx, (...)`

    

    `call (...)`
- **Test 2:** **For ELF executables**, the evaluator will ensure that each contains references to the symbol **__stack_chk_fail**.

    

    

    

    If these automated tests fail, the evaluator shall perform the above, conditional TSS activity.

Tools such as [Canary Detector](https://github.com/commoncriteria/canary-detector) may help automate these activities.
