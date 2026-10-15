Assessment is required when: The RP subscriber account life cycle process gives the RP access to attributes through a provisioning API.

When an RP receives subscriber attributes through a provisioning API, the RP subscriber account life cycle may differ from the subscriber account life cycle at the IdP. For example, the RP may have accounts that are no longer active at the IdP. Additional privacy measures address these differences by ensuring that subscriber data is appropriately managed throughout the RP subscriber account lifecycle.

**Assessment objective**

Determine whether the RP implements additional privacy measures to account for RP subscriber account life cycle differences when using a provisioning API.

**Assessment methods**

- EXAMINE: Examine the RP's policies and system documentation for provisioning API integration to verify that additional privacy measures address any differences arising from the RP subscriber account lifecycle, such as the separation of non-active accounts and the proactive removal of disabled and terminated accounts.
