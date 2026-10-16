Assessment is required when: The IdP utilizes an allowlist for RPs.

Allowlist entries must not just identify the RP, but also define what attributes can be released. See IALRP-6 for handling of RP requests for additional attributes beyond the allowlist entry.

**Assessment objective**

Determine whether IdP allowlist entries specify which attributes can be released to each allowlisted RP.

**Assessment methods**

- EXAMINE: Examine the IdP allowlist entries and verify that each entry specifies the attributes that can be released to the RP.
