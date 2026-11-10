**MUST:** Providers MUST supply an Ongoing Certification Report to all necessary parties every 3 months, covering the entire period since the previous summary, in a consistent format that is human readable; this report MUST include high-level summaries of at least the following information (if applicable):

**Applies to:** Class B, Class C (Providers)

**Audience:** Ongoing Certification Reports. These rules for Ongoing Certification Reports apply to providers with any type of FedRAMP Certification.

**Timeframe:** 3 months

### Following information

- Changes to FedRAMP Certification Data
- Planned changes to FedRAMP Certification Data during at least the next 3 months
- Accepted vulnerabilities
- Transformative changes
- Updated recommendations or best practices for security, configuration, usage, or similar aspects of the cloud service offering
- A list of all agencies that are directly using the product
- FedRAMP Reportable Incidents or an attestation that no such incidents occurred
- Lessons learned and changes planned or made as a result of FedRAMP Reportable Incidents (if such occurred)

### Artifacts

- Most recent Ongoing Certification Report. If the report is not available, the provider MUST provide a sample report that includes all required information.
- How the report will be delivered

### Schema

```json
{
  "name": "FedRAMP Ongoing Certification Report (CCM-OCR-AVL)",
  "url": "https://fedramp.gov/schemas/fedramp-ongoing-certification-report-schema-2026-06-24.json"
}
```

## SP 800-53 Rev 5 controls

ca-7

## Defined terms

- **Accepted Vulnerability:** A vulnerability that the provider does not intend to fully mitigate or remediate, OR that has not or will not be fully mitigated or remediated within the maximum overdue period in FedRAMP Vulnerability Detection and Response rules.
- **All Necessary Parties:** All entities whose interests are affected directly by activity related to a specific cloud service offering in the context of FedRAMP Certifications. This always includes FedRAMP and any agency customer who is using the cloud service offering, but may include additional parties depending on agreements made by the cloud service provider (such as consultants or independent assessors). Potential agency customers or third-party cloud service providers should also be included in most cases but this is not a mandatory requirement under FedRAMP because the cloud service provider may choose who they wish to do business with.
- **Certification Data:** The collective information required by FedRAMP for initial and ongoing FedRAMP Certification of a cloud service offering, including the FedRAMP Certification Package.
- **Cloud Service Offering:** A specific, packaged cloud computing product or service supplied by a cloud service provider for use by customers, that is the subject of a FedRAMP Certification.
- **FedRAMP Certification Report:** A report that is produced by FedRAMP documenting the results of a FedRAMP Certification assessment. This report is typically produced after the initial FedRAMP Certification assessment on the Program Certification Path and updated as necessary during ongoing FedRAMP Certification, but may be produced at any time by FedRAMP as part of ongoing FedRAMP Certification activities for any cloud service offering (such as corrective action). Cloud service offerings must include these reports in their FedRAMP Certification Package.
- **FedRAMP Reportable Incident:** An incident that affects the confidentiality or integrity of federal customer data or is likely to affect the confidentiality or integrity of federal customer data.
- **Incident:** Has the meaning given in 44 USC § 3552 (b)(2) which is "an occurrence that (A) actually or imminently jeopardizes, without lawful authority, the integrity, confidentiality, or availability of information or an information system; or (B) constitutes a violation or imminent threat of violation of law, security policies, security procedures, or acceptable use policies."
- **Ongoing Certification:** The continued FedRAMP Certification of a cloud service offering based on the applicable FedRAMP Practices.
- **Ongoing Certification Report (OCR):** A regular report that is supplied by FedRAMP Certified cloud service providers to agency customers, following FedRAMP Collaborative Continuous Monitoring rules.
- **Transformative Change:** The type of significant change that introduces substantive potential security risks that are likely to affect existing risk determinations and must be assessed in depth.
- **Vulnerability:** Has the meaning given to "security vulnerability" in 6 USC § 650 (25), which is "any attribute of hardware, software, process, or procedure that could enable or facilitate the defeat of [...] management, operational, and technical controls used to protect against an unauthorized effort to adversely affect the confidentiality, integrity, and availability of an information system or its information." This includes gaps in Rev5 Controls and 20x Key Security Indicators, software vulnerabilities, misconfigurations, exposures, weak credentials, insecure services, and all other such potential weaknesses in protection (intentional or unintentional).
