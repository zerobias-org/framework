Assessment is required when: The subscriber is the authorized party.

All information disclosed to the subscriber needs to be conveyed in a manner that is understandable and actionable, as discussed in Sec. 8.

**Assessment objective**

Determine whether the subscriber is informed of the requested attributes, their purpose, and the RP's storage policy prior to making the runtime attribute-release decision.

**Assessment methods**

- TEST: Test by initiating a federation transaction that triggers a runtime decision, as a test subscriber. Before making the attribute-release decision as the subscriber, verify that the following disclosures are presented to the subscriber across the IdP's and RP's combined interfaces: (1) the attributes the RP is requesting (see also IDPRD-3); (2) the purpose of the requested attributes; and (3) the RP's attribute storage policy, including deletion options. For each disclosure, record whether it was presented by the IdP, the RP, or both. If any disclosure is absent from both, the control is not satisfied. For RPs, repeat this test for each IdP (or wallet) supported by the RP. For IdPs, repeat this test for a representative sample of RPs that use the IdP.
