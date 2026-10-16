Assessment is required when: Shared signaling is used.

Shared signals are communications between the IdP and RP that occur outside of the federation transaction to alert federation partner(s) of important changes in state that would not otherwise be known, such as suspected fraud or an account status change.

This control gates all shared signaling to the same purpose limitations that govern other subscriber information transmissions under Section 3.10.1. SSIG-2 and SSIG-3 require documentation of signal purposes; this control verifies those purposes are permissible.

**Assessment objective**

Determine whether all shared signals serve one of the allowable identity process functions defined in Section 3.10.1.

**Assessment methods**

- EXAMINE: Examine the shared signals documentation (see SSIG-2 and SSIG-3). For each signal type, verify that the stated purpose maps to one of the allowable functions: (1) identity service (identity proofing, authentication, or attribute assertions), (2) a specific subscriber request, (3) fraud mitigation related to the identity service, or (4) security incident response related to the identity service. Flag any signal that serves a purpose outside these four categories.
