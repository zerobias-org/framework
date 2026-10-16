Assessment is required when: Software or device attestations are required or received.

Software and device attestations can augment the establishment of identifiers and cryptographic keys, especially in dynamic and distributed systems. Attestations in this usage are cryptographically bound statements that a particular piece of software, device, or runtime system meets a set of agreed-upon parameters. The attestation is presented by the software in the context of establishing the identity of the software, device, or system with which the receiver is interacting. The attestation allows the receiver to verify the request with a higher degree of certainty than they would be able to otherwise.

**Assessment objective**

Determine whether the receiver validates software or device attestations received as part of the federation protocol.

**Assessment methods**

- EXAMINE: Examine trust agreement artifact(s) to identify whether software or device attestations are required and, if so, the validation criteria. Examine system documentation and configurations to verify that attestation validation is implemented.
- TEST: Test by (1) presenting a valid attestation and verifying that it is accepted; (2) presenting an invalid attestation and verifying that it is rejected; and (3) presenting an assertion that is missing a required attestation and verifying that it is rejected.
