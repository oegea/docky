# Docky documentation

- [Home](../readme.md)
- [Docky authentication service](../authentication-service/README.md)
- [Docky documents service](../documents-service/README.md)

# What is docky authentication service

Docky authentication service is a library to quickly provide an REST API to authenticate users and log them in.

It works by sending a validation code by e-mail to the user, and then validating it by sending it back to the API. If the code is valid, a JWT token is generated and returned to the user.

This JWT token can then be used to authorize operations on the documents service.

# How to install

Install the package by running:

```bash
npm install @useful-tools/authentication-service
```

# How to use

To run the authentication service, it is needed to load the service configuration, and then start it.

```javascript
import * as dotenv from 'dotenv'
import {loadConfig, startAuthenticationService} from '@useful-tools/docky-authentication-service/dist'

dotenv.config({ path: '../.env' })

loadConfig({
    commonAppName: 'My app name',
    commonDisableCors: false, /* true to disable cors access */
    commonOrganizationName: 'My org name',
    commonMongoDbConnectionString: 'Connection string to mongo',
    commonTokenSecret: 'JWT token secret',
    commonMongoDbDatabase: 'MongoDB database name',
    authCollection: 'Collection name to store authentication details',
    authPort: Number(3001),
    authSmtpHost: 'SMTP host to send emails',
    authSmtpPort: Number(465),
    authSmtpUser: 'SMTP user',
    authSmtpPassword: 'SMTP password',
    authSmtpSender: 'sender@example.com'
    authLimitAccessByEmail: true, /* true to limit who can log in with the two following params */
    authAllowedDomains: 'my-organization-domain.com,other-organization-domain.com',
    authAllowedEmails: 'specific-allowed-email@gmail.com,other-allowed-email@outlook.com'
})

startAuthenticationService()
```
