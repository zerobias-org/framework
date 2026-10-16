Assessment is required when: The RP performs account resolution.

Account resolution occurs when the RP has existing subscriber information (e.g., from a pre-existing database) that is not yet associated with a federated identifier. When a subscriber authenticates via federation, the RP must match the incoming assertion to the correct existing account.

Using insufficient attributes risks incorrect matching - for example, matching on common name and DOB alone could link a federated identifier to the wrong subscriber's account. The RP must request and use attributes that, in combination, uniquely identify the subscriber within the RP's population.

**Assessment objective**

Determine whether the RP ensures that the attributes requested from the IdP for account resolution are sufficient to uniquely identify the subscriber before linking the federated identifier with the RP subscriber account and granting access.

**Assessment methods**

- EXAMINE: Examine RP's account resolution process, including the specific attributes used for matching. Then, examine the RP's analysis or justification demonstrating that the selected attribute combination is sufficient to uniquely resolve subscribers within its population.
- TEST: Test by attempting account resolution as a test subscriber and verify that the federated identifier is linked only after a unique match is confirmed.
