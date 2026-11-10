**MUST:** Providers MUST notify all necessary parties within 10 business days after finishing adaptive changes, also including the following information:

**Applies to:** Class B, Class C (Providers)

**Audience:** Adaptive Changes. These rules apply to all adaptive significant changes.

**Timeframe:** 10 bizdays

### Following information

- Summary of any new risks identified and/or vulnerabilities resulting from the change (if applicable)

### Notes

- Activities that match the adaptive significant change type are a frequent and normal part of iteratively improving a service by deploying new functionality or modifying existing functionality in a way that is typically transparent to customers and does not introduce significant new security risks.
- In general, most changes that do not happen regularly will be adaptive changes. This change type deliberately covers a wide range of activities in a way that requires assessment and consideration.

### Examples

- id: Tips on adaptive changes
- key_tests:
  - Requires minimal changes to security plans or procedures
  - Requires some careful planning and project management to implement, but does not rise to the level of planning required for transformative changes
  - Requires verification of existing functionality and secure configuration after implementation
- examples:
  - Updates to operating systems, containers, virtual machines, software or libraries with known breaking changes, complex steps, or service disruption
  - Deploying larger than normal incremental feature improvements in code or libraries that are the work of multiple weeks of development efforts but are not considered a major new service
  - Changing cryptographic modules where the new module meets the same standards and characteristics of the former
  - Replacing a like-for-like component where some security plan or procedure adjustments are required (e.g., scanning tool or managed database swap)
  - Adding models to existing approved AI services without exposing federal customer data to new services

### Notification

- party: All Necessary Parties
- method: update
- target: FedRAMP Certification Data
- name: FedRAMP Certification Data

### Artifacts

- At least the most recent SCN notification including the date it was sent and the date the change was applied. Additional examples may be provided. If no SCN notifications have been sent then this artifact is not required.

## Defined terms

- **Adaptive Change:** A type of significant change that does not routinely recur and does not introduce substantive potential security risks that need to be assessed in depth.
- **All Necessary Parties:** All entities whose interests are affected directly by activity related to a specific cloud service offering in the context of FedRAMP Certifications. This always includes FedRAMP and any agency customer who is using the cloud service offering, but may include additional parties depending on agreements made by the cloud service provider (such as consultants or independent assessors). Potential agency customers or third-party cloud service providers should also be included in most cases but this is not a mandatory requirement under FedRAMP because the cloud service provider may choose who they wish to do business with.
- **Regularly:** Performing the activity on a consistent, predictable, and repeated basis, at set intervals, automatically if possible, following a documented plan. These intervals may vary as appropriate between different activities.
- **Significant Change:** Has the meaning given in NIST SP 800-37 Rev. 2 which is "a change that is likely to substantively affect the security or privacy posture of a system."
- **Vulnerability:** Has the meaning given to "security vulnerability" in 6 USC § 650 (25), which is "any attribute of hardware, software, process, or procedure that could enable or facilitate the defeat of [...] management, operational, and technical controls used to protect against an unauthorized effort to adversely affect the confidentiality, integrity, and availability of an information system or its information." This includes gaps in Rev5 Controls and 20x Key Security Indicators, software vulnerabilities, misconfigurations, exposures, weak credentials, insecure services, and all other such potential weaknesses in protection (intentional or unintentional).
