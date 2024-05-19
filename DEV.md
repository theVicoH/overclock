## Development Guide
This file provides instructions for setting up and running the API, web, and mobile applications. It also includes information on managing database migrations, generating ORM and generating documentation.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running the Applications](#running-the-applications)
  - [Start the Database](#start-the-database)
  - [Start the API](#start-the-api)
  - [Start the Web Application](#start-the-web-application)
  - [Start the Mobile Application](#start-the-aobile-application)
- [Database Migrations](#database-migrations)
  - [Apply Migrations](#apply-migrations)
  - [Create a New Migration](#create-a-new-migration)
  - [Rollback Migrations](#rollback-migrations)
- [Generate ORM](#generate-orm)
- [Generate API Documentation](#generate-api-documentation)
- [Linting the Code](#linting-the-code)
  - [Lint All Code](#lint-all-code)
  - [Lint the API](#lint-the-api)
  - [Lint the Web Application](#lint-the-web-application)
  - [Lint the Mobile Application](#lint-the-mobile-application)

## Prerequisites

Make sure you have the following tools installed:

- [Go](https://go.dev)
- [Docker](https://www.docker.com)
- [Node.js](https://nodejs.org)
- [pnpm](https://pnpm.io)
- [sqlc](https://sqlc.dev)
- [migrate](https://github.com/golang-migrate/migrate)
- [swag](https://github.com/swaggo/swag)
- [golangci-lint](https://golangci-lint.run)

## Setup

1. Clone the repository:
```sh
git clone https://github.com/clementpnn/Overclock.git
cd Overclock

```

2. Install dependencies for the web application:
```sh
cd web
pnpm install
cd ..
```

3. Install dependencies for the mobile application:
```sh
cd mobile
pnpm install
cd ..
```

## Running the Applications

### Start the Database

To start the database, run the following command:
```sh
make db
```

### Start the API

To start the API, run the following command:
```sh
make dev-api
```

### Start the Web Application

To start the web application, run the following command:
```sh
make dev-web
```

### Start the Mobile Application

To start the mobile application, run the following command:
```sh
make dev-mobile
```

## Database Migrations

### Apply Migrations
To apply all database migrations and bring the database schema up to date, run the following command:
```sh
make db-up
```

### Create a New Migration
To create a new database migration, run the following command and follow the prompts:
```sh
make db-migrate
```

### Rollback Migrations
To rollback the last set of database migrations, run the following command:
```sh
make db-down
```

## Generate ORM
To generate the Sqlc ORM for the API, run the following command:
```sh
make orm
```

## Generate API Documentation
To generate the Swagger documentation for the API, run the following command:
```sh
make swag
```

## Linting the Code

### Lint All Code
To lint all code (API, web, and mobile), run the following command:
```sh
make lint
```

### Lint the API
To lint the API code, run the following command:
```sh
make lint-api
```

### Lint the Web Application
To lint the web application code, run the following command:
```sh
make lint-web
```

### Lint the Mobile Application
To lint the mobile application code, run the following command:
```sh
make lint-mobile
```