This decision can be calculated in a variety of ways, including:

- An allowlist, which determines the circumstances under which the system can allow the federation transaction to proceed in an automated fashion;
- A blocklist, which determines the circumstances under which the system will not allow the federation transaction to proceed; and
- A runtime decision, which allows the authorized party (e.g., the subscriber) to decide whether the transaction can proceed and under what precise terms. A runtime decision can be stored and applied to future transactions.

The applicability of an allowlist, blocklist, or runtime decision can be influenced by aspects of the federation transaction, including the identity of the IdP and RP, the subscriber attributes requested, the xAL required, and other factors. These decisions can be facilitated by risk management systems, federation authorities, and local system policies.

For a non-normative example of an RP that has been allowlisted at an IdP for a set of subscribers to facilitate single sign-on for an enterprise application, see Sec. 9.5.

**Assessment objective**

Determine whether the authorized party identified in the trust agreement artifact(s) makes the decision on whether federation transactions proceed.

**Assessment methods**

- EXAMINE: Examine the trust agreement artifact(s) to identify the designated authorized party or parties for the RPs supported by the IdP. Ensure that all covered cases are assessed by the authorized party identified in the trust agreement. If the subscriber is an authorized party, satisfied by IDPRD-1 through IDPRD-8.  If the organization is an authorized party satisfied by IALRP-1 through IALRP-6, and IDPBRP-1 and  IDPBRP-2.
