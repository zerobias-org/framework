Assessment is required when: Pairwise Pseudonymous Identifiers (PPIs) are used.

In some circumstances, it is desirable to prevent the subscriber account from being easily linked at multiple RPs through the use of a common subject identifier. A pairwise pseudonymous identifier (PPI) allows an IdP to provide multiple distinct federated identifiers to different RPs for a single subscriber account. The use of a PPI prevents different RPs from colluding to track the subscriber using the federated identifier.

**Assessment objective**

Determine whether the IdP generates unique pairwise pseudonymous identifiers for each RP or authorized set of RPs.

**Assessment methods**

- EXAMINE: Examine the PPI generation algorithm to confirm that it produces different outputs for each RP or authorized RP set.
- TEST: Test by logging the same subscriber into two unrelated RPs - verify different identifiers are asserted.
