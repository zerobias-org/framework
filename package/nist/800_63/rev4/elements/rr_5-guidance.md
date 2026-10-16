When the IdP is separate from the CSP, the subscriber may contact the IdP for issues that are more appropriately resolved by CSP (e.g., identity proofing errors, incorrect attributes in the CSP subscriber account, authenticator binding issues). This control ensures the IdP correctly redirects subscribers to the CSP.

TRUST-8 (Redress Coordination) establishes the inter-party infrastructure that enables this routing. This control assesses whether the IdP makes that routing accessible to subscribers.

**Assessment objective**

Determine whether the IdP provides subscribers with a means of initiating the redress process with the CSP for matters involving the CSP subscriber account.

**Assessment methods**

- EXAMINE: Examine IdP documentation, subscriber-facing interfaces, and help resources for mechanisms that direct subscribers to CSP redress processes when appropriate. Verify that the IdP distinguishes between matters it handles directly (RR-3) and matters requiring CSP involvement.
- TEST: Test the IdP's interfaces by attempting to locate information for initiating redress with the CSP, acting as a test subscriber.
