**Requirement:** FTP_DIT_EXT.1 · **Status:** Mandatory

**FTP_DIT_EXT.1.1** The application shall

[**selection**:
- not transmit any [**selection**, choose one of: data, sensitive data]
- encrypt all transmitted [**selection**, choose one of: sensitive data, data] with [**selection**: HTTPS as a client in accordance with FCS_HTTPS_EXT.1 and FCS_HTTPS_EXT.2, HTTPS as a server in accordance with FCS_HTTPS_EXT.1, HTTPS as a server with support for mutual authentication in accordance with FCS_HTTPS_EXT.1 and FCS_HTTPS_EXT.2, TLS as a server as defined inFunctional Package for Transport Layer Security (TLS), version 2.1 and also supports functionality for [**selection**: mutual authentication, none], TLS as a client as defined inFunctional Package for Transport Layer Security (TLS), version 2.1, DTLS as a server as defined inFunctional Package for Transport Layer Security (TLS), version 2.1 and also supports functionality for [**selection**: mutual authentication, none], DTLS as a client as defined inFunctional Package for Transport Layer Security (TLS), version 2.1, SSH as defined in the Functional Package for Secure Shell (SSH), version 2.0, IPsec as defined in the VPN Client PP-Module, version 3.0] for [**assignment**: function(s)] using certificates as defined in the [Functional Package for X.509](https://www.niap-ccevs.org/protectionprofiles/511)
- invoke platform-provided functionality to encrypt all transmitted sensitive data with [**selection**: HTTPS, TLS, DTLS, SSH, IPsec] for [**assignment**: function(s)] using certificates as defined in the [Functional Package for X.509](https://www.niap-ccevs.org/protectionprofiles/511)
- invoke platform-provided functionality to encrypt all transmitted data with [**selection**: HTTPS, TLS, DTLS, SSH, IPsec] for [**assignment**: function(s)] using certificates as defined in the [Functional Package for X.509](https://www.niap-ccevs.org/protectionprofiles/511)
]

between itself and another trusted IT product.

**Dependencies:** No dependencies.
