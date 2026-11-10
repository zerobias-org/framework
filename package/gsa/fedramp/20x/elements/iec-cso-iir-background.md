**Applies to:** Class B, Class C (Providers)

**Audience:** General Provider Responsibilities. These rules apply to providers with FedRAMP Certifications of any type.

### Notification

- party: FedRAMP
- method: email
- target: fedramp_security@fedramp.gov
- name: fedramp_security@fedramp.gov
- party: Agency Customers
- method: varies
- target: varies by agency
- name: Follow agency-specific incident reporting procedures
- party: All Necessary Parties
- method: update
- target: trust center
- name: Provider's Trust Center or USDA Connect
- optional: true

### Related

- IEC-CSO-EFI

### Schema

```json
{
  "name": "FedRAMP Incident Report (IEC-CSO-IIR / IEC-CSO-OIR / IEC-CSO-FIR)",
  "url": "https://fedramp.gov/schemas/fedramp-incident-report-schema-2026-06-24.json"
}
```

## Class B

**MUST:** Providers with Class B Certifications MUST responsibly notify all affected parties after identifying FedRAMP Reportable Incidents by providing an Initial Incident Report with as much of the following information that is available at the time of reporting and/or the current relevant status for each item:

### Following information

- Contact information for the federal incident response coordinator.
- Provider's internally assigned tracking identifier
- Description of the incident
- Timeline of the incident, including start time, time and source of detection, time of completed FedRAMP Reportable Incident evaluation, and other major incident milestones determined by the provider
- Historically and currently estimated Potential Agency Impact N-rating (PAIN) of the incident, including an explanation of the evaluation following the requirements in IEC-CSO-EFI (Estimate Federal Impact) (if applicable)
- Functional impact to federal agency customers (include impact to confidentiality and/or integrity and the impacted federal customer data types)
- Estimated recovery plan, milestones, and timelines
- List of likely affected customer agencies

### Artifacts

- An Initial Incident Report for one or more incidents. The report can be from real incidents, simulated incidents, or a combination of sources.

## Class C

**MUST:** Providers with Class C Certifications MUST responsibly notify all affected parties after identifying FedRAMP Reportable Incidents by providing an Initial Incident Report with as much of the following information that is available at the time of reporting and/or the current relevant status for each item:

### Following information

- Contact information for the federal incident response coordinator.
- Provider's internally assigned tracking identifier
- Description of the incident
- Timeline of the incident, including start time, time and source of detection, time of completed FedRAMP Reportable Incident evaluation, and other major incident milestones determined by the provider
- Historically and currently estimated Potential Agency Impact N-rating (PAIN) of the incident, including an explanation of the evaluation following the requirements in IEC-CSO-EFI (Estimate Federal Impact) (if applicable)
- Functional impact to federal agency customers (include impact to confidentiality and/or integrity and the impacted federal customer data types)
- Estimated recovery plan, milestones, and timelines
- List of likely affected customer agencies

### Artifacts

- An Initial Incident Report for one or more incidents. The report can be from real incidents, simulated incidents, or a combination of sources.

## SP 800-53 Rev 5 controls

au-5.2, ir-5

## Defined terms

- **All Affected Parties:** All federal entities whose interests are affected directly or are likely to be affected directly in the event of a vulnerability or incident related to federal customer data. This always includes FedRAMP and directly impacted federal customer agencies.
- **FedRAMP Reportable Incident:** An incident that affects the confidentiality or integrity of federal customer data or is likely to affect the confidentiality or integrity of federal customer data.
- **Incident:** Has the meaning given in 44 USC § 3552 (b)(2) which is "an occurrence that (A) actually or imminently jeopardizes, without lawful authority, the integrity, confidentiality, or availability of information or an information system; or (B) constitutes a violation or imminent threat of violation of law, security policies, security procedures, or acceptable use policies."
- **Initial Incident Report (IIR):** An initial report about an incident that is supplied by FedRAMP Certified cloud service providers to FedRAMP and agency customers, following FedRAMP FedRAMP Incident Evaluation and Communication rules.
- **Responsibly:** In a way that shows that you have good judgment and the ability to act correctly and make decisions on your own.
