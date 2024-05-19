include .env
export

RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[0;33m
NC := \033[0m

ORM_MIGRATIONS_PATH := api/database/migrations
API_MAIN = cmd/main.go

db: db-docker db-up

dev-api:
	cd api && go run ${API_MAIN}

dev-web:
	cd web && pnpm run dev

dev-mobile:
	cd mobile && pnpm run start

migrate:
	@echo "${YELLOW}===> Enter the name of the table to create : ${NC}"; \
	read table; \
	migrate create -ext sql -dir $(ORM_MIGRATIONS_PATH) -seq $$table

db-up:
	migrate -path $(ORM_MIGRATIONS_PATH) -database "$(DB_TYPE)://$(DB_USER):$(DB_PASSWORD)@$(DB_HOST):$(DB_PORT)/$(DB_NAME)?sslmode=disable" -verbose up

db-down:
	migrate -path $(ORM_MIGRATIONS_PATH) -database "$(DB_TYPE)://$(DB_USER):$(DB_PASSWORD)@$(DB_HOST):$(DB_PORT)/$(DB_NAME)?sslmode=disable" -verbose down

db-docker:
	docker-compose up -d

orm:
	sqlc generate

swag:
	cd api && swag init -g ${API_MAIN} -o internal/doc

lint: lint-api lint-web lint-mobile

lint-api:
	cd api && golangci-lint run

lint-web:
	cd web && pnpm run lint

lint-mobile:
	cd mobile && pnpm run lint