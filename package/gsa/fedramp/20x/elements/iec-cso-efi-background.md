**SHOULD:** Providers SHOULD promptly estimate the likely adverse impact of an incident on agency customers to assign a Potential Agency Impact N-rating; this step is called Incident Rating.

**Applies to:** Class B, Class C (Providers)

**Audience:** General Provider Responsibilities. These rules apply to providers with FedRAMP Certifications of any type.

### Following information

- **N1** for a likely minimal customer effect on 1 or more agencies.
- **N2** for a likely narrow customer effect on 1 or more agencies.
- **N3** for a likely disruptive customer effect on 1 agency.
- **N4** for a likely debilitating customer effect on 1 agency or a likely disruptive customer effect on more than 1 agency.
- **N5** for a likely debilitating customer effect on more than 1 agency.

### Notes

- All incidents must be assigned a default PAIN-5 as required by IEC-CSO-DPR (Default PAIN Rating) if this step is not completed.

### Artifacts

- An incident log showing an example of one or more incidents being evaluated including the reason for the determination. The log can be from real incidents, simulated incidents, or a combination of sources.

### Related

- IEC-CSO-DPR

### Schema

```json
{
  "name": "FedRAMP Incident Report (IEC-CSO-IIR / IEC-CSO-OIR / IEC-CSO-FIR)",
  "url": "https://fedramp.gov/schemas/fedramp-incident-report-schema-2026-06-24.json"
}
```

## Defined terms

- **Debilitating Customer Effect:** An unwanted customer effect that interrupts use of the cloud service for most users or compromises the integrity or confidentiality of most federal customer data. If the adverse customer effect is unknown then it should be treated as if it is debilitating until proven otherwise.
- **Disruptive Customer Effect:** An unwanted customer effect that interrupts use of the cloud service for many users for less than 24 hours, or that compromises the integrity or confidentiality of large amounts or many types of federal customer data.
- **Incident:** Has the meaning given in 44 USC § 3552 (b)(2) which is "an occurrence that (A) actually or imminently jeopardizes, without lawful authority, the integrity, confidentiality, or availability of information or an information system; or (B) constitutes a violation or imminent threat of violation of law, security policies, security procedures, or acceptable use policies."
- **Likely:** A reasonable degree of probability based on context.
- **Minimal Customer Effect:** An unwanted customer effect that is only noticeable by some users. This includes minor inconveniences such as reduced performance.
- **Narrow Customer Effect:** An unwanted customer effect that interrupts use of the cloud service for some users for less than 12 hours, or that compromises the integrity or confidentiality of an extremely limited amount and type of federal customer data.
- **Potential Agency Impact:** The estimated cumulative effect of unauthorized access, disruption, harm, or other adverse impacts to all agencies using the cloud service that are likely to result from security incidents or the exploitation of vulnerabilities in the cloud service offering; as estimated following appropriate FedRAMP rules to calculate the Potential Agency Impact N-rating (PAIN).
- **Promptly:** Without unnecessary delay.
