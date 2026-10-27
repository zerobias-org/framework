Organizations should consider using encryption and authentication to support secure connections or conduits for OT environments when connections must pass over non-OT network segments (e.g., enterprise networks, the internet, wireless).

Many modern automation protocols incorporate cryptographic protections and can be used to establish secure communication to OT devices, including OPC-UA and DNP3-SAv6. However, many devices utilize either unencrypted automation protocols (e.g., DNP3, Modbus) or unprotected management protocols (e.g., Telnet, HTTP). If OT devices lack cryptographic support, it may be necessary to encapsulate communication using other protocols to protect communications between network segments, such as a virtual private network (VPN). For example, a remote site might have a boundary protection device on-site that uses a VPN to establish a secure tunnel over an untrusted network (e.g., the internet) to a VPN-enabled device in the main control center at a different location.

Deploying cryptography on OT presents numerous challenges, including:

- The use of cryptography could introduce communications latency. Therefore, solutions should be tested to determine whether latency is acceptable for the application.
- Various cryptographic protocols depend on pre-shared keys or certificates across devices. However, certificates need to be signed by a common authority, or devices need to be configured to only accept authorized certificates (i.e., pinning). Certificates also have a limited validity period and may expire well before the OT environment reaches the end of its operational life. Organizations should ensure that they consider these challenges and validate that deployed technologies adequately address these challenges.

VPN devices used to protect OT systems should be thoroughly tested to verify that the VPN technology is compatible with the application and that their implementation does not negatively affect network traffic characteristics.

Supplemental guidance for access controls can be found in the following documents:

- SP 800-52r2, Guidelines for the Selection, Configuration, and Use of Transport Layer Security (TLS) Implementations
- SP 800-63B, Digital Identity Guidelines: Authentication and Lifecycle Management
- SP 800-77r1, Guide to IPsec VPNs
- SP 800-113, Guide to SSL VPNs
- Cybersecurity and Infrastructure Security Agency (CISA) Barriers to Secure OT Communication: Why Johnny Can’t Authenticate
