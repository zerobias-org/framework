**MUST:** Providers MUST supply a Security Decision Record, in both human-readable and JSON formats, that includes at least all of the following information for each applicable FedRAMP rule:

**Applies to:** Class B, Class C (Providers)

**Audience:** General Provider Responsibilities. These rules apply to providers for FedRAMP Certifications of any type.

### Following information

- Explanation of how the rule is followed, or an explanation of the reason and resulting risk to customers for not following the rule.
- Verification that the implementation is appropriate for the rule, or that the reason for not implementing is accepted by a senior official.
- Validation that the implementation is in place and working as intended, or that the reason for not implementing is accepted by a senior official.
- Independent verification.
- Independent validation.
- Any responses or clarifications to the comments in the independent verification or validation.
- Rule-specific artifacts (if applicable).

### Schema

```json
{
  "name": "FedRAMP Security Decision Record Schema",
  "url": "https://fedramp.gov/schemas/fedramp-security-decision-record-schema-2026-06-24.json"
}
```

## Defined terms

- **Artifacts:** Security-related materials that supply information regarding or evidence of functions, policies, decisions, procedures, operations, or other such activities, for the purposes of obtaining and maintaining a FedRAMP Certification. All such artifacts are considered FedRAMP Certification Data and are included in the FedRAMP Certification Package.
- **Security Decision Record (SDR):** A persistently maintained, verified, and validated record of the security decisions made by a provider over the lifecycle of a cloud service offering. The Security Decision Record replaces the traditional System Security Plan and documents how applicable FedRAMP Practices are addressed, including implementation rationale, resulting customer risk, assessment findings, and supporting artifacts.
- **Validation:** Confirmation through objective evidence that implemented security capabilities and related certification data are suitable for their intended FedRAMP Certification use and support the expected security outcomes for a cloud service offering.
- **Verification:** Confirmation through objective evidence that specified FedRAMP Practices have been fulfilled for a cloud service offering.
