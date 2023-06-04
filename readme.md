# Docky

[![License](https://shields.io/badge/license-AGPL-green)](LICENSE.md)
![Code Size](https://shields.io/github/languages/code-size/oegea/docky) 
![Last Commit](https://shields.io/github/last-commit/oegea/docky)

## Available documentation

- [Home](./readme.md)
- [Docky authentication service](./authentication-service/README.md)
- [Docky documents service](./documents-service/README.md)

## About Docky

Docky is a tool to quickly build a fully-functional REST API without needing to invest time on setting up specific endpoint and operations.

Instead of that, it brings a Firebase-like approach, offering a `documents` service through which perform CRUD operations on a database.

Additionally, an `authentication` service is offered to generate jwt tokens after validating the user's e-mail ownership.

All of this, offering extensible mechanisms to customize the service to meet the requirements of the application.

## Main components

* [@useful-tools/authentication-service](./authentication-service/) - Offers a basic authentication flow, in which the user is required to validate his e-mail address by confirming a code sent to it. Once a user is logged, a JWT token is signed and provieded to the client. This is an optional component, and is not required in case the final application does not need to authenticate users, or in case a third-party authentication service is preferred to manage the authentication of the users.
* [@useful-tools/documents-service](./documents-service/) - Offers a set of endpoints to perform CRUD operations on a database. It is the core component of Docky. The documents service offers the possibility to extend the default behavior of the endpoints by defining when an operation is authorized or denied, additionally it is possible to add custom Express middlewares or add custom endpoints by interacting with the Express app object.

## Install and running it

Please refer to the documentation of each package to know how to use it:

* [@useful-tools/authentication-service](./authentication-service/)
* [@useful-tools/documents-service](./documents-service/)

## About @useful-tools

This is part of [@useful-tools](https://github.com/oegea/useful-tools), a set of NPM packages intended to provide quick-to-learn and to use tools to build javascript applications.
