Tools should be used to monitor for malicious code and cyber threats across the organization, including file transfer tools and endpoint devices for potential threat actor behavior. OT organizations should be especially cautious about the use of tools on OT endpoints, as they could potentially introduce reliability or performance concerns.

There are multiple approaches and tools to detect unauthorized behavior on endpoints. Traditional antivirus software, which relies on a combination of heuristic algorithms and known malware signatures to detect and block potentially malicious code, can often be ineffective against novel malware or more modern threat actor tactics. More recent endpoint detection and response (EDR) tools focus on endpoint behavior analysis and telemetry collection, which can improve the ability to detect these threats.

The use of malicious code and endpoint monitoring within OT may require adopting special practices, including compatibility checks, change management, and performance impact metrics. These tools may consume significant CPU usage when running manual scans and signature updates, which could have negative impacts on OT computers and servers. Some OT vendors recommend and even support the use of vendor-specific malicious code and endpoint monitoring tools. In some cases, OT system vendors may have performed regression testing across their product line to support a particular malicious code or endpoint monitoring tool and provide associated installation and configuration documentation.

The decision to deploy these tools to an endpoint should be determined by both its functional role and the associated software it deploys. Generally:

- General-purpose Windows, Unix, and Linux systems used as engineering workstations, data historians, maintenance laptops, and backup servers can be secured like commercial IT equipment by installing push- or auto-updated malicious code and endpoint monitoring software with updates distributed via an update server located within the process control network. Follow organization-developed procedures for transferring the latest updates from known vendor sites to the OT platform servers and other OT computers and servers.
- Follow vendor recommendations on all other servers and computers (e.g., DCS, PLC, instruments) that have time-dependent code, modified or extended OSs, or any other change that makes them different from a standard PC. Test the malicious code and endpoint monitoring software and updates on an offline system, if possible (e.g., install on a backup HMI and validate that performance is not degraded before applying to the primary HMI).

Before deploying malicious code and endpoint monitoring, software organizations should validate that they are compatible with the target platform and do not introduce any reliability or performance issues. Key checks include:

- The configuration of the antivirus software should be tested on an offline system, if possible.
- Manual scanning and signature updates should be performed while the system is not critical for operations.
- Redundancy should be considered for critical systems that require ongoing tool updates such that signature updates can be performed without impacting operations (e.g., consoles, HMIs).
- When configuring file exclusion lists, determine which control application files should not be scanned during production to avoid potential OT system malfunctions or performance degradation.

Malicious code protection tools only function effectively when they are installed, configured, run full-time, and properly maintained in light of known attack methods and payloads. CISA provides a recommended practice for updating antivirus software in OT environments. Supplemental guidance for anti-malware practices can be found in the following documents:

- SP 800-83r1, Guide to Malware Incident Prevention and Handling for Desktops and Laptops
- SP 1058, Using Host-Based Anti-Virus Software on Industrial Control Systems: Integration Guidance and a Test Methodology for Assessing Performance Impacts
- IR-18-214 - Recommended Practice: Updating Antivirus in an Industrial Control Systems. U.S. Department of Homeland Security. 2018
