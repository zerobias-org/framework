**FPR_ANO_EXT.1.1**

*Application note:* PII is considered to be sensitive data. If "**require user approval before executing...**" is claimed, the ST must not claim "**not transmit any...**" in FTP_DIT_EXT.1.

This requirement applies only to PII that is specifically requested by the application; it does not apply if the user volunteers PII without prompting from the application into a general (or inappropriate) data field. A dialog box that declares intent to send PII presented to the user at the time the application is started is sufficient to meet this requirement.

**Evaluation activities**

*TSS:*

If "**not use PII**" is claimed, the evaluator shall verify the TSS states the application does not utilize any PII.

If "**not transmit PII over a network**" is claimed, the evaluator shall verify that the TSS makes this assertion (e.g., because it does not use network connectivity at all or if the functions for which it uses network connectivity do not involve transmission of PII). If "**require user approval before executing...**" is selected, the evaluator shall inspect the TSS documentation to verify that it identifies the functions where PII may be transmitted over a network.

*Guidance:*

The evaluator shall verify the guidance documentation contains any instructions to configure the transmission of PII and details any prompts that would approve or deny transmission of PII.

*Tests:*

If " **require user approval before executing...**" is selected, the evaluator shall run the application, execute each function that is claimed as being used to transmit PII, and verify that user approval is required before transmission of the PII for each function.
