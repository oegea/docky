# Passager Password Manager Backend

This is a set of web services to use Passager Password Manager within an organization, enabling sharing capabilities and other interesting features.

## Reasons to build a service

This is a rapidly-developed service. It's unique mission is to replace firebase as the default backend for passager, an open source password manager. 

Before developing this set of services, Passager was able both to store passwords locally and to work in cloud using firebase as the main backend.

Unfortunatelly, Firebase was not the ideal solution when compiling Passager as a mobile app, and many problems arouse when running Passager on a mobile device and trying to use the cloud storage.

This set of basic web service offers a way to use Passager storing passwords remotely, and being able to share them, without limiting compatibility to browsers, and enabling those features on mobile apps too. 

Additionally, with this new approach each organization is able to serve these services and maintain their own passager database and infrastructure, so maintainers of Passager does not need to maintain systems and worry too much about personal data processing.

## Required configuration

Environment variables are required `.env` to run services properly. A template is provided (`.env_template`), please rename it to `.env` and complete it with real configuration parameters.

## Available services

* `pass-authentication`: Completes the log in process by sending a code via e-mail, generates an authentication token once the e-mail is validated. 