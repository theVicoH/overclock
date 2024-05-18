### Development Guide
This document explains the various `make` commands used in the project for development purposes. These commands streamline common tasks such as running the API, starting the web and mobile applications, managing database migrations, and more.


#### Table of Contents

- [Environment Variables](#environment-variables)
- [Make Commands](#make-commands)
  - [db](#db)
  - [dev-api](#dev-api)
  - [dev-web](#dev-web)
  - [dev-mobile](#dev-mobile)
  - [migrate](#migrate)
  - [db-up](#db-up)
  - [db-down](#db-down)
  - [db-docker](#db-docker)
  - [orm](#orm)
  - [swag](#swag)

---

### Environment Variables

Before using the `make` commands, ensure you have a `.env` file with the necessary environment variables. The `include .env` and `export` statements at the beginning of the Makefile ensure that these variables are loaded and available for use.

---

### Make Commands

#### db
This command is a combination of `db-docker` and `db-up`. It sets up the database using Docker and then applies all the migrations.
```sh
make db
```

#### dev-api
This command navigates to the `api` directory and runs the main Go application.
```sh
make make dev-api
```

#### dev-web
This command navigates to the web directory and starts the `web` development server using `pnpm`.
```sh
make make dev-web
```

#### dev-mobile
This command navigates to the mobile directory and starts the `mobile` application using `pnpm`.
```sh
make make dev-mobile
```

#### migrate
This command creates a new database migration. It prompts you to enter the name of the table to create, then uses the `migrate` tool to generate a new migration file.
```sh
make make migrate
```

#### db-up
This command applies all the database migrations to bring the database schema up to date.
```sh
make make db-up
```

#### db-down
This command rolls back the last set of database migrations.
```sh
make make db-down
```

#### db-docker
This command starts the database using Docker Compose.
```sh
make make db-docker
```

#### orm
This command generates the ORM (Object-Relational Mapping) code using `sqlc`.
```sh
make make orm
```

#### swag
This command generates the Swagger documentation for the API. It navigates to the `api` directory and uses `swag` to generate the documentation based on the Go code.
```sh
make make swag
```

---

### Notes

- Ensure that you have all the necessary tools installed (`docker-compose`, `migrate`, `sqlc`, `swag`, etc.) to use these commands effectively.
- The color codes (`RED`, `GREEN`, `YELLOW`, `NC`) are used to enhance the readability of the output messages in the terminal.