**MUST:** Providers MUST create, maintain, and make available recommendations for securely configuring their cloud services (the Secure Configuration Guide) that includes at least the following information:

**Applies to:** Class B, Class C (Providers)

**Audience:** General Provider Responsibilities. These rules apply to providers with FedRAMP Certifications of any type.

### Following information

- Required: Instructions on how to securely access, configure, operate, and decommission top-level administrative accounts that control enterprise access to the entire cloud service offering.
- Required: Explanations of security-related settings that can be operated only by top-level administrative accounts and their security implications.
- Recommended: Explanations of security-related settings that can be operated only by privileged accounts and their security implications.

### Notes

- These rules refer to this guidance as a Secure Configuration Guide but cloud service providers may make this guidance available in various appropriate forms that provide the best customer experience.
- This guidance should explain how top-level administrative accounts and privileged accounts are named and referred to in the cloud service offering.

### Artifacts

- URL to the human-readable data.
- URL to the machine-readable data.

### Schema

```json
{
  "name": "FedRAMP Certification Package Overview (FRC-CSO-PKG)",
  "url": "https://fedramp.gov/schemas/fedramp-certification-package-overview-schema-2026-06-24.json"
}
```

## SP 800-53 Rev 5 controls

cm-7

## Defined terms

- **Cloud Service Offering:** A specific, packaged cloud computing product or service supplied by a cloud service provider for use by customers, that is the subject of a FedRAMP Certification.
- **Privileged Account:** An account with elevated privileges that enables administrative functions over some aspect of the cloud service offering that may affect the confidentiality, integrity, or availability of information beyond those given to normal users; levels of privilege may vary wildly.
- **Top-Level Administrative Account:** The most privileged account with the highest level of access within a cloud service offering for a customer organization, typically with complete control over all aspects of the cloud service offering, including managing resources, users, access, privileges, and the account itself.
