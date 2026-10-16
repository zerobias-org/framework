If an IdP response does not satisfy the RP's required xALs, the RP must have a mechanism for handling the mismatch. Acceptable mechanisms include denying the request or redirecting the user to an exception-handling process.

**Assessment objective**

Determine that the RP has a defined mechanism for handling cases where IdP responses do not meet the RP's requested or required xAL parameters.

**Assessment methods**

- EXAMINE: Examine the RP's documentation and access-control logic to confirm the presence of a defined mechanism, such as request rejection, access denial, or an exception-handling workflow (such as a step-up mechanism) for transactions that do not satisfy the RP's minimum xAL requirements.
- TEST: Test by presenting transactions in which asserted xALs do not meet the RP's required minimums, or required xAL information is missing, and verify that the RP invokes the documented handling mechanism and does not grant protected access unless and until the RP's documented exception process is successfully completed.
