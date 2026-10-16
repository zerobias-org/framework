Assessment is required when: Derived attribute values are used.

Derived attribute values exist to preserve privacy by disclosing only what is necessary. If the underlying value is also disclosed, the privacy benefit is negated. For example, if an RP only needs to know a subscriber is over 21, disclosing the full date of birth defeats the purpose.

**Assessment objective**

Determine whether derived attribute values are provided without disclosing the underlying attribute value.

**Assessment methods**

- EXAMINE: Examine a sample or documentation describing IdP assertions and identity API responses containing derived attribute values. For each derived attribute (e.g., "over 21"), verify that the underlying attribute value (e.g., date of birth) is not also included in the same response.
- TEST: Test by request a derived attribute value from the IdP. Verify the response contains only the derived value and does not include the underlying attribute value.
