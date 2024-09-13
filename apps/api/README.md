## Setting Up Locally

To configure API locally, you will need to clone the repository and configure the following environment variables (in the .env file):

```
DB_HOST="localhost"
DB_PORT="5432"
DB_USER="root"
DB_PASSWORD="root"
DB_NAME="datas"
```

## Tech Stack

The API is built on the following stack:

**API:**
- [GO](https://go.dev/) - Programming Language
- [GOFiber](https://gofiber.io/) - Framework
- [GORM](https://gorm.io/) - ORM

**Infrastructure & Deployment:**
- [Docker](https://www.docker.com/) - Containerize

## Routes

Base URL (prod): [api.clementpnn.com](api.clementpnn.com)

**Routes:**

`/race/?id` Displays a race and it's datas<br>
`/race/` Displays all races with their data<br>
`/race/` Add a race<br>
`/race/:id` Delete a race by it's corresponding id<br>

`/stats_race/` Displays stats of a race<br>
`/stats_race/?id` Add stats to a race
