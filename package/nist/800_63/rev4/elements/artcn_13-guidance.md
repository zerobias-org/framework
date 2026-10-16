Assessment is required when: The underlying attribute bundle supports selective disclosure.

This requirement ensures that the wallet does not over-disclose attributes to the RP.

**Assessment objective**

Determine whether the wallet uses selective disclosure when presenting attributes to the RP, when the attribute bundle supports it.

**Assessment methods**

- EXAMINE: Examine the wallet's assertion presentation logic to confirm that when the underlying attribute bundle supports selective disclosure, the wallet uses it to present only the attributes requested by the RP rather than the full bundle contents.
- TEST: Test by initiating a federation transaction where the RP requests a subset of the attributes available in the attribute bundle. Confirm the wallet presents only the requested subset.
