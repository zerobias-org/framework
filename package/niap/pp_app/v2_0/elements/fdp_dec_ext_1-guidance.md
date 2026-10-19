**FDP_DEC_EXT.1.1**

*Application note:* The intent is for the evaluator to ensure that the selection captures all hardware resources which the application accesses, and that these are restricted to those which are justified. On some platforms, the application must explicitly solicit permission in order to access hardware resources. Seeking such permissions, even if the application does not later make use of the hardware resource, should still be considered access. Selections should be expressed in a manner consistent with how the application expresses its access needs to the underlying platform. For example, the platform may provide location services which implies the potential use of a variety of hardware resources (e.g. satellite receivers, WiFi, cellular radio) yet "*location services*" is the proper selection. This is because use of these resources can be inferred, but also because the actual usage may vary based on the particular platform. Resources that do not need to be explicitly identified are those which are ordinarily used by any application such as central processing units, main memory, displays, input devices (e.g. keyboards, mice), and persistent storage devices provided by the platform.

**Evaluation activities**

*TSS:*

None.

*Guidance:*

The evaluator shall perform the platform-specific actions below and inspect user documentation to determine the application's access to hardware resources. The evaluator shall ensure that this is consistent with the selections indicated. The evaluator shall review documentation provided by the application developer and for each resource which it accesses, identify the justification as to why access is required.

*Tests:*

- **Android:** The evaluator shall verify that each `uses-permission` entry in the AndroidManifest.xml file for access to a hardware resource is reflected in the selection.
- **Microsoft Windows:** For Windows Universal Applications the evaluator shall check the AppxManifest.xml file for a list of required hardware capabilities. The evaluator shall verify that the user is made aware of the required hardware capabilities when the application is first installed. This includes permissions such as ID_CAP_ISV_CAMERA, ID_CAP_LOCATION, ID_CAP_NETWORKING, ID_CAP_MICROPHONE, ID_CAP_PROXIMITY and so on. A complete list of Windows App permissions can be found at:

    

    - [http://msdn.microsoft.com/en-US/library/windows/apps/jj206936.aspx](http://msdn.microsoft.com/en-US/library/windows/apps/jj206936.aspx)

    

    For Windows Desktop Applications the evaluator shall identify in either the application software or its documentation the list of the required hardware resources.
- **Apple iOS and iPadOS:** The evaluator shall verify that either the application or the documentation provides a list of the hardware resources it accesses.
- **Linux:** The evaluator shall verify that either the application software or its documentation provides a list of the hardware resources it accesses.
- **Oracle Solaris:** The evaluator shall verify that either the application software or its documentation provides a list of the hardware resources it accesses.
- **Apple macOS:** The evaluator shall verify that either the application software or its documentation provides a list of the hardware resources it accesses.

**FDP_DEC_EXT.1.2**

*Application note:* "Sensitive information repositories" are defined as those collections of sensitive data that could be expected to be shared among some applications, users, or user roles, but to which not all of these would ordinarily require access.

**Evaluation activities**

*TSS:*

None.

*Guidance:*

The evaluator shall perform the platform-specific actions below and inspect user documentation to determine the application's access to sensitive information repositories. The evaluator shall ensure that this is consistent with the selections indicated. The evaluator shall review documentation provided by the application developer and for each sensitive information repository which it accesses, identify the justification as to why access is required.

*Tests:*

- **Android:** The evaluator shall verify that each `uses-permission` entry in the AndroidManifest.xml file for access to a sensitive information repository is reflected in the selection.
- **Microsoft Windows:** For Windows Universal Applications the evaluator shall check the AppxManifest.xml file for a list of required capabilities. The evaluator shall identify the required information repositories when the application is first installed. This includes permissions such as ID_CAP_CONTACTS,ID_CAP_APPOINTMENTS,ID_CAP_MEDIALIB and so on. A complete list of Windows App permissions can be found at:

    

    - [http://msdn.microsoft.com/en-US/library/windows/apps/jj206936.aspx](http://msdn.microsoft.com/en-US/library/windows/apps/jj206936.aspx)

    

    For Windows Desktop Applications the evaluator shall identify in either the application software or its documentation the list of sensitive information repositories it accesses.
- **Apple iOS and iPadOS:** The evaluator shall verify that either the application software or its documentation provides a list of the sensitive information repositories it accesses.
- **Linux:** The evaluator shall verify that either the application software or its documentation provides a list of sensitive information repositories it accesses.
- **Oracle Solaris:** The evaluator shall verify that either the application software or its documentation provides a list of sensitive information repositories it accesses.
- **Apple macOS:** The evaluator shall verify that either the application software or its documentation provides a list of sensitive information repositories it accesses.
