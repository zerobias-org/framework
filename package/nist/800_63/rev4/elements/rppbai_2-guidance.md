The choice between 63A and 63B requirements depends on context: if the RP subscriber account was just established and this is the initial authenticator binding, use 63A requirements. If the subscriber already has an established account with authenticators and is adding an RP-provided bound authenticator, use 63B post-enrollment requirements.

**Assessment objective**

Determine whether the RP system administrator verifies that the subscriber receiving the bound authenticator is the subject of the RP subscriber account by following the initial authenticator binding requirements in Sec. 4 of [SP800-63A] or the post-enrollment binding requirements in Sec. 4.1.2 of [SP800-63B].

**Assessment methods**

- EXAMINE: Examine the RP's bound authenticator issuance procedures to identify which binding path is used in each applicable case: Sec. 4 of SP 800-63A for initial binding or Sec. 4.1.2 of SP 800-63B for post-enrollment binding.
- EXAMINE: Examine a sample of issuance records or other issuance evidence to determine that, for each sampled issuance, the system administrator used an independent means to determine that the identified subject of the RP subscriber account was the party receiving the authenticator and followed the applicable binding path.
- INTERVIEW: Interview the system administrator if the records are insufficient to establish how the determination was made.
