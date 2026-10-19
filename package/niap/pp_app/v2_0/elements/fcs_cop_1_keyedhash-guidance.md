**FCS_COP.1.1/KeyedHash**

*Application note:* This is dependent on implementing cryptographic functionality, as in FTP_DIT_EXT.1.

The intent of this requirement is to specify the keyed-hash message authentication function used for key establishment purposes for the various cryptographic protocols used by the application (e.g., trusted channel). The hash selection must support the message digest size selection.

**Evaluation activities**

*TSS:*

None.

*Guidance:*

The evaluator shall verify the guidance documentation contains any information required for configuring the algorithm or size.

*Tests:*

For each of the supported parameter sets, the evaluator shall compose 15 sets of test data. Each set shall consist of a key and message data. The evaluator shall have the TSF generate HMAC tags for these sets of test data. The resulting MAC tags shall be compared to the result of generating HMAC tags with the same key and IV using a known-good implementation.
