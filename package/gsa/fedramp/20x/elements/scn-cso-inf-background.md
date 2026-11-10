**MUST:** Providers MUST include at least the following information in Significant Change Notifications:

**Applies to:** Class B, Class C (Providers)

**Audience:** General Provider Responsibilities. These rules apply to providers with FedRAMP Certifications of any type.

### Following information

- Service Offering FedRAMP ID
- Assessor Name (if applicable)
- Related Vulnerability (if applicable)
- Significant Change type and explanation of categorization
- Short description of change
- Reason for change
- Summary of customer impact, including changes to services and customer configuration responsibilities
- Plan and timeline for the change, including for the verification, assessment, and/or validation of impacted Key Security Indicators or Rev5 Controls
- Copy of the business or security impact analysis
- Name and title of approver

### Notes

- Structure of the information may vary depending on how the provider tracks this internally.

### Artifacts

- A recent Significant Change Notification or sample Significant Change Notification

### Schema

```json
{
  "name": "FedRAMP Significant Change Notification (SCN-CSO-INF)",
  "url": "https://fedramp.gov/schemas/fedramp-significant-change-notifications-schema-2026-06-24.json"
}
```

## Defined terms

- **Significant Change:** Has the meaning given in NIST SP 800-37 Rev. 2 which is "a change that is likely to substantively affect the security or privacy posture of a system."
- **Validation:** Confirmation through objective evidence that implemented security capabilities and related certification data are suitable for their intended FedRAMP Certification use and support the expected security outcomes for a cloud service offering.
- **Verification:** Confirmation through objective evidence that specified FedRAMP Practices have been fulfilled for a cloud service offering.
- **Vulnerability:** Has the meaning given to "security vulnerability" in 6 USC § 650 (25), which is "any attribute of hardware, software, process, or procedure that could enable or facilitate the defeat of [...] management, operational, and technical controls used to protect against an unauthorized effort to adversely affect the confidentiality, integrity, and availability of an information system or its information." This includes gaps in Rev5 Controls and 20x Key Security Indicators, software vulnerabilities, misconfigurations, exposures, weak credentials, insecure services, and all other such potential weaknesses in protection (intentional or unintentional).
