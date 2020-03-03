# Captains League (Shell - Test)

## Description

The year is 2057 and ship captains are now considered celebrities throughout the world. This is the app to serve information to our B2C app to show all the trips ship captains have made.

## Installation

```bash
npm install
```

## How to work on the project

### Using Docker (optional)

It is not mandatory but docker can be run to spin up a container with a database for this project. It relays on some environment variables. Therefore, in order to easily make use of them, a `.env` file can be used for development purposes.

Copy `.env.example` and rename it `.env`

```bash
cp .env.example .env
```

Run Docker

```bash
docker-compose up
```

### Transpile the code

Run the command below to transpile the code and keep the transpiler watching for any new changes

```bash
npm run dev
```

### Seeding the datbase (optional)

To have some data to work with a seeder is provided. In order to populate the database, run the next command:

```bash
npm run seeder:seed
```

To drop the database run:

```bash
npm run seeder:drop
```

## How to run the application

```bash
npm run start
```

After executing the command a log message will appear on the terminal showing the URL the application is being served to.

## Documentation

For mor information click on the links below:

- [Architecture](/docs/architecture.md)
