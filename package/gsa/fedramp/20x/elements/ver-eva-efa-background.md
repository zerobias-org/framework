**SHOULD:** Providers SHOULD consider at least the following factors when considering the context of the cloud service offering to evaluate detected vulnerabilities:

**Applies to:** Class B, Class C (Providers)

**Audience:** Evaluation. These rules apply to the evaluation of vulnerabilities.

### Following information

- **Criticality**: How important are the systems or information that might be impacted by the vulnerability?
- **Reachability**: How might a threat actor reach the vulnerability and how likely is that?
- **Exploitability**: How easy is it for a threat actor to exploit the vulnerability and how likely is that?
- **Detectability**: How easy is it for a threat actor to become aware of the vulnerability and how likely is that?
- **Prevalence**: How much of the cloud service offering is affected by the vulnerability?
- **Privilege**: How much privileged authority or access is granted or can be gained from exploiting the vulnerability?
- **Proximate Vulnerabilities**: How does this vulnerability interact with previously detected vulnerabilities, especially partially or fully mitigated vulnerabilities?
- **Known Threats**: How might already known threats leverage the vulnerability and how likely is that?

## SP 800-53 Rev 5 controls

ra-9

## Defined terms

- **Cloud Service Offering:** A specific, packaged cloud computing product or service supplied by a cloud service provider for use by customers, that is the subject of a FedRAMP Certification.
- **Fully Mitigated Vulnerability:** A vulnerability where the likelihood of exploitation or Potential Agency Impact N-rating has been reduced from the original evaluation until either are negligible, but the vulnerability is still detected.
- **Likely:** A reasonable degree of probability based on context.
- **Vulnerability:** Has the meaning given to "security vulnerability" in 6 USC § 650 (25), which is "any attribute of hardware, software, process, or procedure that could enable or facilitate the defeat of [...] management, operational, and technical controls used to protect against an unauthorized effort to adversely affect the confidentiality, integrity, and availability of an information system or its information." This includes gaps in Rev5 Controls and 20x Key Security Indicators, software vulnerabilities, misconfigurations, exposures, weak credentials, insecure services, and all other such potential weaknesses in protection (intentional or unintentional).
- **Vulnerability Detection:** The systematic process of discovering and identifying security vulnerabilities in information resources through assessment, scanning, threat intelligence, vulnerability disclosure mechanisms, bug bounties, supply chain monitoring, and other capabilities. This process includes the initial discovery of a vulnerability's existence and the determination of affected information resources within a cloud service offering.
