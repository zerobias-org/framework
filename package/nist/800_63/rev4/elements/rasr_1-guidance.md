A federated assertion is generated in the context of an active authentication event for the subscriber at the IdP. When communicating the authentication state of the subscriber to the RP in an assertion, the IdP has to communicate the timing of that authentication event to the RP. This information can help the RP make access decisions, such as requesting the subscriber to re-authenticate at the IdP directly before being allowed to access highly sensitive information.

**Assessment objective**

Determine whether the IdP communicates information regarding the recency of the subscriber's latest authentication event to the RP.

**Assessment methods**

- EXAMINE: Examine the IdP assertion structure and documentation to verify that recency information for the subscriber's latest authentication event is included in assertions.
- TEST: Test by having the IdP generate a test assertion and verify the authentication timestamp is present. Next, trigger a new authentication event at the IdP to generate a second assertion. Verify the second assertion reflects the updated authentication time.
