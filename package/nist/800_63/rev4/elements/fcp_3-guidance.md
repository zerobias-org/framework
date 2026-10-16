Assessment is required when: Front-channel presentation is used.

**Assessment objective**

Determine whether the connections between the subscriber and the RP as well as the subscriber and IdP take place over an authenticated protected channel.

**Assessment methods**

- EXAMINE: Examine the assessed party's front-channel federation endpoints to confirm they require authenticated protected channels (e.g., HTTPS/TLS) and that connections over non-protected channels are refused.
- TEST: Test by initiating a front-channel federation transaction targeting the assessed party's endpoints. Verify the connection uses an authenticated protected channel. Attempt to connect to the assessed party's front-channel endpoints over a non-protected channel (e.g., plain HTTP) and verify the request is rejected, or the connection is refused.
