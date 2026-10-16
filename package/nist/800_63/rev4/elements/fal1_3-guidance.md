At all FALs, the IdP must include audience restrictions identifying the intended recipient(s). FAL1 allows multiple RPs per assertion, but the assertion must explicitly list all intended recipients. This prevents unscoped assertions that could be accepted by any RP. To reduce the risk of assertion replay, IdPs SHOULD issue assertions designated for a single audience whenever possible. Restriction to a single audience becomes mandatory at FAL2 and higher.

**Assessment objective**

Determine whether the IdP includes audience restrictions in all FAL1 assertions targeting specific RP(s).

**Assessment methods**

- EXAMINE: Satisfied by AUDR-1.
