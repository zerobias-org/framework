The logic that determines what an agent attempts to do is architecturally separated from the systems that determine what it is allowed to do. This ensures that prompt injections or malicious, untrusted data processed by the reasoning engine cannot manipulate credentials or expand the agent's actual permissions.

**Rationale**

Promotes agentic governance. Prevents prompt injection, privilege escalation and unintended agentic actions.

By design, Large Language Models (LLMs) accept data and instruction as a single stream of tokens through a single interface. This results in a lack of separation between the data (information the LLM is acting on) and control plane (the prompt or instruction given to the LLM). Thus, this separation must be enforced by architecture design to establish policy enforcement capabilities around the agent and between the systems, data, credentials, and environments with which the agent will interact. Guardrails alone are insufficient.
