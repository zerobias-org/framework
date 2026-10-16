**Assessment objective**

Ensure that obtaining a new out-of-band secret does not bypass the rate limiting mechanism.

**Assessment methods**

- TEST: Test by making a large number of incorrect authentication attempts and ensure that number and/or rate of attempts is limited even if a new authentication secret is obtained.
