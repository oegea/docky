# Passager Password Manager Backend

This is a set of web services to use Passager Password Manager within an organization, enabling sharing capabilities and other interesting features without requiring a centralized services offered by the app's maintainers.

## Reasons to build this

This project unique mission is to replace firebase as the default backend for passager, an open source password manager. 

Before developing this set of services, Passager was able both to store passwords locally using localStorage, and in the cloud by using firebase as the main backend.

Unfortunatelly, Firebase was not the ideal solution when compiling Passager as a mobile app, and many problems aroused when running Passager on a mobile device and trying to use the cloud storage.

This set of basic web services offer a way to use Passager storing passwords remotely, and being able to share passwords with other people, without limiting compatibility to browsers, and enabling those features when Passager is executed as a mobile app. 

Additionally, with this new approach each organization is able to serve these services and maintain their own passager database and infrastructure, so maintainers of Passager does not need to maintain systems and worry much about personal data processing.

## Required configuration

These services need to be configured before running. Configuration is stored in a `.env` file. A template is provided (`.env_template`), please rename it to `.env` and complete it with real configuration parameters.

## Available services

* `authentication-service`: Completes the log in process by sending a code via e-mail, generates a jwt token once the e-mail is validated. 