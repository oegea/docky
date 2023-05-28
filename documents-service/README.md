# What is docky documents service

Docky documents service is a tool to quickly provide an extensible REST API to make CRUD operations on a database, and build apps without investing huge efforts on the backend side.

It works in a similar way to Firebase, as it offers a set of endpoints with which perform CRUD operations on the database. Those endpoints, can be extended to customize the behavior of the API. For example, it is possible to define when an operation is authorized or denied, in a similar way to how Firestore rules work.

Additionally, it is possible to add custom endpoints to the API, by using the Express app object, or to add custom Express middlewares.

# Supported databases

Currently, only MongoDB is supported as database to store documents. However, as Docky implements a kind of clean architecture, it is possible to add support for other databases by implementing new repositories.

# Main concepts

## Documents

A document is a JSON object stored in the database base. Every document has an automatically generated unique id, and belongs to a collection of the database.
Generally, a collection corresponds to a table in a relational database, or to a collection in a non-relational database, and a document is represented in the database as a row of a table or a document of a collection.

## Subdocuments

A subdocument is a JSON object that is contained inside a subcollection, which belongs to a document. A subdocument is very similar to a document, in the sense that it has an automatically generated unique id. The only difference is that it is related with a parent document.

In a non-relational database, a subdocument is normally represented as an object contained inside an array of the parent document. In a relational database, a subdocument is represented as a row of a table, which has a foreign key to the parent document.

Please note that subcollections should not contain a large number of subdocuments. Its use is intended to store a small number of items related to the parent document. In case a large number of items need to be stored, it is recommended to create a new collection, and to store the items as documents of that collection.

# Available endpoints

## Document CRUD operations

Please refer to the following table to know which endpoints are available to perform CRUD operations on documents:

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /documents/:collection/:id | Returns the document with the specified id, from the specified collection. |
| POST | /documents/:collection | Creates a new document in the specified collection. The document data must be provided in the request body. Please note that id cannot be provided in the request body, as it is automatically generated. |
| PATCH | /documents/:collection/:id | Updates the document with the specified id, from the specified collection. The document data must be provided in the request body. Please note that id cannot be updated. |
| POST | /documents/:collection/find | Returns the documents from the specified collection, which match the specified query. The query must be provided in the request body, and must consist on a set of key-value pairs that will be used to filter the documents. |
| DELETE | /documents/:collection/:id | Deletes the document with the specified id, from the specified collection. |

## Subdocument CRUD operations

Please refer to the following table to know which endpoints are available to perform CRUD operations on subdocuments:

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /documents/:collection/:parentId/:subcollection/:id | Returns the subdocument with the specified id. The subdocument must belong to the specified parent document, and to the specified subcollection. |
| POST | /documents/:collection/:parentId/:subcollection | Creates a new subdocument in the specified subcollection. The subdocument data must be provided in the request body. Please note that id cannot be provided in the request body, as it is automatically generated. |
| PATCH | /documents/:collection/:parentId/:subcollection/:id | Updates the subdocument with the specified id. The subdocument must belong to the specified parent document, and to the specified subcollection. The subdocument data must be provided in the request body. Please note that id cannot be updated. |
| POST | /documents/:collection/:parentId/:subcollection/find | Returns the subdocuments from the specified subcollection, which match the specified query. The query must be provided in the request body, and must consist on a set of key-value pairs that will be used to filter the subdocuments. |
| DELETE | /documents/:collection/:parentId/:subcollection/:id | Deletes the subdocument with the specified id. The subdocument must belong to the specified parent document and subcollection. |

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

const eventBusRepository = new NativeEventBusRepository()
eventBusRepository.subscribe(TYPE_QUERY, 'GET_OPERATION_PERMISSIONS', onGetOperationPermissions)
```

This documentation is still under construction. While it is finished, you can take a look to Passager's REST API, which is built on top of Docky's documents service:

* [Passager's REST API](https://github.com/oegea/passager-password-manager/tree/main/backend)