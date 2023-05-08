# Docky

[![License](https://shields.io/badge/license-AGPL-green)](LICENSE.md)
![Code Size](https://shields.io/github/languages/code-size/oegea/docky) 
![Last Commit](https://shields.io/github/last-commit/oegea/docky)

## About @useful-tools

This is part of [@useful-tools](https://github.com/oegea/useful-tools), a set of NPM packages intended to provide quick-to-learn and to use tools to build javascript applications.

## About Docky

Docky are a set of NPM packages which allow to quickly build a fully-functional REST API without needing to invest time on setting up specific endpoint and operations.

Instead of that, it brings a Firebase-like approach, offering a `documents` service through which perform CRUD operations on a non-relational database.

Additionally, an `authentication` service is offered to generate jwt tokens after validating the user's e-mail ownership.

All of this, offering an extensible mechanism that allows to define wethever an operation is authorized or not. 

## How to use it

Install required packages by running:

```bash
npm install @useful-tools/authentication-service @useful-tools/documents-service
```

Refer to the documentation of each package to know how to use it:
* [@useful-tools/authentication-service](./authentication-service/)
* [@useful-tools/documents-service](./documents-service/)