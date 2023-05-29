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
    commonAppName: process.env.COMMON_APP_NAME,
    commonOrganizationName: process.env.COMMON_ORGANIZATION_NAME,
    commonMongoDbConnectionString: process.env.COMMON_MONGODB_CONNECTION_STRING,
    commonTokenSecret: process.env.COMMON_TOKEN_SECRET,
    commonMongoDbDatabase: process.env.COMMON_MONGODB_DATABASE,
    authCollection: process.env.AUTH_COLLECTION,
    authPort: Number(process.env.AUTH_PORT),
    authSmtpHost: process.env.AUTH_SMTP_HOST,
    authSmtpPort: Number(process.env.AUTH_SMTP_PORT),
    authSmtpUser: process.env.AUTH_SMTP_USER,
    authSmtpPassword: process.env.AUTH_SMTP_PASSWORD,
    authSmtpSender: process.env.AUTH_SMTP_SENDER,
    authLimitAccessByEmail: Boolean(process.env.AUTH_LIMIT_ACCESS_BY_EMAIL),
    authAllowedDomains: process.env.AUTH_ALLOWED_DOMAINS,
    authAllowedEmails: process.env.AUTH_ALLOWED_EMAILS
})

startAuthenticationService()
```

This documentation is still under construction. While it is finished, you can take a look to Passager's REST API, which is built on top of Docky's authentication service:

* [Passager's REST API](https://github.com/oegea/passager-password-manager/tree/main/backend)
