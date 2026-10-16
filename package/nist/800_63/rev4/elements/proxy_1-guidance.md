Assessment is required when: Proxied federation is used.

When using a proxy, different federation processes could be used on either side of the proxy. To avoid accidental upgrading of the transaction giving a false perception of security, the overall FAL for the transaction is limited to the lowest FAL used on either side of the proxy. For example, if FAL1 is used inbound to the proxy, but FAL2 (assertion encryption) is used outbound from the proxy, the proxy has to report the entire transaction at FAL1 to the downstream RP.

**Assessment objective**

Determine whether a proxy does not mask a lower level FAL from its inbound side.

**Assessment methods**

- EXAMINE: Examine the proxy's downstream federation configuration, xAL signaling logic, and applicable trust agreement terms to determine how the proxy communicates the resulting FAL to the downstream RP.
- TEST: Test by initiating a proxied transaction in which the inbound federation leg is at a lower FAL than the downstream leg supports, and determine that the proxy represents the resulting overall FAL to the downstream RP as the lower FAL through the mechanism used in that deployment.
