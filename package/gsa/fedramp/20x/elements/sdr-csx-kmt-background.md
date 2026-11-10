FedRAMP states this requirement separately for each class; see the class sections below.

**Applies to:** Class B, Class C (Providers)

**Audience:** 20x-Specific Provider Responsibilities. These rules apply to providers for FedRAMP 20x Certifications.

### Notes

- For initial FedRAMP Certification, providers will need to have mechanisms in place and agree to meet this requirement in the event the cloud service has not been operating with related metrics available for the required period prior to applying for initial certification.

### Schema

```json
{
  "name": "FedRAMP Security Decision Record Schema",
  "url": "https://fedramp.gov/schemas/fedramp-security-decision-record-schema-2026-06-24.json"
}
```

## Class B

**SHOULD:** Providers with 20x Class B Certifications SHOULD also include historical metrics in their Security Decision Record, supplying at least the following information for each applicable Key Security Indicator:

### Following information

- Summary of each metric over the past 30 days
- Summary of metric up to the past year (where available)

## Class C

**MUST:** Providers with 20x Class C Certifications MUST also include historical metrics in their Security Decision Record, supplying at least the following information for each applicable Key Security Indicator:

### Following information

- Summary of each metric over the past 30 days
- Summary of metric up to the past year (where available)
- All daily metric data (including status of persistent validation) up to the past year (where available)

## Defined terms

- **Initial Certification:** The first FedRAMP Certification of a cloud service offering based on the applicable FedRAMP Practices.
- **Security Decision Record (SDR):** A persistently maintained, verified, and validated record of the security decisions made by a provider over the lifecycle of a cloud service offering. The Security Decision Record replaces the traditional System Security Plan and documents how applicable FedRAMP Practices are addressed, including implementation rationale, resulting customer risk, assessment findings, and supporting artifacts.
