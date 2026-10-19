**Requirement:** FCS_PBKDF_EXT.1 · **Status:** Selection-Based

**FCS_PBKDF_EXT.1.1** The application shall condition passwords/passphrases with [**assignment**: Password-based Key Derivation Functions] in accordance with a specified cryptographic algorithm as specified in FCS_COP.1 **/KeyedHash** , with [**selection**: [**assignment**: positive integer between 1,000 and 9,999], [**assignment**: positive integer between 1,0000 and 199,999], [**assignment**: positive integer greater than 200,000]] iterations, and output size of [**assignment**: positive integer of 256 or greater] bits that meet the following [*NIST SP 800-132*].

**FCS_PBKDF_EXT.1.2** The TSF shall generate salts in accordance with FCS_SNI_EXT.1 and with entropy corresponding to the security strength selected for PBKDF in FCS_PBKDF_EXT.1.

**Dependencies:** FCS_COP.1 Cryptographic Operation FCS_RBG_EXT.1 Random Bit Generation Services
