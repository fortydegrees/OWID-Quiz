# Our World In Data Quiz Game

## About This App

put image here

The client uses MobX State Tree, Typescript and TailwindCSS.

The api uses NodeJS, Express, and Cheerio to parse/scrape.

## Running This App

From the home folder, run the following commands:

For the very first build:

- `$ docker-compose build`

Every time after that:

- `$ docker-compose up`

Your API server should be running at `http://localhost:3003`, your client server will be running at `http://localhost:3031` and your MySQL database will be running at: `127.0.0.1:3307`

To stop the services:

- `$ docker compose-stop`

To kill the services:

- `CTRL + C` and then `$ docker compose-down`
