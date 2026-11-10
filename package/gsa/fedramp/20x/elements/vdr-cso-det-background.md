**MUST:** Providers MUST systematically, persistently, and promptly discover and identify vulnerabilities within their cloud service offering using appropriate techniques such as assessment, scanning, threat intelligence, vulnerability disclosure mechanisms, bug bounties, penetration testing, incident response, automated control testing, supply chain monitoring, and other relevant capabilities; this process is called vulnerability detection. Vulnerability detection includes persistently verifying and validating that information resources and processes are operating as intended and documented for FedRAMP Practices.

**Applies to:** Class B, Class C (Providers)

**Audience:** General Provider Responsibilities. These rules apply to all providers with FedRAMP Certifications of any type.

**Warning:** Vulnerability Detection and Response includes all efforts to identify weaknesses in a system and is NOT limited to traditional vulnerability scanning or testing. An out-of-date control statement in the Security Decision Record is a vulnerability that must be detected and remediated just like any other vulnerability.

### Notes

- FedRAMP's vulnerability detection (and response) rules are intended to set modern expectations for maintaining the security of a cloud service. Historical FedRAMP guidance on vulnerability scanning or continuous monitoring generally focused only on CVE-type vulnerabilities while leaving other types of vulnerabilities and exposures unaddressed.
- Providers are encouraged to leverage their existing holistic security review, architecture review, and similar processes to meet these requirements. FedRAMP strongly discourages providers from implementing separate vulnerability detection and response processes for FedRAMP reporting that are operated by independent compliance branches unless these processes are consuming data directly from the areas of the cloud service that actively maintain it.

## SP 800-53 Rev 5 controls

au-5.2, au-6, ca-8, ca-8.1, ca-8.2, ra-5, ra-5.2, ra-5.3, ra-5.4, si-2, si-3, si-4.1, si-4.12, si-4.18, si-4.22, si-5.1

## Defined terms

- **Cloud Service Offering:** A specific, packaged cloud computing product or service supplied by a cloud service provider for use by customers, that is the subject of a FedRAMP Certification.
- **FedRAMP Practices:** The security measures, safeguards, precautions, procedures, activities, policies, capabilities, mechanisms, etc. that are expected to be in place by FedRAMP to demonstrate that information resources are properly protected, expressed in FedRAMP 20x Key Security Indicators or FedRAMP Rev5 Controls and supplemented by FedRAMP rules.
- **Incident:** Has the meaning given in 44 USC § 3552 (b)(2) which is "an occurrence that (A) actually or imminently jeopardizes, without lawful authority, the integrity, confidentiality, or availability of information or an information system; or (B) constitutes a violation or imminent threat of violation of law, security policies, security procedures, or acceptable use policies."
- **Information Resource:** Has the meaning from 44 USC § 3502 (6): "information and related resources, such as personnel, equipment, funds, and information technology." This includes any aspect of the cloud service offering, both technical and managerial, including everything that makes up the business of the offering from non-machine-based information resources like organizational policies, procedures, employees, etc. to machine-based information resources like hardware, software, cloud services, code, etc.
- **Persistently:** Occurring in a firm, steady way that is repeated over a long period of time in spite of obstacles or difficulties. Persistent activities may vary between actors, may occur irregularly, and may include interruptions or waiting periods between cycles. These attributes of persistent activities should be intentional, understood, and documented; the status of persistent activities will always be known.
- **Promptly:** Without unnecessary delay.
- **Vulnerability:** Has the meaning given to "security vulnerability" in 6 USC § 650 (25), which is "any attribute of hardware, software, process, or procedure that could enable or facilitate the defeat of [...] management, operational, and technical controls used to protect against an unauthorized effort to adversely affect the confidentiality, integrity, and availability of an information system or its information." This includes gaps in Rev5 Controls and 20x Key Security Indicators, software vulnerabilities, misconfigurations, exposures, weak credentials, insecure services, and all other such potential weaknesses in protection (intentional or unintentional).
- **Vulnerability Detection:** The systematic process of discovering and identifying security vulnerabilities in information resources through assessment, scanning, threat intelligence, vulnerability disclosure mechanisms, bug bounties, supply chain monitoring, and other capabilities. This process includes the initial discovery of a vulnerability's existence and the determination of affected information resources within a cloud service offering.
- **Vulnerability Response:** The systematic process of tracking, evaluating, mitigating, monitoring, remediating, assessing exploitation, reporting, and otherwise managing detected vulnerabilities.
