Assessment is required when: The validation keys and configuration information are retrieved over a network connection.

In many federation protocols, this is accomplished by the RP fetching the public keys and configuration data from a URL specified in the trust agreement artifact(s) as controlled by the IdP or offered on the IdP's behalf.

It is also possible for the RP to be configured directly with this information in a manual fashion, whereby the RP's system administrator enters the IdP information directly into the RP software's configuration.

**Assessment objective**

Determine whether the RP retrieves IdP keys and configuration information over an authenticated protected channel from a location specified in the trust agreement artifact(s).

**Assessment methods**

- EXAMINE: Examine the relevant trust agreement artifact(s) to determine the location(s) associated with the IdP's identifier for retrieval of validation keys and configuration information. Examine the RP's federation configuration to verify that it retrieves keys and configuration information only from the specified location(s). The requirement that an authenticated protected channel be used is satisfied by ICKM-2.
