The enterprise maintains an unbroken, tamper-evident chain of custody and append-only body of evidence detailing the agent's identity, the delegated intent, and the resulting actions. This logging infrastructure is independent of the agent to prevent modification, enabling analysis for drift, anomalous behavior, and overall agent performance.

**Rationale**

Promotes accountability, recovery, and resilience. Prevents tampering and audit failure.

If activity logs are accessible or modifiable by the agent itself, a compromised agent could tamper with log files, deleting or changing its actions. Independent, append-only logging provides forensic teams with an unbroken, trustworthy chain of custody for incident response and drift analysis.
