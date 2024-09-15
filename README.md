<h1 align="center"><a href="https://overclock.clementpnn.com/">Overclock</a></h1>
<p align="center">
  School Project
</p>

<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#setting-up-locally"><strong>Setting Up Locally</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a>
</p>
<br/>

## Introduction

Overclock is an project that allows you to control a small car via a mobile application. Users can participate in races, and the results and statistics of their races are also available on a dedicated website, offering a detailed summary of performances.

In addition, the project integrates artificial intelligence that can detect the presence of obstacles and automatically avoid them. It can also recognize if a person falls nearby, ensuring an interactive and safe experience.

## Setting Up Locally

To configure Overclock locally, you will need to clone the repository and configure the following environment variables in the .env file in apps/api folder:

```
DB_HOST="localhost"
DB_PORT="5432"
DB_USER="root"
DB_PASSWORD="root"
DB_NAME="postgres"
```

And the .env file in apps/mobile folder:

```
WS_URL="url"
WEBSITE_URL="url"
```

To run the app locally, you can run the following commands:

```
pnpm install
pnpm db
pnpm api
pnpm web
pnpm mobile
```

## Tech Stack

Overclock is built on the following stack:

**Back End:**

- [Go](https://go.dev/) - Programming Language
- [GoFiber](https://gofiber.io/) - Framework
- [GORM](https://gorm.io/) - ORM

**Front Web:**

- [TypeScript](https://www.typescriptlang.org/) - Programming Language
- [React](https://fr.react.dev/) - JavaScript Library
- [Vite](https://vitejs.dev/) - Build Tool
- [Tanstack Router](https://tanstack.com/router/v1) – Routing
- [TailwindCSS](https://tailwindcss.com/) – CSS Framework

**Front Mobile:**

- [TypeScript](https://www.typescriptlang.org/) - Programming Language
- [React Native](https://reactnative.dev/) - JavaScript Library

**Database:**

- [PostgresSQL](https://www.postgresql.org/) - Relational Database

**Brocker**

- [RabbitMQ](https://www.rabbitmq.com/) - MQTT Brocker

**AI**

- [Python](https://www.python.org/) - Programming Language

**Infrastructure & Deployment:**

- [Docker](https://www.docker.com/) - Containerize