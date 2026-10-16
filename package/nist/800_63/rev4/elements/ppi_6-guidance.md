Assessment is required when: Pairwise Pseudonymous Identifiers (PPIs) are used.

Per NIST SP 800-131A Rev 2, Section 1.2.1, "a security strength of at least 112 bits is required at this time for applying cryptographic protection." This establishes the technical floor for what constitutes "sufficient entropy" to be "unguessable."

**Assessment objective**

Determine whether PPIs provide sufficient entropy to be unguessable by an attacker.

**Assessment methods**

- EXAMINE: Examine the mechanism used to generate the Pairwise Pseudonymous Identifier (PPI). If the PPI is generated as a random value, verify it is produced by an approved random bit generator with a security strength of at least 112 bits. If the PPI is derived from other subscriber information (e.g., using a key derivation function), verify the derivation uses an approved key derivation function with a secret key of at least 112 bits of security strength, as discussed in SP 800-131A.
