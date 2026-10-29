Organizations should understand various events and anomalies as well as their potential impacts on systems and the environment to establish an effective detection capability. Within any environment, numerous non-malicious and potentially malicious events and anomalies occur almost continuously. Some examples of common events include:

- Information events
    - Multiple failed logon attempts
    - Locked-out accounts
    - Unauthorized creation of new accounts
    - Unexpected remote logons (e.g., logons of individuals who are on vacation, remote logon when the individual is expected to be local, remote logon for maintenance support when no support was requested)
    - Cleared event logs
    - Unexpectedly full event logs
    - Antivirus or IDS alerts
    - Disabled antivirus or other security controls
    - Requests for information about the system or architecture (e.g., social engineering or phishing attempts)
- Operational events
    - Unauthorized configuration changes
    - Unauthorized patching of systems
    - Unplanned shutdowns
- Physical access events
    - Physical intrusions
- Networking events
    - Unexpected communication, including new ports or protocols being used without appropriate change management
    - Unusually heavy network traffic
    - Unauthorized devices connecting to the network
    - Unauthorized communication to external IPs

Organizations should consider that not all events and anomalies are malicious or require investigation. Organizations should define incident alerting thresholds and response requirements for the events and anomalies that affect their systems and environment to establish an efficient incident detection capability. To reduce false positive and nuisance alarms, organizations should establish their OT alerting thresholds based on baselines of normal network traffic, data flows, and human and OT process behavior.

Additionally, OT components are often physically remote and not continually staffed. Alerting thresholds may need to account for the alert response time as well as the speed of the physical process itself. Some OT processes can transition to an unsafe or damaging state within seconds of a malicious or anomalous command being executed. Alert prioritization and escalation paths should reflect these physical process response times to ensure that the most time-critical alerts are immediately routed to personnel with the authority and ability to take action. Organizations should consider collecting and correlating event data from multiple sources and sensors using automated mechanisms to improve detecting and alerting capabilities. For example, a centralized intrusion detection system could accept data feeds and logs from multiple devices and network segments to identify organization- or environment-specific events and sound an alarm. Detection tools should also be integrated with asset management tools. This integration can provide additional context to an event (e.g., system location, firmware version, system criticality) to help an organization determine the event’s impact. Supplemental guidance can be found in the following documents:

- SP 800-92, Guide to Computer Security Log Management
- SP 800-94, Guide to Intrusion Detection and Prevention Systems
- SP 1800-7, Situational Awareness for Electric Utilities
