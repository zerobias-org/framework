**Assessment objective**

Require use of a salt sufficient to ensure that two subscribers with the same password do not hash to the same value in the verifier.

**Assessment methods**

- EXAMINE: Examine stored salt values to ensure that they are at least 32 bits in length.
- INTERVIEW: Interview CSP personnel to determine that salt is chosen to avoid collisions.
