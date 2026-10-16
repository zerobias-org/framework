Due to the architectures and design of subscriber-controlled wallets, the trust agreements that support federated transactions are less direct than with general-purpose IdPs. To maintain privacy outcomes and prevent the tracking of user transactions, CSPs and RPs do not typically have direct communication with each other.

Unlike the general IdP case (Sec. 4.6.1.3), where allowlisting an RP can bypass the runtime decision, wallet attribute release always requires a runtime decision regardless of whether an allowlist is used. An allowlist in the wallet context may constrain which RPs can request attributes, but the subscriber still approves release at transaction time. TAGREE-2 establishes that the authorized party for this decision is the subscriber.

**Assessment objective**

Determine whether the wallet manages attribute release using runtime decisions as described in Sec. 4.6.1.3.

**Assessment methods**

- EXAMINE: Satisfied by  IDPRD-1 through IDPRD-8, treating the wallet as the IdP. These controls apply unconditionally in the wallet context, regardless of whether the RP is on an allowlist.
