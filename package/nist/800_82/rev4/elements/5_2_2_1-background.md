A distributed control system (DCS) is used to control production systems within the same geographic location by organizing the network into separate functional areas, such as:

- A field level with devices typically associated with Purdue Levels 0, 1, and 2
- An operations management level with devices used to monitor and manage field devices and Purdue Level 3 components
- A DMZ with devices that support communication between the operations management level and enterprise systems

Additional network segments may also be used for systems, such as:

- Physical monitoring and access controls
- Doors
- Gates
- Cameras
- Voice over Internet Protocol (VoIP)
- Access card readers

Boundary devices (e.g., firewalls) can be placed between these areas to control and monitor communications. Industrial-class firewalls may be used between field devices and operations management systems to support OT-specific protocols or to operate in harsh environments. Inbound and outbound rules should be defined so that only authorized communication passes between adjacent areas.

A DMZ can be used to separate the OT environment from the enterprise network.

Communications between enterprise systems and operations management systems should pass through services located in the DMZ rather than directly between the two environments. Because the DMZ connects to outside environments, the services within it should be monitored and protected to reduce the chance that a compromise in the DMZ could be used to reach the OT environment.

Some architectures may use separate authentication services for enterprise and OT users, such as:

- An IT authentication server in the enterprise network
- An OT authentication server in the operations management network

Devices in the field level, operations management level, and DMZ should be configured to only use the capabilities required for their purpose. Non-essential software, services, and ports should be identified and disabled. For example, if a PLC or HMI contains a web server or SSH server that is not needed, that service and its associated TCP/UDP ports should be disabled. Figure 18 shows a security architecture example for a DCS system.
