The indicator signals to the RP that it must verify a bound authenticator before accepting the assertion.

(Per ARTC-8, an FAL3 assertion must include either a HoK key identifier or a bound authenticator indicator.)

**Assessment objective**

Determine whether the IdP includes an indicator in the assertion when the assertion is to be used with a bound authenticator at FAL3.

**Assessment methods**

- EXAMINE: Examine the assertion structure to verify inclusion of a bound authenticator indicator when bound authenticators are used at FAL3.
- TEST: Test by requesting an FAL3 assertion for use with a bound authenticator. Verify the assertion contains the expected bound authenticator indicator.
