Assessment is required when: Shared signaling is used.

The IdP is not required to retain records of which RPs a subscriber account interacted with. However, the obligation to signal affected RPs remains. If the IdP cannot scope the notification to RPs the account actually used during the suspected time frame, the IdP must signal all RPs that could have been impacted. In practice, this means all RPs with pre-established trust agreement artifact(s) that authorize shared signaling (see SSIG-6, PETA-6).

Prerequisite: SSIG-7 (IdP review upon receiving compromise signal).

**Assessment objective**

Determine whether the IdP signals all RPs that the compromised subscriber account was used for during the suspected time frame when suspicious activity is confirmed.

**Assessment methods**

- EXAMINE: Examine the IdP's incident response procedures to identify a documented process for signaling RPs when suspicious activity is confirmed on a subscriber account. Determine whether the IdP retains federation transaction records sufficient to identify which RPs the subscriber account interacted with during the suspected time frame.  If yes, verify the process signals the RPs identified from those federation transaction records for the suspected time frame. If no, verify the process signals all RPs with which the IdP has a pre-established trust agreement authorizing shared signaling that could have been impacted for the relevant subscriber population or transaction context.
