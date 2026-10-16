Assessment is required when: Pairwise Pseudonymous Identifiers (PPIs) are used.

Pairwise identifiers are intended to protect the privacy of the subscriber and prevent collation of subscriber information. If the identifier itself has any identifying information in it, such as a username or employee number, this protection is lost. To prevent this, pairwise identifiers should be random and unguessable values or generated using information known only to the IdP, such as a secret key. If pairwise identifiers are not used, this requirement does not apply.

**Assessment objective**

Determine whether pairwise identifiers contain any identifying information about the subscriber.

**Assessment methods**

- EXAMINE: Examine the documentation and generation algorithm used by the IdP to assign a pairwise identifier to a subscriber at an RP.
- TEST: Test by generating an assertion containing a PPI, then inspecting the resulting identifier to confirm it contains no readable personal information, such as usernames, email addresses, or employee numbers.
