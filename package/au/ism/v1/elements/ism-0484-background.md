The SSH daemon is configured to:

- only listen on the required interfaces (ListenAddress xxx.xxx.xxx.xxx)
- have a suitable login banner (Banner x)
- have a login authentication timeout of no more than 60 seconds (LoginGraceTime 60)
- disable host-based authentication (HostbasedAuthentication no)
- disable rhosts-based authentication (IgnoreRhosts yes)
- disable the ability to login directly as root (PermitRootLogin no)
- disable empty passwords (PermitEmptyPasswords no)
- disable connection forwarding (AllowTCPForwarding no)
- disable gateway ports (GatewayPorts no)
- disable X11 forwarding (X11Forwarding no).
