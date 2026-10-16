Assessment is required when: The IdP provides attributes through a provisioning API.

This requirement enforces data minimization principles by ensuring the IdP proactively removes subscriber data from RPs when accounts are terminated, rather than allowing indefinite retention of stale identity attributes. The exception clause acknowledges that RPs may have legitimate data retention requirements (legal, regulatory, or policy-based) that prevent immediate deletion. Trust agreement artifact(s) should document any such exceptions.

Note that when an RP subscriber account is linked to multiple federated identifiers (see Sec. 3.8.1), deprovisioning one federated identifier may result in a persistent RP subscriber account linked to a different federated identifier.

**Assessment objective**

Determine whether the IdP actively uses the provisioning API to deprovision RP subscriber accounts when corresponding subscriber accounts are terminated at the IdP, when the IdP is not restricted from doing so by RP retention requirements, policies, or regulations.

**Assessment methods**

- EXAMINE: Examine the trust agreement artifact(s) documenting any RP retention exceptions that restrict automatic deprovisioning. Examine audit logs that correlate subscriber account terminations at the IdP with corresponding deprovisioning actions sent to RPs, and ensure that deprovisioning occurs unless there is an RP exception, and that deprovisioning does not occur if any RP exception conditions have been met.
- TEST: Test by terminating a test subscriber account at the IdP that should result in deprovisioning and verify that a deprovisioning action is sent to the RP via the provisioning API Then, terminate a test subscriber account at the IdP that should not result in deprovisioning and verify that no deprovisioning action is sent to the RP.
