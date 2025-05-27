docker-build-dev:
	RTE=dev docker-compose up --build --abort-on-container-exit

docker-compose-dev:
	RTE=dev docker-compose up --abort-on-container-exit

docker-compose-test:
	RTE=test docker-compose up --build --abort-on-container-exit

docker-compose-prod:
	RTE=prod docker-compose up --build --abort-on-container-exit

reset-database:
	docker exec -i postgres-database psql -U myusername -d vibevault < ./seeder/seed.sql
