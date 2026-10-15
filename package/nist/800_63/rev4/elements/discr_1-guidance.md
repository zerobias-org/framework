This control is the wallet-specific counterpart to DR-1, which covers the RP's association of assertion validation keys with the IdP's identifier. In the wallet model, the trust anchor is the CSP's signature on the attribute bundle rather than the IdP's assertion signature. Sec. 5.5 describes several mechanisms: retrieval from a URL known to be controlled by the CSP, manual configuration before deployment, or facilitation by a third-party discovery and registration service (such as a federation authority) in multi-lateral trust agreement artifact(s). ARTVL-1 covers the RP's validation of the attribute bundle signature and depends on this control being satisfied. For network-based key retrieval, DR-2 requirements for authenticated protected channels also apply.

**Assessment objective**

Determine whether the RP obtains the CSP's attribute bundle verification key through a secure process defined in the trust agreement artifact(s) prior to performing federation transactions with a subscriber-controlled wallet.

**Assessment methods**

- EXAMINE: Examine the trust agreement artifact(s) to identify the process specified for the RP to obtain the CSP's attribute bundle verification key (e.g., retrieval from a URL controlled by the CSP, manual configuration, or retrieval through a federation authority). Review the RP's configuration to confirm that the CSP's verification key was obtained through the specified process. Confirm that the process used to obtain the key provides authentication of the source (e.g., authenticated protected channel, manual out-of-band verification, or federation authority trust chain).
