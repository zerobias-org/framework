This control prevents key-substitution and impersonation attacks by ensuring that when a signature verifies under a stored key, it can only be attributed to the single, specific party whose identifier is bound to that key in the local configuration.

**Assessment objective**

Determine whether each party identifier is uniquely bound to that party's verification keys.

**Assessment methods**

- EXAMINE: Examine configuration data or metadata to confirm that each federation participant's identifier (e.g., entity ID) maps to a distinct and authorized verification key or key set. Verify that no key is shared across different identifiers and that key rotation procedures preserve this one-to-one mapping.
