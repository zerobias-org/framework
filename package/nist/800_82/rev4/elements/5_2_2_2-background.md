When DCS- and PLC-based OT environments include IIoT devices, the architecture may be expanded to support the additional communication and processing needs of those devices. For example, IIoT devices may be connected to a local IIoT platform that provides computing capabilities. Because IIoT introduces different communication and architectural components, separate network segments may be used for those components.

Communication from the IIoT platform tier can be routed through a DMZ border firewall. This allows organizations to support data transmission to:

- Servers in the DMZ or
- The enterprise or internet, as needed for IIoT operational requirements.

This also allows cybersecurity services located in the DMZ to monitor the IIoT platform tier. Figure 19 shows a simplified example security architecture implementation for the DCS system with additional IIoT devices configured to utilize a local IIoT platform for providing computing capabilities.
