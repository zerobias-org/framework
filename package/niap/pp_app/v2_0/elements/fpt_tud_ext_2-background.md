**Requirement:** FPT_TUD_EXT.2 · **Status:** Selection-Based

**FPT_TUD_EXT.2.1** The application shall be distributed using [**selection**: the format of the platform-supported package manager, a container image].

**FPT_TUD_EXT.2.2** The application shall be packaged such that its removal results in the deletion of all traces of the application, with the exception of configuration settings, output files, and audit/log events.

**FPT_TUD_EXT.2.3** The application installation package shall be digitally signed such that [**selection**: its platform can cryptographically verify them prior to installation., the application can verify them using [**selection**: Leighton-Micali Signature., eXtended Merkle Signature Scheme.]]

**Dependencies:** FPT_TUD_EXT.1 Integrity for Installation and Update
