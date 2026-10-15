Assessment is required when: An Identity API is offered by the IdP.

An identity API deployment may be capable of providing attributes for all subscribers for whom the IdP can create assertions. This control ensures that when API access is granted during a federation transaction, the RP cannot use that access to query attributes for other subscribers.

**Assessment objective**

Determine whether attributes provided by an identity API, when accessed within the context of a federation transaction, are associated only with the single subscriber identified in the associated assertion.

**Assessment methods**

- EXAMINE: Examine the IdP's identity API documentation to verify that when access is granted within a federation transaction, returned attributes are scoped to the subscriber identified in the associated assertion.
- TEST: Test by attempting to use the identity API to retrieve attributes for a subscriber other than the one identified in the assertion, during a federation transaction. Verify that the IdP rejects or ignores the request.
