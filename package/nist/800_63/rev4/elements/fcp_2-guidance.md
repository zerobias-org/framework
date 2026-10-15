Assessment is required when: Front-channel presentation is used.

The assertion needs to be delivered to the RP in some fashion, and for many protocols, this happens through a front-channel redirect through the subscriber's browser. The RP needs to ensure that any assertions presented to it are legitimate by protecting itself against common injection attacks. The techniques for protection vary by RP application and deployment model, but there are many resources and documented best practices for different applications and platforms. Without these protections, an attacker could convince an RP to accept an injected (but otherwise valid) assertion and gain access to the subscriber's account at an RP.

**Assessment objective**

Determine whether the RP employs best practices for its platform to protect against the injection of assertions.

**Assessment methods**

- EXAMINE: Examine the RP's federation implementation for XSS and CSRF protections, session-binding of federation transactions, and other injection countermeasures appropriate to the platform
- TEST: Test by capturing an assertion for the RP and injecting it into an unrelated active session at the RP. Ensure that the RP does not accept the injected assertion.
