# vibeVault

## Fullstack semester project 2025

This is an exam project for the fullstack elective on Web Development.

> Your life seen through music

This application allows users to document their life experiences and memories through playlists and albums they are currently listening to. It acts as a digital diary, capturing mood, thoughts, and memories related to music. The application will be accessible on all devices (mobile, tablet, desktop) and offer an intuitive and user-friendly interface.

## Start up full docker project for dev

Make sure you have the docker daemon running

### Docker compose up build

Run `docker-build-dev` the first time you run this enviorment, or if images need to be build agian

### Docker compose up

Run `docker-compose-dev`

### Reset database

Run command `make reset-database` reset your local database

### Frontend

Starting locally without docker `npm run dev`. Access on http://localhost:3000

When starting the frontend through docker, access it on http://localhost:8080

### Backend

When starting the backend through docker, access it on http://localhost:8080/api/

## Run run-time-test locally

Run `make docker-compose-test`

## Authors

Emma Hamdorf-Baunsgaard & Freja Fischer Nielsen
