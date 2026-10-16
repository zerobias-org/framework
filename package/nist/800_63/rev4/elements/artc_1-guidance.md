SAI-1 (4.5 A) is a prerequisite: the subscriber must have an authenticated session before assertion issuance.

ARTC-3 (4.9 C) reinforces this requirement by requiring an authentication time timestamp in every assertion.

**Assessment objective**

Determine whether each assertion issued by the IdP represents a single, discrete authentication event of the subscriber.

**Assessment methods**

- EXAMINE: Examine the IdP assertion issuance process to verify that each assertion is generated in response to a specific authentication event and does not represent a standing authorization, batch of events, or ongoing session state.
- EXAMINE: Examine sample assertions to verify that each contains a unique authentication time corresponding to a single event.
