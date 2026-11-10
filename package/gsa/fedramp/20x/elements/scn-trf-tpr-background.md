**SHOULD:** Providers SHOULD engage a third-party assessor to review the scope and impact of the planned change before starting transformative changes if human validation is necessary; such reviews SHOULD be limited to security decisions that require human validation.

**Applies to:** Class B, Class C (Providers)

**Audience:** Transformative Changes. These rules apply to all transformative significant changes.

### Notes

- Activities that match the transformative significant change type are rare for a cloud service offering, adjusted for the size, scale, and complexity of the service. Small cloud service offerings may go years without transformative changes, while hyperscale providers may release multiple transformative changes per year.

### Examples

- id: Tips on transformative changes
- key_tests:
  - Alters the service risk profile or require new or significantly different actions to address customer responsibilities
  - Requires significant new design, development and testing with discrete associated project planning, budget, marketing, etc.
  - Requires extensive updates to security assessments, documentation, and how a large number of security requirements are met and validated
- examples:
  - The addition, removal, or replacement of a critical third party service that handles a significant portion of information (e.g., IaaS change)
  - Increasing the security categorization of a service within the offering that actively handles federal customer data (does NOT include impact change of entire offering - see FedRAMP Certification class change)
  - Replacement of underlying management planes or paradigm shift in workload orchestration (e.g., bare-metal servers or virtual machines to containers, migration to kubernetes)
  - Datacenter migration where large amounts of federal customer data is moved across boundaries different from normal day-to-day operations
  - Adding a new AI-based capability that impacts federal customer data in a different way than existing services or capabilities (such as integrating a new third-party service or training on federal customer data)

### Artifacts

- Third Party assesment report OR explanation why a third party assessor was not engaged

## Defined terms

- **Cloud Service Offering:** A specific, packaged cloud computing product or service supplied by a cloud service provider for use by customers, that is the subject of a FedRAMP Certification.
- **Significant Change:** Has the meaning given in NIST SP 800-37 Rev. 2 which is "a change that is likely to substantively affect the security or privacy posture of a system."
- **Transformative Change:** The type of significant change that introduces substantive potential security risks that are likely to affect existing risk determinations and must be assessed in depth.
- **Validation:** Confirmation through objective evidence that implemented security capabilities and related certification data are suitable for their intended FedRAMP Certification use and support the expected security outcomes for a cloud service offering.
