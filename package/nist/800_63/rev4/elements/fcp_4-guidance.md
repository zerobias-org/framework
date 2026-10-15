Assessment is required when: Front-channel presentation is used.

Front-channel presentation passes the assertion through the subscriber's browser, exposing it to intermediaries. Encryption ensures that even if the assertion is intercepted, personal information remains protected. ENCA-1 assesses the encryption mechanism; this control verifies that encryption is applied when front-channel delivery is used.

**Assessment objective**

Determine whether any personal information in assertions that is passed through the front channel is encrypted.

**Assessment methods**

- EXAMINE: Examine the IdP's assertion generation configuration to confirm that assertions delivered via front-channel presentation encrypt all personal information. For encryption mechanism requirements, see ENCA-1.
- TEST: Test by generating a test assertion containing personal information via a front-channel presentation mechanism. Examine the assertion payload as transmitted through the front channel and verify that all personal information is encrypted.
