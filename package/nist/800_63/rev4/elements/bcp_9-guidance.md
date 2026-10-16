Assessment is required when: A back-channel presentation is used.

The assertion reference needs to be delivered to the RP in some fashion, and for many protocols this happens through a front-channel redirect through the subscriber's browser. The RP needs to ensure that any assertion references presented to it are legitimate by protecting itself against common injection attacks. The techniques for protection vary depending on the type of RP application and its deployment model, but there are many resources and documented best practices for different applications and platforms. For example, ensuring that the assertion reference is returned in the same browser session that was used to request the assertion reference in the front channel. Without these protections, an attacker could convince an RP to trade an injected (but otherwise valid) assertion reference and therefore get a fraudulent assertion and give the attacker access to the RP.

**Assessment objective**

Determine whether the RP employs best practices for its platform to protect against injection of assertion references.

**Assessment methods**

- EXAMINE: Examine the RP's federation implementation to verify that it protects against assertion reference injection through XSS and CSRF protections, rejection of assertion references outside the correct stage of the federation transaction, and other RP-side countermeasures such as request correlation, nonce use, and transaction state tracking.
- TEST: Test by initiating a federation transaction in one RP session, capturing the resulting assertion reference, and submitting that assertion reference in a different RP session that has a different session identifier and unrelated transaction state. Verify that the RP rejects the assertion reference and does not complete the federation transaction.
