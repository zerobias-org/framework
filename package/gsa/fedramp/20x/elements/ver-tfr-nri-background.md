FedRAMP states this requirement separately for each class; see the class sections below.

**Applies to:** Class B, Class C (Providers)

**Audience:** Timeframes. These rules apply to timeframes for vulnerability detection and response.

## Class B

**MAY:** Providers with Class B Certifications MAY treat likely exploitable vulnerabilities that are NOT internet-reachable where Potential Agency Impact N-rating = 5 as a FedRAMP Reportable Incident until they are partially mitigated vulnerabilities at N4 or below.

## Class C

**MAY:** Providers with Class C Certifications MAY treat likely exploitable vulnerabilities that are NOT internet-reachable where Potential Agency Impact N-rating = 5 as a FedRAMP Reportable Incident until they are partially mitigated vulnerabilities at N4 or below.

## Defined terms

- **FedRAMP Reportable Incident:** An incident that affects the confidentiality or integrity of federal customer data or is likely to affect the confidentiality or integrity of federal customer data.
- **Incident:** Has the meaning given in 44 USC § 3552 (b)(2) which is "an occurrence that (A) actually or imminently jeopardizes, without lawful authority, the integrity, confidentiality, or availability of information or an information system; or (B) constitutes a violation or imminent threat of violation of law, security policies, security procedures, or acceptable use policies."
- **Likely:** A reasonable degree of probability based on context.
- **Likely Exploitable Vulnerability (LEV):** A vulnerability that is not fully mitigated AND is reachable by a likely threat actor; AND a likely threat actor with knowledge of the vulnerability would likely gain unauthorized access, cause harm, disrupt operations, or otherwise have an undesired adverse impact within the cloud service offering by exploiting the vulnerability.
- **Partially Mitigated Vulnerability:** A vulnerability where the likelihood or Potential Agency Impact N-rating has been reduced from the original evaluation but the risk of exploitation still exists and the vulnerability is still detected.
- **Potential Agency Impact:** The estimated cumulative effect of unauthorized access, disruption, harm, or other adverse impacts to all agencies using the cloud service that are likely to result from security incidents or the exploitation of vulnerabilities in the cloud service offering; as estimated following appropriate FedRAMP rules to calculate the Potential Agency Impact N-rating (PAIN).
- **Vulnerability:** Has the meaning given to "security vulnerability" in 6 USC § 650 (25), which is "any attribute of hardware, software, process, or procedure that could enable or facilitate the defeat of [...] management, operational, and technical controls used to protect against an unauthorized effort to adversely affect the confidentiality, integrity, and availability of an information system or its information." This includes gaps in Rev5 Controls and 20x Key Security Indicators, software vulnerabilities, misconfigurations, exposures, weak credentials, insecure services, and all other such potential weaknesses in protection (intentional or unintentional).
