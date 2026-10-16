This is a summative control. Compliance is demonstrated when the authenticator control mechanism(s) utilized by the RP have been assessed. At least one of these two mechanisms must be implemented to achieve compliance.

At FAL3, the RP must verify both that it has received a valid assertion from the IdP and that the subscriber controls an authenticator in addition to the assertion. The subscriber-controlled authenticator is either identified in a holder-of-key assertion (see Sec. 3.15) or is an authenticator bound to the RP subscriber account (see Sec. 3.16). In both cases, the authenticator must be phishing-resistant, and the RP must verify proof of control before granting access.

**Assessment objective**

Determine whether the RP verifies subscriber control of an authenticator beyond the assertion at FAL3.

**Assessment methods**

- EXAMINE: For holder-of-key assertions, satisfied by HKA-2. For bound authenticators, satisfied by RPPHBA-1 and RPPHBA-4.
