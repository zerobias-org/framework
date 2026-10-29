Careful monitoring and an understanding of the OT network’s normal state can help distinguish transient conditions from legitimate attacks and provide insight into events outside of the normal state. A well-defined baseline differentiates between expected operational traffic and anomalous activity that may indicate a cybersecurity incident, misconfiguration, or equipment issue.

Building a network baseline involves observing and documenting the normal state of the OT network across several dimensions, including expected communication pairs, the protocols and port numbers in use, typical polling intervals and data volumes, and the function codes or command types used within OT protocols. Implementing network monitoring tools in a passive (e.g., listen or learning) mode and analyzing the information to differentiate between known and unknown communication may be a necessary first step in implementing network security monitoring. Organizations should also document expected communication flows between network zones, including traffic that crosses the OT/IT boundary or traverses the DMZ. Once established, baseline information can be used as a reference point to identify deviations in network traffic. Not all deviations are malicious; for instance, equipment changes, software updates, and process modifications can all alter normal traffic patterns. Because of this, baseline maintenance should account for authorized changes to the environment. Baselines should also be reviewed and updated when significant changes are made to the OT

environment, such as the addition of new devices, network reconfigurations, or changes to operational processes.

Supplemental guidance can be found in the following documents:

- SP 800-94, Guide to Intrusion Detection and Prevention Systems (IDPS)
- IR 8219, Securing Manufacturing Industrial Control Systems: Behavioral Anomaly Detection
