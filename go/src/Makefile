include .env.development

.PHONY: deps
deps:
	@echo "Installing dependencies..."
	go mod download
	go mod tidy

.PHONY: build
build: deps
	@echo "Building..."
	GOOS=linux go build -o ../bin/server

.PHONY: test
test:
	@echo "Running tests..."
	go test -v ./... -cover -coverprofile=coverage.out
	go tool cover -html=coverage.out -o coverage.html

.PHONY: generate
generate:
	@echo "Generating GraphQL code..."
	go run github.com/99designs/gqlgen generate

.PHONY: run
run:
	@echo "Running..."
	PORT=${PORT} \
	MYSQL_HOST=${MYSQL_HOST} \
	MYSQL_DB_NAME=${MYSQL_DB_NAME} \
	MYSQL_USER=${MYSQL_USER} \
	MYSQL_PASSWORD=${MYSQL_PASSWORD} \
	REDIS_HOST=${REDIS_HOST} \
	REDIS_PASSWORD=${REDIS_PASSWORD} \
	go run server.go
