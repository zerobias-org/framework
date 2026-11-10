**MUST:** Providers MUST systematically, persistently, and promptly track, evaluate, monitor, mitigate, remediate, assess exploitation of, report, and otherwise manage all detected vulnerabilities within their cloud service offering; this process is called vulnerability response.

**Applies to:** Class B, Class C (Providers)

**Audience:** General Provider Responsibilities. These rules apply to all providers with FedRAMP Certifications of any type.

### Notes

- If it is not possible to fully mitigate vulnerabilities or remediate vulnerabilities, providers SHOULD instead partially mitigate vulnerabilities promptly, progressively, and persistently.
- FedRAMP does not use the terms "mitigation" and "remediation" interchangeably. Mitigation is the process of reducing the risk and impact of a vulnerability through partial mitigation and even full mitigation; remediation is the process of entirely eliminating the vulnerability. A fully mitigated vulnerability will still exist (with negligible risk) until it has been remediated. This separation is based on the plain language definitions of these words.
- Please refer to FedRAMP Definitions for strict interpretation in the FedRAMP context.

## SP 800-53 Rev 5 controls

au-5.2, ir-4.11, ir-9.3, ra-7, si-2, si-3

## Defined terms

- **Cloud Service Offering:** A specific, packaged cloud computing product or service supplied by a cloud service provider for use by customers, that is the subject of a FedRAMP Certification.
- **Fully Mitigated Vulnerability:** A vulnerability where the likelihood of exploitation or Potential Agency Impact N-rating has been reduced from the original evaluation until either are negligible, but the vulnerability is still detected.
- **Partially Mitigated Vulnerability:** A vulnerability where the likelihood or Potential Agency Impact N-rating has been reduced from the original evaluation but the risk of exploitation still exists and the vulnerability is still detected.
- **Persistently:** Occurring in a firm, steady way that is repeated over a long period of time in spite of obstacles or difficulties. Persistent activities may vary between actors, may occur irregularly, and may include interruptions or waiting periods between cycles. These attributes of persistent activities should be intentional, understood, and documented; the status of persistent activities will always be known.
- **Promptly:** Without unnecessary delay.
- **Remediated Vulnerability:** A vulnerability that has been neutralized or eliminated and is no longer detected.
- **Vulnerability:** Has the meaning given to "security vulnerability" in 6 USC § 650 (25), which is "any attribute of hardware, software, process, or procedure that could enable or facilitate the defeat of [...] management, operational, and technical controls used to protect against an unauthorized effort to adversely affect the confidentiality, integrity, and availability of an information system or its information." This includes gaps in Rev5 Controls and 20x Key Security Indicators, software vulnerabilities, misconfigurations, exposures, weak credentials, insecure services, and all other such potential weaknesses in protection (intentional or unintentional).
- **Vulnerability Detection:** The systematic process of discovering and identifying security vulnerabilities in information resources through assessment, scanning, threat intelligence, vulnerability disclosure mechanisms, bug bounties, supply chain monitoring, and other capabilities. This process includes the initial discovery of a vulnerability's existence and the determination of affected information resources within a cloud service offering.
- **Vulnerability Response:** The systematic process of tracking, evaluating, mitigating, monitoring, remediating, assessing exploitation, reporting, and otherwise managing detected vulnerabilities.
