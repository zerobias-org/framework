Key rotation requires the same security protection as initial key establishment. Using an authenticated protected channel ensures that updated key material is not intercepted or modified during exchange.

**Assessment objective**

Determine whether updates to identifiers and cryptographic keys are executed using an authenticated protected channel.

**Assessment methods**

- EXAMINE: Examine system configurations for key rotation mechanisms. Verify that the update process matches the process defined in the trust agreement artifact(s) (see CKR-1).
- TEST: Test by performing or observing a key rotation process. For authenticated protected channel verification, see ICKM-2.
