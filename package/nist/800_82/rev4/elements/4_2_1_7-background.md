Logical access controls restrict access to an organization’s systems, data, and networks. Access control lists (ACLs) are sometimes used to support logical access controls. An ACL is a list of one or more rules that determine whether an access request should be granted or denied, and it supports the principle of least functionality and controls access to restricted areas. ACLs are commonly used with isolation technologies (e.g., firewalls), where an ACL might specify the source, destination, and protocol allowed through the isolation device to or from the protected network segment. ACLs may also be used to control physical or logical access to areas or information, such as network file shares, databases, and other data repositories and applications.

Role-based access control (RBAC) also supports logical access controls. RBAC is a technology that has the potential to reduce the complexity and cost of security administration in networks with large numbers of intelligent devices. RBAC is built on the principle that employees change roles and responsibilities more frequently than the duties within those roles and responsibilities. Under RBAC, security administration is simplified using roles, hierarchies, and constraints to organize user access levels.

Additionally, attribute-based access control (ABAC) is an access control approach in which access is determined based on the attributes associated with subjects (requesters) and the objects being accessed. Each object and subject has a set of associated attributes, such as location, time of creation, and access rights. Access to an object is authorized or denied depending on whether the required (e.g., policy-defined) correlation can be made between the attributes of that object and the requesting subject.

For federal employees and contractors, Personal Identity Verification (PIV) in accordance with FIPS 201 may be required for access control. Organizations may also consider one or more of these techniques when determining how to support local access controls within their environments.

Some logical access controls (e.g., RBAC) support the principle of least privilege and the separation of duties by providing a uniform means to manage access to OT devices while reducing the cost of maintaining individual device access levels and minimizing errors. These logical access controls can also restrict OT user privileges to only those required to perform each person’s job (i.e., configuring each role based on the principle of least privilege). The level of access can take several forms, including viewing, using, and altering specific OT data or device functions.

Solutions that provide credential management, authentication, authorization, and system use monitoring can help manage risks associated with OT devices and protocols by offering a secure platform for authorized personnel to access OT devices.

Access control systems should verify the identity of individuals, processes, or devices before granting access while minimizing latency and delays in processing OT system access or commands.

Systems should also be highly reliable and not interfere with OT personnel’s routine or emergency duties. Solutions should be designed to reduce the impact of identity and authorization checks on OT operations and safety.

Supplemental guidance for access controls can be found in the following documents:

- SP 800-63-3, Digital Identity Guidelines
- SP 800-73-4, Interfaces for Personal Identity Verification
- SP 800-76-2, Biometric Specifications for Personal Identity Verification
- SP 800-78-5, Cryptographic Algorithms and Key Sizes for Personal Identity Verification
- SP 800-96, PIV Card to Reader Interoperability Guidelines
- SP 800-97, Establishing Wireless Robust Security Networks: A Guide to IEEE 802.11i
- SP 800-162, Guide to Attribute Based Access Control (ABAC) Definition and Considerations

To support access controls, an organization is not limited to a single access control approach. In some cases, applying different access control techniques to different zones based on criticality, safety, and operational requirements is more efficient and effective. For example, ACLs on network zone firewalls, RBAC on engineering workstations and servers, and ABAC integrated into physical security for sensitive areas may meet an organization’s risk-based access control requirements.
