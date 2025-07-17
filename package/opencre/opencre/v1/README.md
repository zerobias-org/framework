# OpenCRE Framework Package

This package contains the OpenCRE (Open Common Requirement Enumeration) security framework for ZeroBias.

## About OpenCRE

OpenCRE is a comprehensive security framework that links security standards, guidelines, and best practices together at the requirement level. It provides a harmonized resource for security professionals to understand relationships between different security frameworks.

## Package Contents

This package includes:
- **427 Common Requirement Enumerations (CREs)** - Core security requirements
- **Framework mappings** - Links to NIST, OWASP, ISO 27001, and other standards
- **Hierarchical relationships** - Parent-child relationships between requirements
- **Cross-references** - Demonstrates relationships to other security frameworks

## Framework Structure

### Element Types
- **CRE**: Common Requirement Enumeration - standardized security requirements

### Supported Framework Mappings
- **NIST 800-53 v5**: Control mappings to federal security standards
- **OWASP ASVS**: Application Security Verification Standard
- **OWASP SAMM**: Software Assurance Maturity Model
- **Cloud Controls Matrix**: Cloud security controls
- **ISO 27001**: Information security management standards
- **NIST SSDF**: Secure Software Development Framework
- **CWE**: Common Weakness Enumeration
- **CAPEC**: Common Attack Pattern Enumeration

## Usage

### Validation
```bash
npm run validate
```

### Dependency Management
```bash
npm run correct:deps
```

### Publishing
```bash
npm run nx:publish
```


## Data Sources

This framework is derived from the OpenCRE project, which aggregates and harmonizes security requirements from multiple industry standards and guidelines.