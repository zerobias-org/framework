**Requirement:** FCS_COP.1/KeyedHash · **Status:** Selection-Based

**FCS_COP.1.1/KeyedHash** The **application** shall perform [*keyed-hash message authentication*] in accordance with a specified cryptographic algorithm

[**selection**:
- HMAC-SHA-256
- HMAC-SHA-384
- HMAC-SHA-512
]

**with** key sizes [**assignment**: key size (in bits) used in HMAC] **and message digest sizes** [**selection**: 256, 384, 512] **bits** that meet the following: [*FIPS Pub 198-1, "The Keyed-Hash Message Authentication Code," and FIPS Pub 180-4, "Secure Hash Standard"*].
