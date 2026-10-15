**Applies to:** IdP · **Assurance level:** ALL · **Section:** SP 800-63C-4 4.9 C

All assertions SHALL include the following attributes:

- (1) Issuer identifier: An identifier for the issuer of the assertion (i.e., the IdP).
- (2) Audience identifier: An identifier for the party intended to consume the assertion (i.e., the RP). An assertion can contain more than one audience identifier at FAL1.
- (3) Issuance time: A timestamp that indicates when the IdP issued the assertion.
- (4) Validity time window: A period of time outside of which the assertion SHALL NOT be accepted as valid by the RP for the purposes of authenticating the subscriber and starting an authenticated session at the RP. This is usually communicated by means of an expiration timestamp for the assertion in addition to the issuance timestamp.
- (5) Assertion identifier: A value that uniquely identifies this assertion and is used to prevent attackers from replaying prior assertions.
- (6) Authentication time: A timestamp that indicates when the IdP last verified the presence of the subscriber at the IdP through a primary authentication event.
- (7) Signature: Digital signature or MAC, including verification key identifier, that covers the entire assertion.
