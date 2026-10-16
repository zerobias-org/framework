Assessment is required when: A back-channel presentation is used.

This control complements BCP-1, which requires tamper and fabrication resistance. BCP-1 addresses integrity protection of assertion references; this control addresses the unpredictability of their values. Together they ensure an attacker can neither guess a valid reference nor modify an intercepted one.

**Assessment objective**

Determine whether assertion references are generated in a manner that prevents prediction or guessing by an attacker.

**Assessment methods**

- EXAMINE: Examine the IdP documentation describing the assertion reference generation mechanism to confirm it uses an approved random bit generator or equivalent method that produces values with at least 112 bits of security strength per SP 800-131A.
