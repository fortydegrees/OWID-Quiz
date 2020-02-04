# Our World In Data Quiz Game

[A live version of the game can be played here](http://178.62.106.135/)

![Question Preview](https://i.imgur.com/34JpjsE.png)

A game based off [Our World In Data](https://ourworldindata.org/) chloropleth maps, where the title and context has been removed. The user's job is to guess which description matches the shown chart.

## About This App

The client uses MobX State Tree, Typescript and TailwindCSS.

The api uses NodeJS, Express, and Cheerio to parse/scrape.

Built with a mobile-first experience in mind.

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
