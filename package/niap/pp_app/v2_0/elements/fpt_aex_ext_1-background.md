**Requirement:** FPT_AEX_EXT.1 · **Status:** Mandatory

**FPT_AEX_EXT.1.1** The application shall not request to map memory at an explicit address except for [**assignment**: list of explicit exceptions].

**FPT_AEX_EXT.1.2** The application shall

[**selection**, choose one of:
- not allocate any memory region with both write and execute permissions
- allocate memory regions with write and execute permissions for only [**assignment**: list of functions performing just-in-time compilation]
].

**FPT_AEX_EXT.1.3** The application shall be compatible with security features provided by the platform vendor.

**FPT_AEX_EXT.1.4** The application shall not write user-modifiable files to directories that contain executable files unless explicitly directed by the user to do so.

**FPT_AEX_EXT.1.5** The application shall be built with stack-based buffer overflow protection enabled.

**Dependencies:** No dependencies.
