This requirement mandates that the RP determine the minimum IAL, AAL, and FAL it is willing to accept for access to any offered functionality through the Digital Identity Risk Management (DIRM) process outlined in NIST SP 800-63-4, Section 3, which requires RPs to conduct impact assessments, select initial xALs based on impact, tailor controls if needed, and document decisions in a Digital Identity Acceptance Statement (DIAS). The RP must then assess all IdP assertions to ensure these xALs have been met before granting access to protected resources. The RP must validate the indicated xALs in the assertion (or trust agreement for fixed xALs) against its required minimums, denying access if these requirements are not met. If no xAL claim is made, the RP must treat it as "no level" without defaults (e.g., no assumption of IAL1).

**Assessment objective**

Determine whether the RP defines minimum acceptable xALs and validates that incoming assertions meet these requirements before granting access.

**Assessment methods**

- EXAMINE: Examine the RP's Digital Identity Acceptance Statement (DIAS) to confirm that it specifies the minimum IAL, AAL, and FAL required for each offered function. Verify that RP configuration, authorization logic, or policy enforcement mechanisms use these DIAS-defined minimums when evaluating xAL information. Confirm that the RP's evaluation process accepts xALs conveyed through assertions, trust-agreement terms, or both, consistent with how the IdP provides them.
- TEST: Test by presenting transactions where the xALs meet the DIAS-defined minimums - verify that access is granted.
- TEST: Test by presenting transactions where any xAL falls below the DIAS-defined minimum - verify that access is denied.
- TEST: Test by presenting transactions where required xAL information is absent from both the assertion and trust-agreement terms - verify that access is denied.
