Assessment is required when: The subscriber-controlled wallet runs on a device controlled by the subscriber (i.e., not a hosted wallet).

The requirement permits the same activation factor (e.g., the same fingerprint or PIN) to be used for both device unlock and wallet activation, provided the wallet requires its own distinct activation event. Activation factor requirements for authenticators are discussed in Sec. 3.2.10 of SP 800-63B-4.

The MDM relaxation applies to enterprise or government scenarios where the CSP controls both the identity credential and the device environment. In such cases, device management policies can enforce equivalent security properties at the device level, making a separate wallet activation event redundant. This relaxation does not apply to consumer scenarios where the CSP has no management authority over the subscriber's device.

**Assessment objective**

Determine whether the subscriber-controlled wallet requires a separate activation operation from host device unlock, or whether the organization qualifies for the MDM relaxation.

**Assessment methods**

- EXAMINE: Examine the wallet's security architecture documentation to confirm that wallet activation is implemented as an operation distinct from host device unlock.
- EXAMINE: Examine documentation to verify that: (1) The wallet is managed by or on behalf of the CSP (e.g., via MDM); (2) The device is constrained to short, organization-determined inactivity timeouts; and (3) The device activation factors meet the requirements in Sec. 3.2.10 of SP 800-63B-4, if the organization claims the MDM relaxation. If all three conditions are met, device-level controls satisfy the separation requirement. If any condition is not met, the relaxation does not apply, and the base requirement must be assessed.
- TEST: Test by unlocking the host device (e.g., smartphone) using the device unlock mechanism if the MDM relaxation is not claimed or applicable.
- TEST: Test by Immediately initiate a wallet signing operation (issuance or assertion presentation per WACT-1) if the MDM relaxation is not claimed or applicable.
- TEST: Test by confirming the wallet requires a separate activation prompt before proceeding - device unlock alone does not satisfy the wallet activation requirement if the MDM relaxation is not claimed or applicable.
