**MUST:** Providers MUST evaluate detected vulnerabilities, considering the context of the cloud service offering, to estimate the likely potential agency impact of exploitation on government customers AND assign one of the following Potential Agency Impact N-ratings (PAIN):

**Applies to:** Class B, Class C (Providers)

**Audience:** Evaluation. These rules apply to the evaluation of vulnerabilities.

### Following information

- **N0**: Exploitation is extremely unlikely to have any adverse effects on agencies that use the cloud service offering.
- **N1**: Exploitation could be expected to have minimal customer effects on one or more agencies that use the cloud service offering.
- **N2**: Exploitation could be expected to have narrow customer effects on one or more agencies that use the cloud service offering.
- **N3**: Exploitation could be expected to have a disruptive customer effect on one agency that uses the cloud service offering.
- **N4**: Exploitation could be expected to have a debilitating customer effect on one agency that uses the cloud service offering OR a disruptive customer effect on more than one federal agency that uses the cloud service offering.
- **N5**: Exploitation could be expected to have a debilitating customer effect on more than one agency that uses the cloud service offering.

## SP 800-53 Rev 5 controls

ra-3

## Defined terms

- **Cloud Service Offering:** A specific, packaged cloud computing product or service supplied by a cloud service provider for use by customers, that is the subject of a FedRAMP Certification.
- **Debilitating Customer Effect:** An unwanted customer effect that interrupts use of the cloud service for most users or compromises the integrity or confidentiality of most federal customer data. If the adverse customer effect is unknown then it should be treated as if it is debilitating until proven otherwise.
- **Disruptive Customer Effect:** An unwanted customer effect that interrupts use of the cloud service for many users for less than 24 hours, or that compromises the integrity or confidentiality of large amounts or many types of federal customer data.
- **Likely:** A reasonable degree of probability based on context.
- **Minimal Customer Effect:** An unwanted customer effect that is only noticeable by some users. This includes minor inconveniences such as reduced performance.
- **Narrow Customer Effect:** An unwanted customer effect that interrupts use of the cloud service for some users for less than 12 hours, or that compromises the integrity or confidentiality of an extremely limited amount and type of federal customer data.
- **Potential Agency Impact:** The estimated cumulative effect of unauthorized access, disruption, harm, or other adverse impacts to all agencies using the cloud service that are likely to result from security incidents or the exploitation of vulnerabilities in the cloud service offering; as estimated following appropriate FedRAMP rules to calculate the Potential Agency Impact N-rating (PAIN).
- **Vulnerability:** Has the meaning given to "security vulnerability" in 6 USC § 650 (25), which is "any attribute of hardware, software, process, or procedure that could enable or facilitate the defeat of [...] management, operational, and technical controls used to protect against an unauthorized effort to adversely affect the confidentiality, integrity, and availability of an information system or its information." This includes gaps in Rev5 Controls and 20x Key Security Indicators, software vulnerabilities, misconfigurations, exposures, weak credentials, insecure services, and all other such potential weaknesses in protection (intentional or unintentional).
- **Vulnerability Detection:** The systematic process of discovering and identifying security vulnerabilities in information resources through assessment, scanning, threat intelligence, vulnerability disclosure mechanisms, bug bounties, supply chain monitoring, and other capabilities. This process includes the initial discovery of a vulnerability's existence and the determination of affected information resources within a cloud service offering.
