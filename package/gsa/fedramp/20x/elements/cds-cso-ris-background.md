**MUST:** Providers MUST provide sufficient information in FedRAMP Certification Data to support agency authorization decisions but SHOULD NOT include sensitive information that would likely enable a threat actor to gain unauthorized access, cause harm, disrupt operations, or otherwise have a negative adverse impact on the cloud service offering.

**Applies to:** Class B, Class C (Providers)

**Audience:** General Provider Responsibilities. These rules apply to providers for FedRAMP Certifications of any type.

### Notes

- This is not a license to exclude accurate risk information, but specifics that would likely lead to compromise should be abstracted. A breach of confidentiality with FedRAMP Certification Data should be anticipated by a secure cloud service provider.

### Examples

- id: Tips on sensitive information in FedRAMP Certification Data
- key_tests:
  - Passwords, API keys, access credentials, etc.
  - Excessive detail about methodology that exposes weaknesses
  - Personally identifiable information about employees
- examples:
  - DON'T: "In an emergency, an administrator with physical access to a system can log in using "secretadmin" with the password "pleasewutno""
  - DO: "In an emergency, administrators with physical access can log in directly."
  - DON'T: "All backup MFA credentials are stored in a SuperSafe Series 9000 safe in the CEOs office."
  - DO: "All backup MFA credentials are stored in a UL Class 350 safe in a secure location with limited access."
  - DON'T: "During an incident, the incident response team lead by Jim Smith (555-0505) will open a channel at the conference line (555-0101 #97808 passcode 99731)..."
  - DO: "During an incident, the incident response team will coordinate over secure channels."

## Defined terms

- **Certification Data:** The collective information required by FedRAMP for initial and ongoing FedRAMP Certification of a cloud service offering, including the FedRAMP Certification Package.
- **Cloud Service Offering:** A specific, packaged cloud computing product or service supplied by a cloud service provider for use by customers, that is the subject of a FedRAMP Certification.
- **Likely:** A reasonable degree of probability based on context.
