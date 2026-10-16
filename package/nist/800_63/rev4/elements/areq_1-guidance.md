**Assessment objective**

Determine whether the RP's requests for assertions from subscriber-controlled wallets contain all required elements.

**Assessment methods**

- EXAMINE: Examine the RP's wallet federation configuration to confirm it includes its identifier, a cryptographic nonce, and the set of requested attributes, with the purpose of use, in all assertion requests to subscriber-controlled wallets.
- TEST: Test by initiating a federation transaction between an RP and a subscriber-controlled wallet and capturing the RP's assertion request. Verify that it contains: (1) a unique identifier for the RP; (2) b. a cryptographic nonce; (3)the set of identity attributes, derived attributes, and attribute bundles requested by the RP and their purpose of use at the RP.
