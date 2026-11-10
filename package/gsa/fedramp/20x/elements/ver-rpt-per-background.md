**MUST:** Providers MUST report vulnerability detection and response activity (including persistent verification and validation) to all necessary parties persistently, summarizing ALL activity since the previous report; these reports are FedRAMP Certification Data and are subject to FedRAMP Certification Data Sharing rules.

**Applies to:** Class B, Class C (Providers)

**Audience:** Reporting. These rules apply to reporting related to vulnerability detection and response.

### Schema

```json
{
  "name": "FedRAMP Vulnerability Detail Report (VER-RPT-VDT)",
  "url": "https://fedramp.gov/schemas/fedramp-vulnerability-detail-report-schema-2026-06-24.json"
}
```

## SP 800-53 Rev 5 controls

si-7.2

## Defined terms

- **All Necessary Parties:** All entities whose interests are affected directly by activity related to a specific cloud service offering in the context of FedRAMP Certifications. This always includes FedRAMP and any agency customer who is using the cloud service offering, but may include additional parties depending on agreements made by the cloud service provider (such as consultants or independent assessors). Potential agency customers or third-party cloud service providers should also be included in most cases but this is not a mandatory requirement under FedRAMP because the cloud service provider may choose who they wish to do business with.
- **Certification Data:** The collective information required by FedRAMP for initial and ongoing FedRAMP Certification of a cloud service offering, including the FedRAMP Certification Package.
- **Persistently:** Occurring in a firm, steady way that is repeated over a long period of time in spite of obstacles or difficulties. Persistent activities may vary between actors, may occur irregularly, and may include interruptions or waiting periods between cycles. These attributes of persistent activities should be intentional, understood, and documented; the status of persistent activities will always be known.
- **Validation:** Confirmation through objective evidence that implemented security capabilities and related certification data are suitable for their intended FedRAMP Certification use and support the expected security outcomes for a cloud service offering.
- **Verification:** Confirmation through objective evidence that specified FedRAMP Practices have been fulfilled for a cloud service offering.
- **Vulnerability:** Has the meaning given to "security vulnerability" in 6 USC § 650 (25), which is "any attribute of hardware, software, process, or procedure that could enable or facilitate the defeat of [...] management, operational, and technical controls used to protect against an unauthorized effort to adversely affect the confidentiality, integrity, and availability of an information system or its information." This includes gaps in Rev5 Controls and 20x Key Security Indicators, software vulnerabilities, misconfigurations, exposures, weak credentials, insecure services, and all other such potential weaknesses in protection (intentional or unintentional).
- **Vulnerability Detection:** The systematic process of discovering and identifying security vulnerabilities in information resources through assessment, scanning, threat intelligence, vulnerability disclosure mechanisms, bug bounties, supply chain monitoring, and other capabilities. This process includes the initial discovery of a vulnerability's existence and the determination of affected information resources within a cloud service offering.
- **Vulnerability Response:** The systematic process of tracking, evaluating, mitigating, monitoring, remediating, assessing exploitation, reporting, and otherwise managing detected vulnerabilities.
