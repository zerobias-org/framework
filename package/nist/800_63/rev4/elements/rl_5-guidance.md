Applies to verifiers that reset the unsuccessful authentication count after successful authentication.

**Assessment objective**

Prevent AAL escalation due to authenticator retry count reset.

**Assessment methods**

- TEST: Test by authenticating unsuccessfully and then successfully with a given authenticator and examine the maximum AAL at which it can be used to verify that it does not increase.
