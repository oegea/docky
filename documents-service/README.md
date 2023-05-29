- [Go back](../README.md)

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

# Quick example

A good entry point to understand how Docky documents service works, is to see a quick example. 

The following example shows how to create a basic `docky` service with plain javascript, note that the `docky` package must be installed in order to run the example:

```javascript
import {loadConfig, startDocumentsService, NativeEventBusRepository, TYPE_QUERY} from '@useful-tools/docky-documents-service/dist/index.js'

import { baseConfig } from './defaultConfig.js'

loadConfig({
    commonAppName: 'Random app name',
    commonOrganizationName: 'Random organization name',
    commonMongoDbConnectionString: 'mongodb+srv://user:password@server.mongodb.net/?retryWrites=true&w=majority',
    commonMongoDbDatabase: 'databaseName',
    docsPort: 3002
})

const eventBusRepository = new NativeEventBusRepository()

const onGetOperationPermissions = async (type, name, payloadObject) => {
    return true
}

eventBusRepository.subscribe(TYPE_QUERY, 'GET_OPERATION_PERMISSIONS', onGetOperationPermissions)
startDocumentsService()
```

It is recommended to make this example work, and then follow the next sections to understand how it works and how to deeply customize it.

# How to install

Install the package by running:

```bash
npm install @useful-tools/documents-service
```

# How to use

## Import required methods and constants

First, it is needed to import some methods and constants:

```javascript
import {loadConfig, startDocumentsService, NativeEventBusRepository, TYPE_QUERY} from '@useful-tools/docky-documents-service/dist/index.js'
```

## Load configuration parameters

Before starting the server, it is needed to load configuration parameters by using the `loadConfig` method:

```javascript
loadConfig({
    commonAppName: 'My App Name',
    commonOrganizationName: 'My organization name',
    commonMongoDbConnectionString: 'mongodb connection string',
    commonTokenSecret: 'Authentication secret token with which jwt signature can be verified',
    commonMongoDbDatabase: 'MongoDB database name',
    docsPort: Number(3002)
})
```
Please refer to the following table to know which configuration parameters are available:

| Parameter | Type | Description |
| --- | --- | --- |
| commonAppName | `string` | Name of the app. |
| commonOrganizationName | `string` | Name of the organization that hosts the app. May be the same as the app name, or may be your own name if you publish the app as an independent developer. |
| commonMongoDbConnectionString | `string` | Connection string to connect to the MongoDB database. |
| commonTokenSecret | `string` | Secret token with which jwt signature can be verified, it is important to be sure that it matches with the authentication service configuration. Leave it as undefined if you do not want to use the built-in authentication service. |
| commonMongoDbDatabase | `string` | Name of the MongoDB database. |
| docsPort | `number` | Port in which the documents service will be listening. |


## Start the server

Once the configuration is loaded, start the server by using the `startDocumentsService` method:

```javascript
const app = startDocumentsService() // Returns an express app object
```

# Authorizing or denying operations

## When to use it

When making CRUD operations directly from the frontend, it is needed to limit certain operations. For example, in a `chats` collection, the system should ensure that a user can only access chat sessions in which they have participated.

In a similar way, other operations like deleting documents or any other CRUD operation should pass a validation layer in order to ensure that the system is safe enought.

## How to use it

The documents service offers a mechanism to authorize or deny an operation, by using the `NativeEventBusRepository` class.

The `GET_OPERATION_PERMISSIONS` query is emitted every time an operation is performed and needs to be validated. By returning a boolean promise indicating if the operation is authorized (`true`) or not (`false`), the app can be securized.

## Example

```javascript

const onGetOperationPermissions = async (type: string, name: string, payloadObject: any): Promise<boolean> => {
    try {
        const {
            collection,
            currentUserId,
            subCollection,
            parentId,
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

## Payload object

The previous example shows a validation function named `onGetOperationPermissions` that is executed every time a validation needs to be verified.

This method, returns a promise with a boolean value, that will determine if the operation is authorized or not.

All the information regarding the operation is contained in the `payloadObject` parameter. This parameter, contains the kind of operation that is being verified, the current logged user (if any), details about the document or subdocument is being accessed, and the operation payload which is named `payload` and is contained inside the `payloadObject` parameter.

The following table shows the structure of the `payloadObject` parameter:

| Property | Type | Description | Available when |
| --- | --- | --- | --- |
| currentUserId | `string` | Email or other readable identifier of the current logged user. | Only when the user is logged in. Otherwise will be null. |
| operationType | `string` | Type of operation that is being verified. | Always |
| collection | `string` | Name of the collection in which the operation is being performed. | Always |
| subCollection | `string` | Name of the subcollection in which the operation is being performed. | Only when working with subdocuments. |
| parentId | `string` | Id of the parent document. | Only when working with subdocuments. |
| id | `string` | Id of the document or subdocument that is being accessed. | Always. When working with subdocuments will refer to the subdocument identifier. |
| payload | `any` | Payload of the operation. Generally will contain the request body data. | Always |

## Available operation types

The following table shows the available operation types:

| Operation type name | Description |
| --- | --- |
| `'create_document'` | When a new document is created. |
| `'create_subdocument'` | When a new subdocument is created. |
| `'delete_document'` | When a document is deleted. |
| `'delete_subdocument'` | When a subdocument is deleted. |
| `'find_document'` | When a query is performed to find documents. |
| `'find_subdocument'` | When a query is performed to find subdocuments. |
| `'get_document'` | When a specific document is retrieved. |
| `'get_subdocument'` | When a specific subdocument is retrieved. |
| `'patch_document'` | When a document is updated. |
| `'patch_subdocument'` | When a subdocument is updated. |

# Querying the database

Wether the app is validating a standard CRUD operation, or is offering custom endpoints, it is possible to query the database by using an abstracted layer offered by `docky`.

## Find a document

`FIND_DOCUMENT`query can be used to find documents in a collection. The following example shows how to invoke the query by using the event bus:

```javascript
const eventBusRepository = new NativeEventBusRepository()

// Find folders belonging to the current user
const result = await eventBusRepository.query('FIND_DOCUMENT', {
    collection: 'folders',
    criteria: {
        owner: currentUserId
    }
})

const existingDocuments = result[0]
console.dir(existingDocuments)
```

## Find a subdocument

`FIND_SUBDOCUMENT`query can be used to find subdocuments in a collection. The following example shows how to invoke the query by using the event bus:

```javascript
const result = await eventBusRepository.query('FIND_SUBDOCUMENT', {
    collection: 'folders',
    parentId: 'real id here',
    subCollection: 'files',
    criteria: {
        owner: currentUserId
    }
})
const foundFiles = result[0]
const firstFile = foundFiles[0]
```

## Get a specific document

`GET_DOCUMENT`query can be used to get a specific document by its id. The following example shows how to invoke the query by using the event bus:

```javascript
const result = await eventBusRepository.query('GET_DOCUMENT', {
    collection: 'folders',
    id: 'put here a real id'
})

const document = result[0]
```

## Get a specific subdocument

`GET_SUBDOCUMENT`query can be used to get a specific subdocument by its id. The following example shows how to invoke the query by using the event bus:

```javascript
const result = await eventBusRepository.query('GET_SUBDOCUMENT', {
    collection: 'folders',
    parentId: 'real id here',
    subCollection: 'files',
    id: 'subdocument id here' 
});

const subdocument = result[0]
```

## Delete a document

`DELETE_DOCUMENT`query can be used to delete a specific document by its id. The following example shows how to invoke the query by using the event bus:

```javascript
const result = await eventBusRepository.query('DELETE_DOCUMENT', {
    collection: 'folders',
    id: 'put here a real id'
})
```

## Delete a subdocument

`DELETE_SUBDOCUMENT`query can be used to delete a specific subdocument by its id. The following example shows how to invoke the query by using the event bus:

```javascript
const result = await eventBusRepository.query('DELETE_SUBDOCUMENT', {
    collection: 'folders',
    parentId: 'real id here',
    subCollection: 'files',
    id: 'subdocument id here' 
});
```

## Create a document

`CREATE_DOCUMENT`query can be used to create a new document. The following example shows how to invoke the query by using the event bus:

```javascript
const result = await eventBusRepository.query('CREATE_DOCUMENT', {
    collection: 'folders',
    document: {
        name: 'New folder',
        owner: currentUserId
    }
})
```

Please note that the `id` field will be automatically generated by the database and cannot be indicated in the `document` object.

## Create a subdocument

`CREATE_SUBDOCUMENT`query can be used to create a new subdocument. The following example shows how to invoke the query by using the event bus:

```javascript
const result = await eventBusRepository.query('CREATE_SUBDOCUMENT', {
    collection: 'folders',
    parentId: 'real id here',
    subCollection: 'files',
    document: {
        name: 'New file',
        owner: currentUserId
    }
})
```

Please note that the `id` field will be automatically generated by the database and cannot be indicated in the `document` object.

## Update a document

`PATCH_DOCUMENT`query can be used to update a document. The following example shows how to invoke the query by using the event bus:

```javascript
const result = await eventBusRepository.query('PATCH_DOCUMENT', {
    collection: 'folders',
    id: 'put here a real id',
    document: {
        name: 'New folder name'
    }
})
```

Please note that those fields that are not included in the `document` object will not be modified. There are some fields that cannot be modified, such as the `id` field.

## Update a subdocument

`PATCH_SUBDOCUMENT`query can be used to update a subdocument. The following example shows how to invoke the query by using the event bus:

```javascript
const result = await eventBusRepository.query('PATCH_SUBDOCUMENT', {
    collection: 'folders',
    parentId: 'real id here',
    subCollection: 'files',
    id: 'subdocument id here',
    document: {
        name: 'New file name'
    }
})
```

Please note that those fields that are not included in the `document` object will not be modified. There are some fields that cannot be modified, such as the `id` field.

# Extending the Express app

To achieve some complex customizations, it may be needed to directly interact with the Express app object.

This can be done with the following methods:

## addMiddleware

Adds a middleware to the Express app object. It will run after validating authentication, and before `docky` code.

```javascript
import {addMiddleware} from '@useful-tools/docky-documents-service/dist/index.js'

addMiddleware((req, res, next) => {
    console.log('This will be executed before docky code')
    next()
})
```

Please note that it must be run before starting the server.

## getExpressApp

Returns the Express app object. This method can be used to add custom routes to the Express app object and must be run before starting the server.

It can be used to make other kind of customizations too, as it is a non-modified Express app object.

```javascript
import {getExpressApp} from '@useful-tools/docky-documents-service/dist/index.js'

const app = getExpressApp()
```

## setupExpressService

This method MUST NOT be executed if the app uses the `startDocumentsService` method to start accepting requests. The `startDocumentsService` method already calls `setupExpressService` internally.

`setupExpressService` registers in the Express app object all existing endpoints.

This method is useful when it is needed to finish the initialization of `docky` without starting listening to petitions. For example, in case `docky` needs to be wrapped by an adaptor library to serve it over a different protocol or service (i.e. adapting `docky` to AWS Lambda).

```javascript
import {setupExpressService} from '@useful-tools/docky-documents-service/dist/index.js'

setupExpressService()
```

This method should be called only when it is required, and must be executed after any `addMiddleware` statement.

# Projects using Docky

There are some projects that use Docky as a base to build their own services. You can check them out to see how Docky is used in real projects:

* [Passager's REST API](https://github.com/oegea/passager-password-manager/tree/main/backend)