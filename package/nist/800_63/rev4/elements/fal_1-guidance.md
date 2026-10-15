This requirement ensures that the assurance level claimed in a federation transaction reflects the actual technical protections in use. Each FAL defines minimum requirements for audience restriction, replay protection, assertion injection protection, trust agreement establishment, identifier and key establishment, and presentation. Both the IdP and RP must enforce those requirements so that no transaction is represented as operating at a higher FAL than the implemented controls support.

See also SECC-4, which is a summative control for xAL baseline compliance.

**Assessment objective**

Determine that the IdP and RP each enforce all requirements associated with the applicable FAL and that every federation transaction meets or exceeds the criteria defined for that FAL.

**Assessment methods**

- EXAMINE: Satisfied when all controls applicable to the asserted FAL are satisfied.
