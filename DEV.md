## Development Guide
This file provides instructions for setting up and running the API, web, and mobile applications. It also includes information on managing database migrations, generating ORM and generating documentation.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running the Applications](#running-the-applications)
  - [Start the Database](#start-the-database)
  - [Start the API](#start-the-api)
  - [Start the Web Application](#start-the-web-application)
  - [Start the Mobile Application](#start-the-mobile-application)
- [Autonomy](#autonomy)
  - [Install Dependencies](#install-dependencies)
  - [Run the Script](#run-the-script)
- [Linting the Code](#linting-the-code)
  - [Lint All Code](#lint-all-code)
  - [Lint the API](#lint-the-api)
  - [Lint the Web Application](#lint-the-web-application)
  - [Lint the Mobile Application](#lint-the-mobile-application)
- [Format the Code](#format-the-code)
  - [Format All Code](#format-all-code)
  - [Format the API](#format-the-api)
  - [Format the Web Application](#format-the-web-application)
  - [Format the Mobile Application](#format-the-mobile-application)
- [Type Check the Code](#type-check-the-code)
  - [Type Check All Code](#type-check-all-code)
  - [Type Check the API](#type-check-the-api)
  - [Type Check the Web Application](#type-check-the-web-application)
  - [Type Check the Mobile Application](#type-check-the-mobile-application)
- [Test the Code](#test-the-code)
  - [Test All Code](#test-all-code)
  - [Test the API](#test-the-api)
  - [Test the Web Application](#test-the-web-application)
  - [Test the Mobile Application](#test-the-mobile-application)
- [Run CI](#run-ci)
- [Generate common](#generate-common)

## Prerequisites

Make sure you have the following tools installed:

- [Go](https://go.dev)
- [Python](https://www.python.org/)
- [Docker](https://www.docker.com)
- [Node.js](https://nodejs.org)
- [pnpm](https://pnpm.io)
- [golangci-lint](https://golangci-lint.run)

## Setup

1. Clone the repository:
```sh
    git clone https://github.com/clementpnn/Overclock.git
    cd Overclock
```

2. Install dependencies for the monorepo:
 ```sh
    pnpm install
```

## Running the Applications

### Start the Database

To start the database, run the following command:
```sh
    pnpm run db
```

### Start the API

To start the API, run the following command:
```sh
    pnpm run api
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

## Autonomy

### Install Dependencies

Before running the autonomy scripts, make sure to install the necessary Python dependencies. Run the following command in the `ai` directory:
```sh
    pip install -r requirements.txt
```

### Run the Script

To execute the autonomy script, navigate to the `ai` directory and run:
```sh
    cd ai
    python detect.py
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
    pnpm run lint:api
```

### Lint the Web Application
To lint the web application code, run the following command:
```sh
    pnpm run lint:web
```

### Lint the Mobile Application
To lint the mobile application code, run the following command:
```sh
    pnpm run lint:mobile
```

### Lint the Common Application
To lint the common application code, run the following command:
```sh
    pnpm run lint:common
```

## Format the Code

### Format All Code
To format client code (web, mobile and common), run the following command:
```sh
    pnpm run format
```

### Format the Web Application
To format the web application code, run the following command:
```sh
    pnpm run format:web
```

### Format the Mobile Application
To format the mobile application code, run the following command:
```sh
    pnpm run format:mobile
```

### Format the Common Application
To format the common application code, run the following command:
```sh
    pnpm run format:common
```

## Type Check the Code

### Type Check All Code
To type check client code (web, mobile and common), run the following command:
```sh
    pnpm run type
```

### Type Check the Web Application
To type check the web application code, run the following command:
```sh
    pnpm run type:web
```

### Type Check the Mobile Application
To type check the mobile application code, run the following command:
```sh
    pnpm run type:mobile
```

### Type Check the Common Application
To type check the common application code, run the following command:
```sh
    pnpm run type:common
```

## Test the Code

### Test All Code
To test client code (web, mobile and common), run the following command:
```sh
    pnpm run test
```

### Test the Web Application
To test the web application code, run the following command:
```sh
    pnpm run test:web
```

### Test the Mobile Application
To test the mobile application code, run the following command:
```sh
    pnpm run test:mobile
```

### Test the Common Application
To test the common application code, run the following command:
```sh
    pnpm run test:common
```

## Run CI
To run the lint, the prettier and the type command, run the following command:
```sh
    pnpm run ci
```

## Generate common
To generate common routes for the `index.ts`, run this command:
```sh
    pnpm run common
```