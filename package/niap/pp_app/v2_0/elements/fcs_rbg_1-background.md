**Requirement:** FCS_RBG.1 · **Status:** Selection-Based

**FCS_RBG.1.1** The TSF shall perform deterministic random bit generation services using

[**selection**:
- Hash_DRBG (any)
- HMAC_DRBG (any)
- CTR_DRBG (AES)
]

in accordance with [*NIST SP 800-90A*] after initialization with a seed.

**FCS_RBG.1.2** The TSF shall use a [**selection**: TSF noise source [**assignment**: name of noise source], multiple TSF noise sources [**assignment**: names of noise sources], TSF interface for seeding] for initialized seeding.

**FCS_RBG.1.3** The TSF shall update the RBG state by [**selection**: reseeding, uninstantiating and reinstantiating] using a [**selection**: TSF noise source [**assignment**: name of noise source], TSF interface for seeding] in the following situations:

[**selection**:
- on demand
- on the condition: [**assignment**: condition]
- after [**assignment**: time]
]

in accordance with [**assignment**: list of standards].
