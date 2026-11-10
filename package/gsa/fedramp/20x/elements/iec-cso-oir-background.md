FedRAMP states this requirement separately for each class; see the class sections below.

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

### Schema

```json
{
  "name": "FedRAMP Incident Report (IEC-CSO-IIR / IEC-CSO-OIR / IEC-CSO-FIR)",
  "url": "https://fedramp.gov/schemas/fedramp-incident-report-schema-2026-06-24.json"
}
```

## Class B

**MUST:** Providers with Class B Certifications MUST responsibly notify all affected parties of ongoing activity as new information becomes available during incident response for FedRAMP Reportable Incidents, including updates (or lack of updates) to all previously reported information and as much of the following additional information that is available and/or the current relevant status for each item:

### Following information

- Observed incident activity
- Indicators of compromise
- Related Common Vulnerabilities and Exposures (CVE) identifier, if applicable
- Root cause
- Response and recovery activities

### Artifacts

- An Ongoing Incident Report for one or more incidents. The report can be from real incidents, simulated incidents, or a combination of sources.

## Class C

**MUST:** Providers with Class C Certifications MUST responsibly notify all affected parties of ongoing activity as new information becomes available during incident response for FedRAMP Reportable Incidents, including updates (or lack of updates) to all previously reported information and as much of the following additional information that is available and/or the current relevant status for each item:

### Following information

- Observed incident activity
- Indicators of compromise
- Related Common Vulnerabilities and Exposures (CVE) identifier, if applicable
- Root cause
- Response and recovery activities

### Artifacts

- An Ongoing Incident Report for one or more incidents. The report can be from real incidents, simulated incidents, or a combination of sources.

## SP 800-53 Rev 5 controls

ir-5

## Defined terms

- **All Affected Parties:** All federal entities whose interests are affected directly or are likely to be affected directly in the event of a vulnerability or incident related to federal customer data. This always includes FedRAMP and directly impacted federal customer agencies.
- **FedRAMP Reportable Incident:** An incident that affects the confidentiality or integrity of federal customer data or is likely to affect the confidentiality or integrity of federal customer data.
- **Incident:** Has the meaning given in 44 USC § 3552 (b)(2) which is "an occurrence that (A) actually or imminently jeopardizes, without lawful authority, the integrity, confidentiality, or availability of information or an information system; or (B) constitutes a violation or imminent threat of violation of law, security policies, security procedures, or acceptable use policies."
- **Responsibly:** In a way that shows that you have good judgment and the ability to act correctly and make decisions on your own.
- **Vulnerability Response:** The systematic process of tracking, evaluating, mitigating, monitoring, remediating, assessing exploitation, reporting, and otherwise managing detected vulnerabilities.
