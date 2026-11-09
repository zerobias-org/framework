Agents operate on behalf of individuals or organizations (often through a responsible individual and/or based on organizational authority). To maintain a clear chain of trust, agents and the entities that initiate their tasks are cryptographically linked throughout the agent execution. For consumer facing scenarios, implementations provide support for anonymous or pseudonymous transactions, using privacy preserving technology where available, based on the expected use and risk associated with agent access. Additionally, as authority is delegated down to sub-agents or downstream services, scopes attenuate so that downstream entities can never claim more authority than the parent. Agent initiated actions with a different scope do not delegate authority to either the parent, sub-agent, or downstream service.

**Rationale**

Promotes non-repudiation, auditability and accountability. Mitigates broad execution authority.

If an agent's activities cannot be definitively linked to the human or entity that initiated them, organizations face severe non-repudiation issues and risk that high-impact transactions and unauthorized actions cannot be technically attributed to the responsible party. Attenuation of delegated rights is critical to prevent overly broad execution authority.
