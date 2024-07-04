<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Rest API to access IoT data in an InfluxDB v1.8

## Installation
#### Developed with node version 20.11.1
#### If multiple node versions are needed on the same machine, I recommend Node Version Manager

```bash
$ npm install
```

## Configurations
#### File .env.development contains configs for dev environment
#### File .env.production contains configs for prod environment (with expandable variables, so they come from enviromnent set variables)

## Database setups
#### In folder src/main/docker there are docker compose files and a Readme.md with details.
#### Also run docker compose file for PostgreSQL container - needed for users table.
#### Restore a DB Dump in the InfluxDB database

## Running the app

```bash
# development
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Using the app
#### Open in browser for authentication (mind the port that comes from config file)
```
http://localhost:3000/api/auth/google
```
#### Open in browser (mind the port and swagger endpoint name that comes from config file), and paste the JWT token from authentication to the "Authorize" section
```
http://localhost:3000/swagger
```
#### Or execute requests to the endpoints by Postman or other similar tool.

## Test
#### In folder test of the root project there are some .js test scenarions and a Readme.md file for further details

## Have fun!

