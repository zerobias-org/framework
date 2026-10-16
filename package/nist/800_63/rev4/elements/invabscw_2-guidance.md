Assessment is required when: The CSP offers an attribute bundle status verification service.

Status verification mechanisms where the RP queries the CSP directly with a specific bundle identifier (e.g., standard OCSP) would fail this requirement because the CSP can correlate the querying RP's network identity with the specific bundle being checked, revealing which RP the subscriber visited. Privacy-preserving alternatives include mechanisms where the RP downloads a complete status dataset and checks bundle status locally, preventing the CSP from learning which specific bundle was checked. One example is the W3C Bitstring Status List.

**Assessment objective**

Determine whether the CSP's attribute bundle status verification service is deployed in a privacy-preserving manner that does not alert the CSP to the use of a specific attribute bundle at a specific RP.

**Assessment methods**

- EXAMINE: Examine the architecture and design documentation for the status verification service. Verify that the service design does not enable the CSP to correlate a specific attribute bundle with a specific RP. Identify the privacy-preserving mechanism in use (e.g., status lists, batch download of revocation data).
