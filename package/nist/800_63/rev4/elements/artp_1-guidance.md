Assertions are the fundamental building block of a federated identity transaction, and protecting assertions is essential to the security of the overall system. If an attacker were able to create or modify an assertion and have that assertion accepted by an RP, the attacker would be able to impersonate a valid subscriber and log in to the target system. If an attacker were able to capture an assertion in transit and replay that assertion to a different RP, the attacker would be able to steal a valid session from the legitimate subscriber and log in to the target system. As a consequence, there are a suite of protections that are required for all assertions in a federated system, regardless of how the trust between the parties is established or how the assertion itself is.

**Assessment objective**

Determine whether assertions include the required protection mechanisms.

**Assessment methods**

- EXAMINE: Satisfied by ARTI-1, SIGNA-1, SIGNA-3, SIGNA-4, and AUDR-1; and by ENCA-1 when assertions are encrypted.
