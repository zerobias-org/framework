**MUST:** Providers MUST use a FedRAMP-compatible trust center to store and share FedRAMP Certification Data with all necessary parties.

**Applies to:** Class B, Class C (Providers)

**Audience:** General Provider Responsibilities. These rules apply to providers for FedRAMP Certifications of any type.

### Notes

- Rules for FedRAMP-Compatible Trust Centers are explained in the Certification Data Sharing Rules under the FedRAMP-Compatible Trust Centers section (id: CDS-TRC).

### Schema

```json
{
  "name": "FedRAMP Certification Package Overview (FRC-CSO-PKG)",
  "url": "https://fedramp.gov/schemas/fedramp-certification-package-overview-schema-2026-06-24.json"
}
```

## Defined terms

- **All Necessary Parties:** All entities whose interests are affected directly by activity related to a specific cloud service offering in the context of FedRAMP Certifications. This always includes FedRAMP and any agency customer who is using the cloud service offering, but may include additional parties depending on agreements made by the cloud service provider (such as consultants or independent assessors). Potential agency customers or third-party cloud service providers should also be included in most cases but this is not a mandatory requirement under FedRAMP because the cloud service provider may choose who they wish to do business with.
- **Certification Data:** The collective information required by FedRAMP for initial and ongoing FedRAMP Certification of a cloud service offering, including the FedRAMP Certification Package.
- **Trust Center:** A secure repository or service used by cloud service providers to store and share FedRAMP Certification Data. Trust centers are the complete and definitive source for FedRAMP Certification Data and must follow the FedRAMP Certification Data Sharing rules to be FedRAMP-compatible.
