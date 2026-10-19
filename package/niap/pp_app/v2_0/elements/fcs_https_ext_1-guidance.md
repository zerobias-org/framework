**FCS_HTTPS_EXT.1.1**

**Evaluation activities**

*TSS:*

The evaluator shall examine the TSS to verify that it describes the TSF's HTTPS implementation as a client, server, or both, and that if the TSF implements an HTTPS server, whether this supports mutual authentication. Additionally, the evaluator shall examine the TSS to verify that it includes enough detail is provided to explain how the implementation complies with RFC 2818.

*Guidance:*

The evaluator shall review the operational guidance to ensure that it includes any information necessary for configuring HTTPS in alignment with RFC 2818, or whether this is the default behavior of the TOE.

*Tests:*

- **Test 1:** Conditional: If the TOE implements HTTPS as a client, for each HTTPS client interface, the evaluator shall attempt to establish an HTTPS connection from the TOE to an external server, observe the traffic with a packet analyzer, and verify that the connection succeeds and that the traffic is identified as TLS or HTTPS.
- **Test 2:** Conditional: If the TOE implements HTTPS as a server, for each HTTPS server interface, the evaluator shall attempt to establish an HTTPS connection to the TOE using a client, observe the traffic with a packet analyzer, and verify that the connection succeeds and that the traffic is identified as TLS or HTTPS.

**FCS_HTTPS_EXT.1.2**

*Application note:* This SFR is claimed when FTP_DIT_EXT.1 specfiies the TOE's use of HTTPS as a trusted protocol. If the TSF implements HTTPS as a client, or if it implements HTTPS as a server with mutual authenticaiton, then FCS_HTTPS_EXT.2 must be claimed to specify the TSF's behavior when presented with an invalid peer certificate.
