# Passager Password Manager Backend

This is a set of web services to use Passager Password Manager within an organization, enabling sharing capabilities and other interesting features.

## Required configuration

Environment variables are required `.env` to run services properly. A template is provided (`.env_template`), please rename it to `.env` and complete it with real configuration parameters.

## Available services

* `pass-authentication`: Completes the log in process by sending a code via e-mail. 