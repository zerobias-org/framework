Wireless communication can be used for local-area communication (e.g., wireless LANs, field networks) and wide-area communication using cellular, microwave, or satellite-based systems. While radio frequency (RF)-based communications provide enhanced flexibility over traditional physical (i.e., wired) communication capabilities, they are also more susceptible to interference, unauthorized access, eavesdropping, and reliability issues (e.g., signal jamming, distance limitations, line-of-sight requirements). Prior to installation, a wireless survey should be performed to identify antenna locations and signal strength for adequate coverage and to minimize the exposure of the wireless network to interference from OT environmental factors and eavesdropping.

When implementing a wireless field or local area network, the following security features should be considered:

- A wireless mesh network to improve resiliency or to eliminate areas with poor signal strength. Mesh networks can provide fault tolerance through alternate route selection and preemptive failover of the network. Organizations should also consider the performance and security implications of using mesh networks. For example, when roaming between access points, devices may experience temporary communication loss. Roaming may also require different security controls to reduce the transition time. Organizations will need to find the appropriate balance between functional capabilities and cybersecurity to achieve the risk tolerance.
- Selecting a standard, non-proprietary protocol (e.g., IEEE 802.15.x).
- Allowlisting devices in the wireless device manager to prevent rogue devices from connecting.
- Implementing appropriately complex passwords and join keys.
- Consider implementing network access control mechanisms to strengthen authentication.

While encrypting and securing the data transmitted over wireless networks is critical, these data-level protections must be paired with network boundary defenses. For specific guidance on safely segmenting, isolating, and integrating wireless technologies within the broader OT environment, refer to Sec. 4.2.2.4.

Supplemental guidance for wireless communications security can be found in the following documents:

- SP 800-97, Establishing Wireless Robust Security Networks: A Guide to IEEE 802.11
- SP 800-121r2, Guide to Bluetooth Security
- SP 800-153, Guidelines for Securing Wireless Local Area Networks (WLANs)
- SP 800-187, Guide to LTE Security
