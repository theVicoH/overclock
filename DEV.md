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

2. Install dependencies for the web et mobile application:
```sh
pnpm install
```

## Running the Applications

### Start the Database

To start the database, run the following command:
```sh
make db
```

### Start Application

To start the web application, run the following command:
```sh
pnpm run dev
```
and choose which app you want to start.

### Start the API

To start the API, run the following command:
```sh
pnpm run api
```

### Start the Client Application

To start the client application, run the following command:
```sh
pnpm run client
```

### Start the Web Application

To start the web application, run the following command:
```sh
pnpm run web
```

### Start the Mobile Application

To start the mobile application, run the following command:
```sh
pnpm run mobile
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
To lint all code (API, web, mobile and common), run the following command:
```sh
pnpm run lint
```

### Lint the API
To lint the API code, run the following command:
```sh
pnpm run lint-api
```

### Lint the Web Application
To lint the web application code, run the following command:
```sh
pnpm run lint-web
```

### Lint the Mobile Application
To lint the mobile application code, run the following command:
```sh
pnpm run lint-mobile
```

### Lint the Common Application
To lint the common application code, run the following command:
```sh
pnpm run lint-common
```

## Format the Client Code

### Format Client Code
To format client code (web, mobile and common), run the following command:
```sh
pnpm run prettier
```

### Format the Web Application
To format the web application code, run the following command:
```sh
pnpm run prettier-web
```

### Format the Mobile Application
To format the mobile application code, run the following command:
```sh
pnpm run prettier-mobile
```

### Format the Common Application
To format the common application code, run the following command:
```sh
pnpm run prettier-common
```

## Type check the Client Code

### Type check Client Code
To type check client code (web, mobile and common), run the following command:
```sh
pnpm run type
```

### Type the Web Application
To type the web application code, run the following command:
```sh
pnpm run type-web
```

### Type the Mobile Application
To type the mobile application code, run the following command:
```sh
pnpm run type-mobile
```

### Type the Common Application
To type the common application code, run the following command:
```sh
pnpm run type-common
```

## Run Lint + Prettier + Type
To run the lint, the prettier and the type command run the following command:
```sh
pnpm run ci
```

## Test check the Client Code

### Test check Client Code
To test client code (web, mobile and common), run the following command:
```sh
pnpm run test
```

### Test the Web Application
To test the web application code, run the following command:
```sh
pnpm run test-web
```

### Tes the Mobile Application
To test the mobile application code, run the following command:
```sh
pnpm run test-mobile
```

### Test the Common Application
To test the common application code, run the following command:
```sh
pnpm run test-common
```

## Generate common
To common routes for the index.ts, run this command:
```sh
pnpm run common
```