An assertion injection attack in the context of a federated protocol consists of an attacker attempting to force an RP to accept or process an assertion or assertion reference in order to gain access to the RP or deny a legitimate subscriber access to the RP. The attacker does this by taking an assertion or assertion reference and injecting it into a vulnerable RP. A successful attacker can trick an RP into binding the attacker's session to the federated identifier in the assertion. The attacker's assertion could be either stolen from a legitimate subscriber or manufactured to perpetrate the attack.

Protection from assertion injection attacks is recommended at all FALs and required at FAL2 and above. In all cases, the RP needs to take reasonable steps to prevent an attacker from presenting an injected assertion or assertion reference based on the nature of the RP software, the capabilities of the federation protocol in use, and the needs of the overall system.

**Assessment objective**

Determine whether the RP implements strong protections against assertion injection attacks consistent with Sec. 3.11.1.

**Assessment methods**

- EXAMINE: Satisfied by implementing all of the following: FAL1-1, FAL1-2, FAL1-5, FAL2-2, ARTRQ-1, AUDR-1, ARTC-7, ARTC-10 items 3 and 5, AUDR-2, BCP-1 through BCP-10, FCP-1 through FCP-3.
