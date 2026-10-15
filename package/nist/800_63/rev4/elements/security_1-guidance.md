An authenticated protected channel is an encrypted communication channel that uses approved cryptography in which the connection initiator (client) has authenticated the recipient (server). Authenticated protected channels are encrypted to provide confidentiality and protection against active intermediaries and are frequently used in the user authentication process. Transport Layer Security (TLS) and Datagram Transport Layer Security (DTLS) [RFC9325] are examples of authenticated protected channels in which the certificate presented by the recipient is verified by the initiator. Unless otherwise specified, authenticated protected channels do not require the server to authenticate the client. Authentication of the server is often accomplished through a certificate chain that leads to a trusted root rather than individually with each server.

**Assessment objective**

Determine that all communications are protected by approved cryptography.

**Assessment methods**

- EXAMINE: Examine the CSP's identity service design document or other documentation, to determine that all communications occur via authenticated, protected channels.
- TEST: Test identity service transactions to determine that they are protected by approved cryptography.
