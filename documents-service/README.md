# What is docky documents service

Docky documents service is a library to quickly provide an extensible REST API to make CRUD operations on a non-relational database, and build apps without investing huge efforts on the backend side.

It works in a similar way to Firebase, offering a set of endpoints with which perform CRUD operations on a non-relational database (currently MongoDB is the only supported).

These methods can be extended to check if the operation is authorized under specific conditions and credentials.

# How to install

Install the package by running:

```bash
npm install @useful-tools/documents-service
```

# How to use

First, it is needed to import some methods and constants:

```javascript
import {loadConfig, startDocumentsService, NativeEventBusRepository, TYPE_QUERY} from '@useful-tools/docky-documents-service/dist'
```

Then, it is needed to load configuration parameters by using the `loadConfig` method:

```javascript
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
    authAllowedEmails: process.env.AUTH_ALLOWED_EMAILS,
    docsPort: Number(process.env.DOCS_PORT)
})
```

Importing these parameters from an .env file is encouraged.
Some of these parameters are required by the authentication service, however although them are not required by the documents service, it is needed to include them when calling the `loadConfig` method.

Then, it is needed to start the documents service by calling the `startDocumentsService` method:

```javascript
startDocumentsService()
```

# How to authorize or deny an operation

The documents service offers a mechanism to authorize or deny an operation, by using the `NativeEventBusRepository` class.

The `GET_OPERATION_PERMISSIONS` query is emitted every time an operation is performed, this way it is possible to it, and return a boolean promise indicating if the operation is authorized (`true`) or not (`false`).

```javascript

const onGetOperationPermissions = async (type: string, name: string, payloadObject: any): Promise<boolean> => {
    try {
        const {
            collection,
            currentUserId,
            id,
            operationType,
            payload
        } = payloadObject

        if (currentUserId === null) {
            console.log('Trying to query without being logged in')
            return false
        }
        
        return true

    } catch (error) {
        console.error(error)
        return false
    }
}

eventBusRepository.subscribe(TYPE_QUERY, 'GET_OPERATION_PERMISSIONS', onGetOperationPermissions)
```

This documentation is still under construction. While it is finished, you can take a look to Passager's REST API, which is built on top of Docky's documents service:

* [Passager's REST API](https://github.com/oegea/passager-password-manager/tree/main/backend)