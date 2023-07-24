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
