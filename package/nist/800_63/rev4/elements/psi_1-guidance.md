This control is the umbrella requirement for protecting IdP-RP communication. Most IdP-RP communication scenarios have dedicated controls with specific assessment procedures. This control catches any communication pathways that fall outside those dedicated controls. If all IdP-RP communications are covered by the specific controls listed in the assessment method, step (3) will have no additional items to assess, and the assessor should document that.

**Assessment objective**

Determine whether all communications between the IdP and RP are protected in transit using an authenticated protected channel.

**Assessment methods**

- EXAMINE: Examine documentation that reveals the functions for which the IdP and RP communicate (e.g., assertion exchange, provisioning API, key retrieval, dynamic registration), and list those functions. For communications covered by specific controls (BCP-8, DR-2, DYR-1, ICKM-2, CKR-2, PAPI-3), assess or verify assessment of each applicable control. For any IdP-RP communications not covered by a specific control, verify that the communication is configured to use an authenticated protected channel.
