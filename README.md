## Description

This is a sample REST API built with ExpressJS.

## Disclaimer

This has API is developed and designed to be run locally as of now.

## Setup Locally

- Run `npm install`
- Install XAMPP
- Using XAMPP, run Apache and MySQL
- In PHPMyAdmin, create a table named `adaca_node`
- Run `node ./database/createTable.js`
- Run `npm start`

## Usage

URL: `localhost:3000/api/v1/messages`
Method: GET
Description: returns all messages in the table

URL: `localhost:3000/api/v1/messages`
Method: POST
Description: accepts `{'conversation_id': 'abc123', 'message': 'Hello'}`, saves it in the database, and returns a response `{'response_id': 'abc123', 'message': 'Welcome to StationFive.'}`

URL: `localhost:3000/api/v1/messages`
Method: PUT
Description: returns an error message indicating that the method is unsupported.
