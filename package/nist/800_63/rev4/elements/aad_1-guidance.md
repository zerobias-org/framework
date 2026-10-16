This restriction applies even when parties are allowlisted for federation purposes; allowlisting permits federation transactions, not unlimited data sharing.

**Assessment objective**

Determine whether the IdP and RP limit transmission of subscriber identity attributes to permitted purposes.

**Assessment methods**

- EXAMINE: Examine IdP and RP policies, trust agreement artifact(s), data flow documentation, federation configuration, and any identity API, provisioning API, or attribute synchronization mechanisms used to transmit subscriber identity attributes between the IdP and RP. Verify that the policies do not authorize transmission for purposes outside of federation transactions and support functions (as defined in Sec. 3.10.1).
- EXAMINE: Examine the trust agreement artifact(s) to verify that the permitted purposes for attribute transmission fall within these boundaries. The operational enforcement of transmission limits is satisfied by TSI-1 (IdP transmission limits) and TSI-4 (RP transmission limits to the IdP). This control verifies that the governing policies themselves do not permit out-of-scope transmission.
