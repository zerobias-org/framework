Virtualization refers to a methodology of dividing the resources of a computer (hardware and software) into multiple execution environments. Virtualized environments are authorized for criminal justice and noncriminal justice activities. In addition to the security controls described in this Policy, the following additional controls shall be implemented in a virtual environment:

- 1\. Isolate the host from the virtual machine. In other words, virtual machine users cannot access host files, firmware, etc.
- 2\. Maintain audit logs for all virtual machines and hosts and store the logs outside the hosts’ virtual environment.
- 3\. Virtual Machines that are Internet facing (web servers, portal servers, etc.) shall be physically separate from Virtual Machines (VMs) that process CJI internally or be separated by a virtual firewall.
- 4\. Drivers that serve critical functions shall be stored within the specific VM they service. In other words, do not store these drivers within the hypervisor, or host operating system, for sharing. Each VM is to be treated as an independent system – secured as independently as possible.

The following additional technical security controls shall be applied in virtual environments where CJI is comingled with non-CJI:

- 1\. Encrypt CJI when stored in a virtualized environment where CJI is comingled with non-CJI or segregate and store unencrypted CJI within its own secure VM.
- 2\. Encrypt network traffic within the virtual environment.

The following are additional technical security control best practices and should be implemented wherever feasible:

- 1\. Implement IDS and/or IPS monitoring within the virtual environment.
- 2\. Virtually or physically firewall each VM within the virtual environment to ensure that only allowed protocols will transact.
- 3\. Segregate the administrative duties for the host.

Appendix G-1 provides some reference and additional background information on virtualization.
