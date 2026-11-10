**MUST:** Providers MUST supply machine-readable information in JSON documents that are valid against the corresponding JSON schema when a rule contains a FedRAMP JSON schema, UNLESS otherwise specified in the rule; public JSON data MUST be supplied in a manner compatible with modern web frameworks, including:

**Applies to:** Class A, Class B, Class C (Providers)

**Audience:** General Provider Responsibilities. These rules apply to cloud service providers obtaining and maintaining any FedRAMP Certification.

### Following information

- Cross-Origin Resource Sharing (CORS) should allow web applications running on a different domain to access the public JSON data directly.
- Proper web application headers should be supplied for public JSON data, including at least setting Content-Type to application/json and X-Content-Type-Options: nosniff.

### Notes

- FedRAMP JSON schemas are designed to be lightweight and flexible to establish a minimum set of structured information while allowing providers to improve on the format and structure of the information as needed to meet their needs and the needs of their customers.
- Public JSON data is intended to be consumed by FedRAMP, agency GRC tools, and more - it should be available in a way that enables standard web-application use following standard web frameworks. Generally, if you can't write a web app to parse this data without configuring a browser to bypass security defaults then there has likely been a problem.
- The Schema Validator available at fedramp.gov will not work properly if Cross-Origin Resource Sharing is not properly configured.

## Defined terms

- **Likely:** A reasonable degree of probability based on context.
- **Machine-Readable:** Has the meaning from 44 U.S. Code § 3502 (18) which is "the term "machine-readable", when used with respect to data, means data in a format that can be easily processed by a computer without human intervention while ensuring no semantic meaning is lost"
