**FTP_DIT_EXT.1.1**

*Application note:* Encryption is not required for applications transmitting data that is not sensitive.

If "**not transmit any...**" is selected, no other option can be selected.

If "**not transmit any...**" is NOT selected, it is possible to select more than one of the other options to encrypt data for a specific cryptographic function (e.g., application encrypts management data using SSH AND application invokes platform-provided functionality to encrypt syslog data using TLS OR application encrypts syslog data using TLS. Protocol selections and function assignments should be made to cover all data/sensitive data.

If "**encrypt all transmitted...**" is selected and "**TLS**" or "**DTLS**" as a client or server is selected, then corresponding components fromFunctional Package for Transport Layer Security (TLS), version 2.1 must be selected.

If "**encrypt all transmitted...**" is selected and any claim involving HTTPS is selected, then FCS_HTTPS_EXT.1 and potentially FCS_HTTPS_EXT.2 is required, as indicated by the chosen selections.

If "**encrypt all transmitted...**" is selected and "**SSH**" is selected, then the TSF shall be validated against the [Functional Package for Secure Shell](https://www.niap-ccevs.org/protectionprofiles/459).

If "**encrypt all transmitted...**" is selected and "**IPsec**" is selected, then the TSF must claim conformance to a *PP-Configuration that includes the VPN Client PP-Module, version 3.0.*

If "**encrypt all transmitted...**" is selected, FCS_CKM.2 and all iterations of FCS_COP.1 must be claimed.

Claims from the [Functional Package for X.509](https://www.niap-ccevs.org/protectionprofiles/511) are only required to the extent that they are needed to support the functionality required by the trusted protocols that are claimed. For example, if the TOE supports HTTPS as a server but does not support mutual authentication, then for this interface the TSF would only present certificates in accordance with the requirements of the package and not validate presented certificates.

If the TSF implements a protocol that requires the validation of a certificate presented by an external entity, FIA_X509_EXT.1 and FIA_X509_EXT.2 will be claimed. FIA_TSM_EXT.1 may also be claimed if the TSF implements its own trust store. Note that FIA_X509_EXT.1 and FIA_X509_EXT.2 have selections for invocation of platform-provided functionality, so it is expected that these claims are made and tested even when the trusted protocol is implemented by the TOE platform.

If the TSF implements a protocol that requires the presentation of any certificates to an external entity, FIA_XCU_EXT.2 from [Functional Package for X.509](https://www.niap-ccevs.org/protectionprofiles/511) will be claimed. FIA_X509_EXT.3 from [Functional Package for X.509](https://www.niap-ccevs.org/protectionprofiles/511) will also be claimed, along with any applicable dependencies, depending on how the certificates presented by the TOE are obtained.

If the TSF implements a protocol that does not require presenting or validating X.509 certificates, no claims from the [Functional Package for X.509](https://www.niap-ccevs.org/protectionprofiles/511) are required.

**Evaluation activities**

*TSS:*

The evaluator shall confirm the TSS describes the data transmitted, and verify it matches the selections of all *data* or *sensitive data*.

The evaluator shall confirm the TSS describes the method by which the data is protected and that is matches the chosen selections, if multiple selections are included the evaluator shall verify the TSS describes which data is sent over which trusted channels and the totality of the data type selection is covered by all chosen selections.

For platform-provided functionality, the evaluator shall verify the TSS contains the calls to the platform that the TOE is leveraging to invoke the functionality. The evaluator shall verify calls are documented by the platform vendor and non-deprecated.

For platform-provided HTTPS, IPsec, TLS, or DTLS as a client the evaluator shall verify that the TSS lists any specific calls the product uses that specifies or allows the end users to specify cipher suites, support for mutual authentication, support for session renegotiation, hash algorithms for the signature_algorithms extension in the Client Hello with the supported_signature_algorithms value, and the supported groups in the Supported Groups Extension in Client Hello. The evaluator shall verify any calls the product specifies align with the options provided in this PP and theFunctional Package for Transport Layer Security (TLS), version 2.1.

For platform-provided HTTPS, IPsec, TLS, or DTLS as a server the evaluator shall verify that the TSS lists any specific calls the product uses that specifies or allows the end users to specify cipher suites, which protocols are denied connection requests, key establishment algorithms, support for mutual authentication, response to an invalid client certificate, and support for session renegotiation. The evaluator shall verify any calls the product specifies align with the options provided in this PP and theFunctional Package for Transport Layer Security (TLS), version 2.1.

For platform-provided HTTPS the evaluator shall verify that the TSS lists any specific calls the product uses that specifies or allows the end users to specify the response to an invalid certificate.

For platform-provided HTTPS as a server the evaluator shall verify that the TSS lists any specific calls the product uses that specifies or allows the end users to specify cipher suites, which protocols are denied connection requests, key establishment algorithms, support for mutual authentication, response to an invalid client certificate, and support for session renegotiation. The evaluator shall verify any calls the product specifies align with the options provided in this PP and theFunctional Package for Transport Layer Security (TLS), version 2.1.

For platform-provided SSH the evaluator shall verify that the TSS lists any specific calls the product uses that specifies or allows the end users to specify the applicable RFCs, the authentication methods, the limit for dropping large packets in an SSH transport connection, the SSH transport accepted algorithms, the SSH public key for public-key based authentication, The diffie-hellman-group used for key exchange, and the parameters of session rekey or termination. The evaluator shall verify any calls the product specifies align with the options provided in this PP and the Functional Package for Secure Shell (SSH), version 2.0.

*Guidance:*

The evaluator shall confirm the guidance documentation contains any information necessary for enabling and configuring the trusted channels that have been selected.

*Tests:*

The evaluator shall perform the following tests.

- **Test 1:** If "**not transmit any data**" is selected, the evaluator shall exercise each of the TOE's identified functions, while observing the network traffic from the device and verify that no TSF initiated connections were observed during the attempts.
- **Test 2:** The evaluator shall exercise the application (attempting to transmit data; for example by connecting to remote systems or websites) while capturing packets from the application. The evaluator shall verify from the packet capture that the traffic is encrypted with HTTPS, TLS, DTLS, SSH, or IPsec in accordance with the selection in the ST.
- **Test 3:** The evaluator shall exercise the application (attempting to transmit data; for example by connecting to remote systems or websites) while capturing packets from the application. The evaluator shall review the packet capture and verify that no sensitive data is transmitted in the clear.
- **Test 4:** The evaluator shall inspect the TSS to determine if user credentials are transmitted. If credentials are transmitted the evaluator shall set the credential to a known value. The evaluator shall capture packets from the application while causing credentials to be transmitted as described in the TSS. The evaluator shall perform a string search of the captured network packets and verify that the plaintext credential previously set by the evaluator is not found.
- **Android:** If "**not transmit any data**" is selected, the evaluator shall ensure that the application's AndroidManifest.xml file does not contain a uses-permission or uses-permission-sdk-23 tag containing android:name="android.permission.INTERNET". In this case, it is not necessary to perform the above Tests 1, 2, 3, or 4 as the platform will not allow the application to perform any network communication.
- **Apple iOS and iPadOS:** If "**encrypt all transmitted data**" is selected, the evaluator shall ensure that the application's Info.plist file does not contain the NSAllowsArbitraryLoads or NSExceptionAllowsInsecureHTTPLoads keys, as these keys disable iOS's Application Transport Security feature.
