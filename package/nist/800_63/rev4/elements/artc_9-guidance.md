Assertions are an identity conveyance mechanism, not an authentication credential. Including authentication secrets in an assertion would expose them to the RP and any intermediary that processes the assertion, creating a direct credential compromise vector. HKA-5 (Sec. 3.15) addresses the narrower case of prohibiting unencrypted private or symmetric keys in holder-of-key assertions. This control covers the general case across all assertion types and all categories of authentication secrets.

**Assessment objective**

Determine whether the IdP's assertions exclude subscriber authentication secrets.

**Assessment methods**

- EXAMINE: Examine sample assertions to verify that no subscriber authentication secrets are present, including but not limited to passwords, shared secrets, or other authenticator values. Verify that the IdP's assertion generation process has no mechanism or configuration that would embed authentication secrets in assertion payloads.
