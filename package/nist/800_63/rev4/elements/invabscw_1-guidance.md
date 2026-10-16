Attribute bundle invalidation is used when:

-The subscriber account is terminated, thereby rendering downstream federation actions invalid;

-The wallet needs to be terminated due to the device being lost, stolen, or compromised; or

-The attribute bundle is disclosed to an attacker or otherwise compromised.

**Assessment objective**

Determine whether the CSP provides a means of invalidating attribute bundles issued to subscriber-controlled wallets.

**Assessment methods**

- EXAMINE: Examine CSP documentation for a defined invalidation process covering at minimum the three scenarios identified in Sec. 5.1.1: subscriber account termination, wallet termination due to loss/theft/compromise, and attribute bundle compromise or disclosure to an attacker.
- TEST: Test by issuing an attribute bundle to a test wallet. Next, invoke the CSP's invalidation process for that bundle. Verify that the CSP's systems reflect the bundle as invalidated (e.g., marked as invalid in the CSP's status registry or list, removed from active bundle records, or otherwise flagged as invalid).
