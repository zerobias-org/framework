Assertions are targeted messages from an IdP to an RP that are created in direct response to a specific federated login process. Each assertion must be targeted to specific RPs so that an assertion intended for one RP cannot be used at an unintended RP, either by the subscriber or an attacker. At FAL1, an assertion may include multiple target RPs. At FAL2 and above, assertions must be restricted to a single RP.

**Assessment objective**

Determine whether all assertions include audience restrictions identifying the target RP.

**Assessment methods**

- EXAMINE: Examine IdP documentation to verify that an audience restriction technique is implemented for all assertions. For FAL2+ transactions, examine sample assertions to confirm that the audience restriction field contains exactly one RP identifier.
- TEST: Test by initiating a federation transaction and verifying that the resulting assertion contains audience restriction information identifying the target RP. For FAL2+ transactions, examine sample assertions to confirm that the audience restriction field contains exactly one RP identifier.
