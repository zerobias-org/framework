**MUST:** Providers MUST evaluate all potential significant changes to determine the type of significant change and follow the appropriate Significant Change Notification rules.

**Applies to:** Class B, Class C (Providers)

**Audience:** General Provider Responsibilities. These rules apply to providers with FedRAMP Certifications of any type.

### Following information

- Is it a significant change? --> Continue evaluation and follow the Significant Change Notification rules.
- If it is, is it an FedRAMP Certification class change?  --> This requires a new assessment and cannot be done under the Significant Change Notification rules.
- If it is not, is it a routine recurring change? --> Follow the Routine Recurring Change rules (SCN-RTR Routine Recurring Changes).
- If it is not, is it a transformative change? --> Follow the Transformative Change rules (SCN-TRF Transformative Changes).
- If it is not, then it is an adaptive change --> Follow the Adaptive Change rules (SCN-ADP Adaptive Changes).

### Artifacts

- Evidence of significant change evaluation including a description fo the change, the determined type, and an explanation for the decision. At least one example must be provided for each type of change. Real examples are prefered but the provider may use fictitious examples as long as the example provides evidence of the decision making process.

### Schema

```json
{
  "name": "FedRAMP Significant Change Notification (SCN-CSO-INF)",
  "url": "https://fedramp.gov/schemas/fedramp-significant-change-notifications-schema-2026-06-24.json"
}
```

## SP 800-53 Rev 5 controls

cm-4

## Defined terms

- **Adaptive Change:** A type of significant change that does not routinely recur and does not introduce substantive potential security risks that need to be assessed in depth.
- **Certification Class:** The category of assurance that a cloud service offering supplies to federal government customers following FedRAMP Practices, increasing from minimal assurance at Class A to significant assurance at Class D; currently available categories are Class A, B, C, or D.
- **Certification Class Change:** A type of significant change that is likely to change the FedRAMP Certification class for the entire cloud service offering (e.g. from Class B to Class C or from Class D to Class C).
- **Routine Recurring Change:** The type of significant change that regularly and routinely recurs as part of ongoing operations, vulnerability mitigation, or vulnerability remediation.
- **Significant Change:** Has the meaning given in NIST SP 800-37 Rev. 2 which is "a change that is likely to substantively affect the security or privacy posture of a system."
- **Transformative Change:** The type of significant change that introduces substantive potential security risks that are likely to affect existing risk determinations and must be assessed in depth.
