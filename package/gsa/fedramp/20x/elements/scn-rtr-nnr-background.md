**SHOULD NOT:** Providers SHOULD NOT make formal Significant Change Notifications for routine recurring changes; this type of change is exempted from notification requirements.

**Applies to:** Class B, Class C (Providers)

**Audience:** Routine Recurring Changes. These rules apply to all routine recurring significant changes.

### Notes

- Activities that match the routine recurring significant change type are performed regularly and routinely by cloud service providers to address flaws or vulnerabilities, address incidents, and generally perform the typical maintenance and service delivery changes expected during day-to-day operations.
- These changes leverage mature processes and capabilities to identify, mitigate, and remediate risks as part of the change. They are often entirely automated and may occur without human intervention, even though they have an impact on security of the service.
- If the activity does not occur regularly and routinely then it cannot be a significant change of this type (e.g., replacing all physical firewalls to remediate a vulnerability is obviously not regular or routine).

### Examples

- id: Tips on ongoing operations
- key_tests:
  - Routine care and feeding by staff during normal duties
  - No major impact to service availability
  - Does not require executive approval
- examples:
  - Provisioning or deprovisioning capacity to support service elasticity
  - Changing or tuning performance configurations for instances or services
  - Updating and maintaining operational handling of information flows and protection across physical and logical networks (e.g., updating firewall rules)
  - Generating or refreshing API or access tokens
- id: Tips on vulnerability management
- key_tests:
  - Minor, incremental patching or updates
  - Significant refactoring or migration process NOT required
  - No breaking changes
- examples:
  - Updating security service or endpoint signatures
  - Routine patching of devices, operating systems, software or libraries
  - Updating and deploying code that applies normal fixes and improvements as part of a regular development cycle
  - Vulnerability remediation activity that simply replaces a known-bad component(s) with a better version of the exact same thing, running in the exact same way with no changes to processes

## Defined terms

- **Incident:** Has the meaning given in 44 USC § 3552 (b)(2) which is "an occurrence that (A) actually or imminently jeopardizes, without lawful authority, the integrity, confidentiality, or availability of information or an information system; or (B) constitutes a violation or imminent threat of violation of law, security policies, security procedures, or acceptable use policies."
- **Regularly:** Performing the activity on a consistent, predictable, and repeated basis, at set intervals, automatically if possible, following a documented plan. These intervals may vary as appropriate between different activities.
- **Routine Recurring Change:** The type of significant change that regularly and routinely recurs as part of ongoing operations, vulnerability mitigation, or vulnerability remediation.
- **Significant Change:** Has the meaning given in NIST SP 800-37 Rev. 2 which is "a change that is likely to substantively affect the security or privacy posture of a system."
- **Vulnerability:** Has the meaning given to "security vulnerability" in 6 USC § 650 (25), which is "any attribute of hardware, software, process, or procedure that could enable or facilitate the defeat of [...] management, operational, and technical controls used to protect against an unauthorized effort to adversely affect the confidentiality, integrity, and availability of an information system or its information." This includes gaps in Rev5 Controls and 20x Key Security Indicators, software vulnerabilities, misconfigurations, exposures, weak credentials, insecure services, and all other such potential weaknesses in protection (intentional or unintentional).
