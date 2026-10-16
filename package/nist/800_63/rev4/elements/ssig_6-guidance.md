Assessment is required when: Shared signaling is used.

In a subscriber-driven trust agreement, the IdP has no pre-existing relationship with the RP and therefore no established channel for signaling. Per Sec. 4.8, signaling from the RP to the IdP MAY be used in both pre-established and subscriber-driven trust agreements; only IdP-to-RP signaling requires a pre-established trust agreement.

**Assessment objective**

Determine whether IdP-to-RP shared signaling occurs only under a pre-established trust agreement.

**Assessment methods**

- EXAMINE: Examine the IdP shared signaling configuration to verify that outbound signals to RPs are sent only to RPs whose pre-established trust agreement artifact(s) explicitly authorize shared signaling (see PETA-6). Verify that no IdP-to-RP signaling is configured for RPs operating under subscriber-driven trust agreements or for RPs whose trust agreement artifact(s) do not include shared signaling terms.
