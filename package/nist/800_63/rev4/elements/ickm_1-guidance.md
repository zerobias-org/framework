This control requires that the trust agreement artifact(s) define the security for discovery and registration. The downstream controls assess whether the implementation conforms to specific technical requirements. A federation could pass all downstream controls individually but fail this control if the trust agreement artifact(s) are silent on discovery and registration security, leaving parties without a documented basis for their security expectations.

**Assessment objective**

Determine whether discovery and registration processes are established securely in accordance with the trust agreement artifact(s).

**Assessment methods**

- EXAMINE: Examine trust agreement artifact(s) to verify that they define security requirements for discovery and registration processes. The specific implementation requirements are satisfied by ICKM-2 (authenticated protected channel for key exchange); ICKM-3 (symmetric key uniqueness); ICKM-4 (wildcard identifier prohibition); DR-1, DR-2, and DR-3 (IdP discovery and RP registration, Sec. 4.4); MR-1 (manual registration, Sec. 4.4.1); DYR-1 (dynamic registration channel protection, Sec. 4.4.2); and DISCR-1 (CSP verification key determination for wallets, Sec. 5.5). If the trust agreement artifact(s) do not define security requirements for discovery and registration, this control fails regardless of downstream control results.
