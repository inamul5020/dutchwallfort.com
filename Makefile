.PHONY: help install dev build start stop restart logs clean db-migrate db-shell

help:
	@echo "Dutch Wall Fort - Development Commands"
	@echo ""
	@echo "Available commands:"
	@echo "  make install       - Install dependencies"
	@echo "  make dev          - Start development server"
	@echo "  make build        - Build for production"
	@echo "  make docker-up    - Start Docker containers"
	@echo "  make docker-down  - Stop Docker containers"
	@echo "  make docker-restart - Restart Docker containers"
	@echo "  make logs         - View Docker logs"
	@echo "  make db-shell     - Access PostgreSQL shell"
	@echo "  make db-migrate   - Run database migrations"
	@echo "  make clean        - Clean build artifacts and containers"
	@echo ""

install:
	npm install

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

lint:
	npm run lint

docker-up:
	docker-compose up -d
	@echo "Services started. Access app at http://localhost:5173"

docker-down:
	docker-compose down

docker-restart:
	docker-compose restart

docker-build:
	docker-compose up -d --build

logs:
	docker-compose logs -f

logs-app:
	docker-compose logs -f app

logs-db:
	docker-compose logs -f postgres

db-shell:
	docker-compose exec postgres psql -U postgres -d dutchwallfort

db-migrate:
	@for file in supabase/migrations/*.sql; do \
		echo "Running migration: $$file"; \
		docker-compose exec -T postgres psql -U postgres -d dutchwallfort < $$file; \
	done

clean:
	rm -rf node_modules dist
	docker-compose down -v

clean-all: clean
	rm -rf node_modules package-lock.json

test:
	npm run build
	@echo "Build successful!"

production-build:
	docker build --target production -t dutchwallfort:latest .

production-run:
	docker run -p 80:80 dutchwallfort:latest
