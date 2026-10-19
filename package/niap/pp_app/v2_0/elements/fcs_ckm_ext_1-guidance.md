**FCS_CKM_EXT.1.1**

*Application note:* If "**implement asymmetric key generation**" or "**invoke platform-provided functionality for asymmetric key generation**" is selected, then FCS_CKM.1/AK must be claimed in the ST.

**Evaluation activities**

*TSS:*

The evaluator shall examine the TSS to verify that it describes whether the TSF has functions that require the use of asymmetric key generation services, and whether these services are implemented within the TOE boundary or invoked by the TSF from its operational environment.

Conditional: If the ST claims "**generate no asymmetric keys**," the evaluator shall ensure that the TOE does not have any functions that would require asymmetric key generation (for example, because it does not use asymmetric keys for any purpose or because the keys that it does use are generated elsewhere and imported into it as part of initial setup).

*Guidance:*

None.

*Tests:*

None.
