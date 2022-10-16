# Passager Password Manager Backend

This project is a set of web services to use Passager Password Manager within an organization, enabling password sharing capabilities and other features which are available only when Passager doesn't run in local mode.

## Reasons to build this

This project's unique mission is to replace firebase as the default backend for Passager Password Manager.

Before developing this project, Passager was able both to store passwords locally using localStorage, and in the cloud by using firebase as the main backend.

Unfortunatelly, Firebase was not the ideal solution when compiling Passager as a mobile app using Capacitor, as the Firebase web SDK is not 100% compatible and the login process doesn't work without requiring third party plugins that are complex to configure.

This set of basic web services offer a way to use Passager remotely, even when it is compiled as a mobile app. 

Additionally, with this new approach each organization is able to serve these services and maintain their own database and infrastructure, so maintainers of Passager does not need to maintain and be responsible for a set of centralized systems, which allow the maintainers to focus their efforts in Passager's Open Source development, instead of focusing them on offering a high-available service and comply with data processing laws and regulations.

## Required configuration

These services need to be configured before running. 

Configuration is stored in a file named `.env`. 

A template is provided (`.env_template`), please rename it to `.env` and complete it with real configuration parameters.

Do not forget to install dependencies by running `npm i` inside each service directory.

## Available services

* `authentication-service`: Completes the login process by sending a code via e-mail, and generating a jwt token once the e-mail is validated. 
* `documents-service`: Allows to perform basic CRUD operations to a set of database schemas while ensuring that specific permission rules are meet.