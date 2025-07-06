PRD_COMPOSE=docker-compose.yml

up:
	docker compose -f $(PRD_COMPOSE) up -d

down:
	docker compose -f $(PRD_COMPOSE) down

restart:
	docker compose -f $(PRD_COMPOSE) restart

logs:
	docker compose -f $(PRD_COMPOSE) logs -f

build:
	docker compose -f $(PRD_COMPOSE) build

ps:
	docker compose -f $(PRD_COMPOSE) ps

clean:
	docker compose -f $(PRD_COMPOSE) down --volumes --remove-orphans

shell:
	docker compose -f $(PRD_COMPOSE) exec app bash

install:
	npm install

dev:
	npm run dev

test:
	npm test

lint:
	npm run lint

format:
	npm run format

install-pre-commit:
	source venv/bin/activate && pip install pre-commit
	source venv/bin/activate && pre-commit install

pre-commit:
	source venv/bin/activate && pre-commit run --all-files

pre-commit-update:
	source venv/bin/activate && pre-commit autoupdate
