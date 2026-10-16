Assessment is required when: An Identity API is offered by the IdP.

The subject identifier allows the RP to correlate the identity API response with the assertion's subject, ensuring attributes are associated with the correct subscriber.

**Assessment objective**

Determine whether the identity API returns the subject identifier for the subscriber when the API is hosted by the IdP.

**Assessment methods**

- EXAMINE: Examine the Identity API response structure to verify that the subject identifier is included in the returned attributes.
- TEST: Test by querying the identity API and verifying that the response includes the subject identifier for the subscriber.
