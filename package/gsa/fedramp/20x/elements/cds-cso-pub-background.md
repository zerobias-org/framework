**MUST:** Providers MUST publicly share up-to-date information about the cloud service offering in both human-readable and JSON formats, including at least the following information that is available and applicable:

**Applies to:** Class B, Class C (Providers)

**Audience:** General Provider Responsibilities. These rules apply to providers for FedRAMP Certifications of any type.

### Following information

- FedRAMP ID
- Service Model
- Deployment Model
- Business Category
- UEI Number
- Sales Contact Information
- Security Contact Information
- Product Website Link
- Link to Product Logo (must be a valid image link, properly named, that will display in a browser without processing - transparent PNG preferred)
- Overall Service Description
- Detailed list of specific services and their security categories (see CDS-CSO-SVC (Public Service List) (Service List))
- Link to Secure Configuration Guidance
- Overview of documentation supplied by the provider for the cloud service offering
- Link to Trust Center landing page that includes instructions on accessing information in the trust center
- Next Ongoing Certification Report date (see CCM-OCR-NRD (Next Report Date))
- Current FedRAMP Recognized independent assessment service

### Notes

- Generally, this information should be available on a public webpage or publicly shared in a FedRAMP-compatible trust center.
- The JSON data for this rule will be consumed by FedRAMP and agency GRC tools using automation with web-based tools. Do not expect FedRAMP or your customers to download this data directly, it should be accessible for common web frameworks. FedRAMP strongly recommends that application engineering experts be involved in making public JSON data and the related information available in a way that can work with web-based applications.

### Artifacts

- URL to the human-readable data.
- URL to the machine-readable data.

### Related

- CDS-CSO-SVC
- CCM-OCR-NRD

### Schema

```json
{
  "name": "FedRAMP Certification Package Overview (FRC-CSO-PKG)",
  "url": "https://fedramp.gov/schemas/fedramp-certification-package-overview-schema-2026-06-24.json"
}
```

## Defined terms

- **Cloud Service Offering:** A specific, packaged cloud computing product or service supplied by a cloud service provider for use by customers, that is the subject of a FedRAMP Certification.
- **FedRAMP Certification Report:** A report that is produced by FedRAMP documenting the results of a FedRAMP Certification assessment. This report is typically produced after the initial FedRAMP Certification assessment on the Program Certification Path and updated as necessary during ongoing FedRAMP Certification, but may be produced at any time by FedRAMP as part of ongoing FedRAMP Certification activities for any cloud service offering (such as corrective action). Cloud service offerings must include these reports in their FedRAMP Certification Package.
- **FedRAMP Recognized:** The status of independent assessment services that are recognized by FedRAMP to perform assessment activities on behalf of FedRAMP for cloud service offerings seeking to obtain or maintain FedRAMP Certification.
- **Ongoing Certification:** The continued FedRAMP Certification of a cloud service offering based on the applicable FedRAMP Practices.
- **Ongoing Certification Report (OCR):** A regular report that is supplied by FedRAMP Certified cloud service providers to agency customers, following FedRAMP Collaborative Continuous Monitoring rules.
- **Security Category:** Has the meaning from NIST FIPS 199, which is "The characterization of information or an information system based on an assessment of the potential impact that a loss of confidentiality, integrity, or availability of such information or information system would have on organizational operations, organizational assets, or individuals." Security categories are often referred to as "impact levels" and include Low, Moderate, and High.
- **Trust Center:** A secure repository or service used by cloud service providers to store and share FedRAMP Certification Data. Trust centers are the complete and definitive source for FedRAMP Certification Data and must follow the FedRAMP Certification Data Sharing rules to be FedRAMP-compatible.
