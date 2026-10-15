The bound authenticator must be registered to the RP subscriber account before it can be verified during an FAL3 transaction.

**Assessment objective**

Determine whether the RP subscriber account includes a reference to a bound authenticator before the RP accepts an FAL3 bound authenticator assertion.

**Assessment methods**

- EXAMINE: Examine the RP's FAL3 assertion processing logic to verify that it checks for a bound authenticator reference in the RP subscriber account before accepting the assertion.
- TEST: Test by attempting to process an FAL3 assertion with a bound authenticator indicator for an RP subscriber account that has no bound authenticator reference. Verify the RP rejects the assertion.
