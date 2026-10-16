Assessment is required when: Pairwise Pseudonymous Identifiers (PPIs) are used.

In a proxied federation model (see Sec. 3.3.3), the upstream IdP may not be able to generate a PPI for the downstream RP, since the proxy could blind the IdP from knowing which RP is being accessed by the subscriber. In such situations, the PPI is generally established between the IdP and the federation proxy. Acting as an IdP, the proxy can provide a PPI to the downstream RP. Depending on the protocol, the federation proxy may need to map the PPI back to the associated identifiers from upstream IdPs in order to allow the identity protocol to function. In such cases, the proxy will be able to track and determine which PPIs represent the same subscriber at different RPs.

**Assessment objective**

Determine whether the proxy treats PPI-to-identifier mappings as subscriber information subject to Section 3.10.1 requirements.

**Assessment methods**

- EXAMINE: Satisfied by applying TSI-1,  TSI-2, and TSI-3 to the PPI mapping data.
