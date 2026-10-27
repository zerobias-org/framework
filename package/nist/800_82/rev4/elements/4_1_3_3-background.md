A key part of risk assessment is the identification of vulnerabilities and associated predisposing conditions within the OT environment. A list of common vulnerabilities and predisposing conditions is defined in Appendix C. While vulnerabilities are often associated with the products and services used by the organization, others depend on the device’s unique architecture or implementation details.

Understanding vulnerabilities associated with vendor products and services depends on an accurate inventory of IT and OT assets within the operating environment, including the vendor, model numbers, firmware, OSs, and software versions installed on the assets. This inventory facilitates the identification, tracking, and remediation of vulnerabilities. OT-specific vulnerability information is available through multiple methods, including:

- Using OT-specific tools to automate asset inventory creation, cross-correlation of the inventory with known vulnerabilities and threats, and regular updates
- Monitoring security groups, associations, and vendors for security alerts and advisories
- Reviewing the NIST National Vulnerability Database (NVD) and CISA Known Exploited Vulnerabilities (KEV) Catalog for detailed information on known vulnerabilities for hardware and software assets

In addition to understanding the vulnerabilities across products and services, organizations must also examine their architectures, deployed security controls, configurations, and any custom infrastructure that may introduce additional vulnerabilities. While organizations often execute vulnerability assessments in their environments, these can be problematic in OT environments. Specifically, both vulnerability scanning tools and vulnerability assessment methods can potentially disrupt systems. Therefore, organizations should use caution when performing this assessment on production systems. They may instead want to test in representative lab environments.

Vulnerabilities can be identified through a combination of automated and manual techniques. These vulnerability scans should be performed on an ongoing basis to capture newly discovered vulnerabilities. Some common ways to achieve vulnerability identification in the OT environment are:

- Continuous monitoring using passive or active scanning capabilities. Organizations should consider how vulnerability scanning tools may affect OT components and communications by testing them in an offline environment before implementing them in production.
    - Passive scanning tools typically use network traffic analyzers to detect assets and identify potential vulnerabilities affecting them.
    - Active scanning tools typically use an agent to connect to networked assets and perform detailed queries and analyses of components to identify possible vulnerabilities affecting the assets.
- Performance testing, load testing, and penetration testing if the test will not adversely impact the production environment.
- Regular audits, assessments, and peer reviews to identify gaps in security.
