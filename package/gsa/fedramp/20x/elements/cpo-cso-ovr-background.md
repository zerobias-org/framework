**MUST:** Providers MUST supply a Certification Package Overview within their FedRAMP Certification Package, in both human-readable and JSON formats, that includes at least all of the information required by the following rules:

**Applies to:** Class B, Class C (Providers)

**Audience:** General Provider Responsibilities. These rules apply to providers for FedRAMP Certifications of any type.

### Following information

- Certification Package Overview: CPO-CSO-MTD (Certification Package Overview Metadata)
- Certification Data Sharing: CDS-CSO-PUB (Public Information)
- Certification Data Sharing: CDS-CSO-SVC (Public Service List)
- Certification Data Sharing: CDS-CSO-IRP (Include Relevant Policies)
- Minimum Assessment Scope: MAS-CSO-IIR (Identify Information Resources)
- Minimum Assessment Scope: MAS-CSO-FLO (Information Flows and Security Categories)
- Minimum Assessment Scope: MAS-CSO-TPR (Third-Party Information Resources)
- Using Cryptographic Modules: CMU-CSO-CMD (Cryptographic Module Documentation)
- Independent Verification and Validation: IVV-CSO-ICP (Inclusion in Certification Package)

### Notes

- For FedRAMP Rev5, the Certification Package Overview replaces the historically required System Security Plan (not including appendices).
- This list of rules may not apply to all FedRAMP Certification Classes or Types - if a rule does not apply then the information is not required.

### Related

- CPO-CSO-MTD
- CDS-CSO-PUB
- CDS-CSO-SVC
- MAS-CSO-IIR
- MAS-CSO-FLO
- MAS-CSO-TPR
- CMU-CSO-CMD
- CDS-CSO-IRP
- IVV-CSO-ICP

### Schema

```json
{
  "name": "FedRAMP Certification Package Overview Schema",
  "url": "https://fedramp.gov/schemas/fedramp-certification-package-overview-schema-2026-06-24.json"
}
```

## Defined terms

- **Certification Class:** The category of assurance that a cloud service offering supplies to federal government customers following FedRAMP Practices, increasing from minimal assurance at Class A to significant assurance at Class D; currently available categories are Class A, B, C, or D.
- **Certification Data:** The collective information required by FedRAMP for initial and ongoing FedRAMP Certification of a cloud service offering, including the FedRAMP Certification Package.
- **Certification Package:** Has meaning from 44 USC § 3607 (b)(8) given to "authorization package", which is "the essential information that can be used by an agency to determine whether to authorize the operation of an information system or the use of a designated set of common controls for all cloud computing products and services [certified] by FedRAMP."
- **Information Resource:** Has the meaning from 44 USC § 3502 (6): "information and related resources, such as personnel, equipment, funds, and information technology." This includes any aspect of the cloud service offering, both technical and managerial, including everything that makes up the business of the offering from non-machine-based information resources like organizational policies, procedures, employees, etc. to machine-based information resources like hardware, software, cloud services, code, etc.
- **Initial Incident Report (IIR):** An initial report about an incident that is supplied by FedRAMP Certified cloud service providers to FedRAMP and agency customers, following FedRAMP FedRAMP Incident Evaluation and Communication rules.
- **Minimum Assessment Scope:** The boundary of the assessment and FedRAMP Certification for the cloud service offering, which effectively defines the cloud service offering itself for the purposes of a FedRAMP Certification Package; anything that is not entirely included in the Minimum Assessment Scope is a third-party information resource.
- **Security Category:** Has the meaning from NIST FIPS 199, which is "The characterization of information or an information system based on an assessment of the potential impact that a loss of confidentiality, integrity, or availability of such information or information system would have on organizational operations, organizational assets, or individuals." Security categories are often referred to as "impact levels" and include Low, Moderate, and High.
- **Third-Party Information Resource:** Any information resource that is not entirely included in the Minimum Assessment Scope for the cloud service offering obtaining FedRAMP Certification.
- **Validation:** Confirmation through objective evidence that implemented security capabilities and related certification data are suitable for their intended FedRAMP Certification use and support the expected security outcomes for a cloud service offering.
- **Verification:** Confirmation through objective evidence that specified FedRAMP Practices have been fulfilled for a cloud service offering.
