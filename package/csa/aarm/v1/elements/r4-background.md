**Requirement:** R4 · **Level:** MUST · **Conformance:** AARM Core · **Section:** 3. Core Requirements

The policy engine MUST be capable of producing exactly one of five decisions for each evaluated action:

- **ALLOW** (execute as-is)
- **DENY** (block execution)
- **MODIFY** (execute a transformed version)
- **STEP_UP** (require human approval before execution)
- **DEFER** (delay execution pending additional context)
