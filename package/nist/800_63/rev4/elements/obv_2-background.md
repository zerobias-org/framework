**Applies to:** Verifier · **Assurance level:** ALL · **Section:** SP 800-63B-4 3.1.3.2 B

Depending on the type of out-of-band authenticator, one of the following SHALL take place:

- (a) Transfer of the secret from the secondary to the primary channel. As shown in Fig. 1, the verifier MAY signal the device that contains the subscriber's authenticator to indicate a readiness to authenticate. It SHALL then transmit a random secret to the out-of-band authenticator and wait for the secret to be returned via the primary communication channel.
- (b) Transfer of the secret from the primary to the secondary channel. As shown in Fig. 2, the verifier SHALL transmit a random authentication secret to the claimant via the primary channel. It SHALL then wait for the secret to be returned via the secondary channel from the claimant's out-of-band authenticator. The verifier MAY additionally display an address, such as a phone number or VoIP address, for the claimant to use in addressing its response to the verifier.
