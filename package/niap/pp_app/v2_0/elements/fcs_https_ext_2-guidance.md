**FCS_HTTPS_EXT.2.1**

*Application note:* This SFR is claimed when the TOE implements HTTPS as a client, or when the TOE implements HTTPS as a server with support for mutual authentication.

**Evaluation activities**

*TSS:*

The evaluator shall verify that the TSS describes the TOE's behavior when an invalid peer certificate is presented to it during establishment of an HTTPS connection.

*Guidance:*

If the TOE's response to being presented with an invalid certificate is configurable, the evaluator shall verify that the operational guidance includes instructions for configuring this behavior and what the configurable options are. If this includes configuration to a permissive setting where an invalid certificate may be accepted without administrator intervention, the evaluator shall verify that the operational guidance includes sufficient warning of the potential security risks of applying this setting.

*Tests:*

The evaluator shall attempt to establish an HTTPS connection using the TOE, present an invalid peer certificate, and verify that the TSF behaves in the manner specified in the TSF in response. If this behavior is configurable, the evaluator shall iterate this test as necessary to exercise each configuration option and verify that the TSF behaves in the configured manner.

Other tests are performed in conjunction withthe Functional Package for Transport Layer Security (TLS), version 2.1 and the [Functional Package for X.509](https://www.niap-ccevs.org/protectionprofiles/511).
