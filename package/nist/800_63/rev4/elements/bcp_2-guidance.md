Assessment is required when: A back-channel presentation is used.

Since assertion references are traded for assertions, the IdP needs to ensure that the assertion reference is presented only by the specific RP to which it was issued. Otherwise, an attacker could capture an assertion reference and inject it into a different RP to fake a log in. This requirement applies even if the RPs are logistically related, such as being configured to receive a common identifier. If assertion references are not used, this requirement does not apply.

**Assessment objective**

Determine whether the IdP enforces a binding between each issued assertion reference and exactly one designated Relying Party, ensuring that the reference can only be used by a single RP.

**Assessment methods**

- EXAMINE: Satisfied by BCP-10.
