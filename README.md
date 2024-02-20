# Printec

Interview task solution.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Routes](#route)
- [Tests](#tests)

## Introduction

1. Избирате си някое свободно за ползване API в интернет. Примерни може да се
   намерят тук: [API List](https://apipheny.io/free-api/)
2. Разработва се клиент на приятна/позната за Вас технология (Java, C#, Python,
   PHP, JS,...), който да изпраща поне една заявка към избраното API.
3. Тестовите данни, върнати в response да се съхранят в база данни (без значение
   коя ще се използва)
4. Да се направят automation tests на заявките
5. Решението да се сложи в контейнер
6. Да се напише readme или друг вид описание на решението.

- Проекта е реализиран под формата на client(front end) и сървър(back end)

## Technologies
- React
- Node
- Express
- MongoDB
- Jest

## Features

- Using https://www.zippopotam.us/ the app fetches and stores data in MongoDB regarding location information based on country and postal codes.

## Getting Started

- Node is needed for this project

- Running the server from root folder (runing on port 8080)

```js
cd server
```

```js
npm i 
```

```js
npm run dev
```

- Runnung the client from root folder (runing on port 3000)

```js
cd client
```

```js
npm i 
```

```js
npm run start
```

## Usage

- The server should always be started first
- On load the client will fetch all the data present in the database
- The fornt end presents 2 input fields that can be used to enter country and zipcode after clicking submit the server will fetch the data for this entry and add it to the database.

## Routes
The server presents 2 routes.

- Fetching all data from the database
```js
/data
```

- Fetching data for specific location based on user input from Zippopotam and pushing it to the database

```js
/:country/:code
```

## Tests

- The project includes tests implemented with jest located in server.test.js file.
- Running the test from root folder

```js
cd server
```

```js
npx jest 
```
