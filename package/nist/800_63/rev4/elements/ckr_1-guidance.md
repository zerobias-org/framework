Over time, it may be desirable or necessary to update cryptographic keys associated with a CSP, IdP, or RP due to key expiration, suspected compromise, algorithm deprecation, or organizational changes. The trust agreement must define how these updates are performed so all parties understand the process.

Related Controls:

- CKR-2 requires that the update process be executed over an authenticated, protected channel.
- ICKM-2 establishes the same requirement for initial key exchange.

**Assessment objective**

Determine whether the trust agreement artifact(s) define the allowable update process for identifiers and cryptographic keys.

**Assessment methods**

- EXAMINE: Examine trust agreement artifact(s) for documentation of the allowable key and identifier update process, including permitted methods, timing, and any restrictions.
