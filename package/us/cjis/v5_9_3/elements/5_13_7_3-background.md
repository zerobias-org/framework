Device certificates are often used to uniquely identify mobile devices using part of a public key pair on the device in the form of a public key certificate. While there is value to ensuring the device itself can authenticate to a system supplying CJI, and may provide a critical layer of device identification or authentication in a larger scheme, a device certificate alone placed on the device shall not be considered valid proof that the device is being operated by an authorized user.

When certificates or cryptographic keys used to authenticate a mobile device are used in lieu of compensating controls for advanced authentication, they shall be:

- 1\. Protected against being extracted from the device
- 2\. Configured for remote wipe on demand or self-deletion based on a number of unsuccessful login or access attempts
- 3\. Configured to use a secure authenticator (i.e., password, PIN) to unlock the key for use.
