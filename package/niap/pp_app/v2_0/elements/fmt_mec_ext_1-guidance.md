**FMT_MEC_EXT.1.1**

*Application note:* Configuration options that are stored remotely are not subject to this requirement. Sensitive Data is generally not considered part of configuration options and should be stored according to FDP_DAR_EXT.1 or FCS_STO_EXT.1.

If “**implement functionality to encrypt and store configuration options as defined by FDP_PRT_EXT.1 in the PP-Module for File Encryption**" is selected, the TSF must claim conformance to a PP-Configuration that includes the PP-Module for File Encryption.

**Evaluation activities**

*TSS:*

The evaluator shall review the TSS to identify the application's configuration options (e.g., settings) and determine whether these are stored and set using the mechanisms supported by the platform or implemented by the application in accordance with the PP-Module for File Encryption. At a minimum the TSS shall list settings related to any SFRs and any settings that are mandated in the operational guidance in response to an SFR.

Conditional: If "**implement functionality to encrypt and store configuration options as defined by FDP_PRT_EXT.1 in the PP-Module for File Encryption**" is selected, the evaluator shall ensure that the TSS identifies those options, as well as indicates where the encrypted representation of these options is stored.

*Guidance:*

The evaluator shall verify the guidance documentation contains any information necessary to configure the protection of configuration settings.

*Tests:*

If " **invoke the mechanisms recommended by the platform vendor for storing and setting configuration options**" is selected, the method of testing varies per platform as follows:

- **Android:** The evaluator shall inspect the TSS and verify that it describes what Android API is used (and provides a link to the documentation of the API) when storing configuration data. The evaluator shall run the application and verify that the behavior of the TOE is consistent with where and how the API documentation says the configuration data will be stored.

    

    

    

    For SharedPreferences, the evaluator shall examine the XML file to make sure it reflects the changes made to the configuration to verify that the application used SharedPreferences or PreferenceActivity to store the configuration data. For DataStore, the evaluator shall use a protocol buffer analyzer to examine the file to make sure it reflects the changes made to the configuration to verify that the application used DataStore to store the configuration data.
- **Microsoft Windows:** The evaluator shall determine and verify that Windows Universal Applications use either the Windows.Storage namespace, Windows.UI.ApplicationSettings namespace, or the IsolatedStorageSettings namespace for storing application specific settings. For .NET applications, the evaluator shall determine and verify that the application uses one of the locations listed in [https://docs.microsoft.com/en-us/dotnet/framework/configure-apps/](https://docs.microsoft.com/en-us/dotnet/framework/configure-apps/) or [https://learn.microsoft.com/en-us/previous-versions/dotnet/netframework-4.0/zzdt0e7f(v=vs.100)](https://learn.microsoft.com/en-us/previous-versions/dotnet/netframework-4.0/zzdt0e7f(v=vs.100)) or [https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration/](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration/) or [https://learn.microsoft.com/en-us/aspnet/core/host-and-deploy/iis/web-config](https://learn.microsoft.com/en-us/aspnet/core/host-and-deploy/iis/web-config) for storing application specific (whether application-wide or user-specific) settings.

    

    

    

    For Classic Desktop applications, the evaluator shall run the application while monitoring it with the SysInternals tool Process Monitor and make changes to its configuration. The evaluator shall verify that Process Monitor logs show corresponding changes to the the Windows Registry or C:\ProgramData\ directory.
- **Apple iOS and iPadOS:** The evaluator shall verify that the app uses the `user defaults system` or `key-value store` for storing all settings.
- **Linux:** The evaluator shall run the application while monitoring it with the utility strace. The evaluator shall make security-related changes to its configuration. The evaluator shall verify that strace logs corresponding changes to configuration files that reside in /etc (for system-specific configuration), in the user's home directory (for user-specific configuration), or /var/lib/ (for configurations controlled by UI and not intended to be directly modified by an administrator).
- **Oracle Solaris:** The evaluator shall run the application while monitoring it with the utility dtrace. The evaluator shall make security-related changes to its configuration. The evaluator shall verify that dtrace logs corresponding changes to configuration files that reside in /etc (for system-specific configuration) or in the user's home directory (for user-specific configuration).
- **Apple macOS:** The evaluator shall verify that the application stores and retrieves settings using the `NSUserDefaults` class.

If " **implement functionality to encrypt and store configuration options as defined by FDP_PRT_EXT.1 in the PP-Module for File Encryption**" is selected, for all configuration options listed in the TSS as being stored and protected using encryption, the evaluator shall examine the contents of the configuration option storage (identified in the TSS) to determine that the options have been encrypted.
