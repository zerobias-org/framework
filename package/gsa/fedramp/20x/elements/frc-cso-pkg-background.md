**MUST:** Providers seeking a Certification MUST supply a complete FedRAMP Certification Package to FedRAMP for initial certification; the FedRAMP Certification Package MUST include at least the following information:

**Applies to:** Class A, Class B, Class C (Providers)

**Audience:** General Provider Responsibilities. These rules apply to cloud service providers obtaining and maintaining any FedRAMP Certification.

### Following information

- Information about the Cloud Service Offering following CPO-CSO-OVR (Overview of the Cloud Service Offering)
- Implementation, Validation, and Assessment information for each relevant FedRAMP requirement/control/ksi as defined in SDR-CSO-FRR (FedRAMP Rules)
- A real or example Ongoing Certification Report following CCM-OCR-AVL (Report Availability)

### Related

- CPO-CSO-OVR
- SDR-CSO-FRR
- CCM-OCR-AVL

### Schema

```json
{
  "name": "FedRAMP Certification Package Overview (FRC-CSO-PKG)",
  "url": "https://fedramp.gov/schemas/fedramp-certification-package-overview-schema-2026-06-24.json"
}
```

## Defined terms

- **Certification Package:** Has meaning from 44 USC § 3607 (b)(8) given to "authorization package", which is "the essential information that can be used by an agency to determine whether to authorize the operation of an information system or the use of a designated set of common controls for all cloud computing products and services [certified] by FedRAMP."
- **Cloud Service Offering:** A specific, packaged cloud computing product or service supplied by a cloud service provider for use by customers, that is the subject of a FedRAMP Certification.
- **FedRAMP Certification Report:** A report that is produced by FedRAMP documenting the results of a FedRAMP Certification assessment. This report is typically produced after the initial FedRAMP Certification assessment on the Program Certification Path and updated as necessary during ongoing FedRAMP Certification, but may be produced at any time by FedRAMP as part of ongoing FedRAMP Certification activities for any cloud service offering (such as corrective action). Cloud service offerings must include these reports in their FedRAMP Certification Package.
- **Initial Certification:** The first FedRAMP Certification of a cloud service offering based on the applicable FedRAMP Practices.
- **Ongoing Certification:** The continued FedRAMP Certification of a cloud service offering based on the applicable FedRAMP Practices.
- **Ongoing Certification Report (OCR):** A regular report that is supplied by FedRAMP Certified cloud service providers to agency customers, following FedRAMP Collaborative Continuous Monitoring rules.
- **Security Decision Record (SDR):** A persistently maintained, verified, and validated record of the security decisions made by a provider over the lifecycle of a cloud service offering. The Security Decision Record replaces the traditional System Security Plan and documents how applicable FedRAMP Practices are addressed, including implementation rationale, resulting customer risk, assessment findings, and supporting artifacts.
- **Validation:** Confirmation through objective evidence that implemented security capabilities and related certification data are suitable for their intended FedRAMP Certification use and support the expected security outcomes for a cloud service offering.
