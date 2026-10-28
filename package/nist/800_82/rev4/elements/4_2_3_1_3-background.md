Organizations should implement an OT patch management process that defines how it will monitor for patches, when to apply them, how to test them (e.g., with vendors, on offline systems), and how to select compensating controls to limit exposure of the vulnerable system when patching is delayed. The process should be designed to not only reduce cybersecurity risks but also account for OT reliability, availability, and safety needs.

Organizations are responsible for staying informed and determining when patches should be applied as part of their documented patch management process. Many OT vulnerabilities are published to CISA as advisories or CVEs. However, not all vendors report known vulnerabilities to CISA or CVE. Organizations can often stay informed by subscribing to vendor-specific notifications in addition to CISA alerts and advisories. Private cybersecurity companies also offer services to help organizations stay informed about known vulnerabilities in their OT environments.

OT environments present numerous challenges that constrain the deployment of patches. Patch management decisions should account for the following considerations:

- Many OT environments must run nearly continuously for extended periods or have small maintenance windows to apply approved updates. This limits the frequency with which patches can be applied.
- A patch may remove a vulnerability, but it can also introduce greater reliability or safety risks. Patching the vulnerability may also change the way the OS or application behaves, potentially resulting in some loss of functionality.
- Legacy devices and software often lack vendor support and may no longer receive patches for identified flaws and vulnerabilities.

OT patching decisions should factor in operational requirements and potential adverse effects of installing the patch and be determined by knowledgeable OT personnel. Many organizations define decision frameworks (e.g., Now/Next/Never, Now/Next/Later) to triage and inform patching decisions:

- Now. Patches that pose immediate risks and can be installed without impacting operations may be applied immediately. These may include patches for components within DMZ environments, network segments that are more exposed, or vulnerabilities that allow unauthorized remote access to the OT environment.
- Next. Vulnerabilities that pose a significant risk to operations but cannot be feasibly patched may need to be scheduled during the next scheduled maintenance period.
- Later (or Never). Other vulnerabilities that present reduced or minimal risk may be scheduled for a future time. Additional information about this approach is defined here.

An organization’s patch management process should also define processes to prevent or recover from any unintended consequences of deployed patches. For example:

- Consider separating the automated OT patch management process from the automated non-OT application process.
- Patches should be adequately tested (e.g., offline system testing) to assess the acceptability of any performance impacts before being deployed into a production system.
- Have a recovery plan for the OT component or system being patched in case the patch causes an unexpected issue.

If patches cannot be deployed, the organization should explore appropriate compensating controls. Security tools (e.g., web application firewalls, IDSs) could be configured to provide additional protection to detect or prevent attacks exploiting unpatched vulnerabilities while the organization waits for an opportunity to apply the updates. Other tools (e.g., bump-in-the-wire security devices) can be installed in line with devices that cannot be updated or are using obsolete operating systems.

Organizations may be required to follow industry-specific patch management guidance. Otherwise, they may develop patch management procedures based on existing standards. Supplemental guidance for flaw remediation and patch management can be found in the following documents:

- SP 800-40r4, Guide to Enterprise Patch Management Planning: Preventive Maintenance for Technology
- ISA 62443-2-3, Patch Management in the IACS Environment
