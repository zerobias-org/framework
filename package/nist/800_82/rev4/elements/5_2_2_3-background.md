A SCADA environment often includes primary and backup control centers, regional control centers, and remote stations in different geographic locations. Because these components are distributed, communication between locations often passes over external or WAN connections using wired or wireless media. The network can be divided into different zones or regions. Additional separation may also be used for systems, such as:

- Physical monitoring and access controls
- Doors
- Gates
- Cameras
- VoIP
- Access card readers

Boundary devices (e.g., firewalls) can be placed between regions to control and monitor communications between network segments. Industrial-class stateful firewalls may provide better support for OT-specific protocols and may enhance protection for OT devices, such as PLCs and controllers. Inbound and outbound rules should be defined so that only authorized communication passes between regions.

Secure connections should be used between network segments, such as:

- VPN tunnels
- Encrypted channels
- Point-to-point connections

These secure connections may be used:

- Between a regional center and primary control centers
- Between remote stations and control centers

For geographically distant locations, these secure connections may traverse the internet or a wide area network. Devices in each network segment should only connect to other segments through the secure connection, and direct internet access should be restricted.

A DMZ can also be used to separate control centers from the enterprise network.

Communications between the enterprise network and control centers should pass through services within the DMZ. Those services should be monitored and protected to prevent them from becoming a path into the OT environment.

Remote station components, control center components, and DMZ devices should be

configured to support only necessary functions. Non-essential software, services, and ports should be identified and disabled. For example, if a newer PLC or HMI includes a web server or SSH server that is not required, it should be disabled along with the associated TCP/UDP ports. Fig. 20 shows an example implementation of the components and general configuration of a SCADA system.
