**FPT_FLS.1.1**

*Application note:* The intent of this requirement is to ensure that cryptographic services requiring random bit generation cannot be performed if a failure of a self-test defined in FPT_TST.1 occurs.

**Evaluation activities**

*TSS:*

The evaluator shall verify that the TSF describes how the TOE enters an error state in the event of a DRBG self-test failure.

*Guidance:*

The evaluator shall verify that the guidance documentation describes the error state that results from a DRBG self-test failure and the actions that a user or administrator should take in response to attempt to resolve the error state.
