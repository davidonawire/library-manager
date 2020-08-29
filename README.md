# library-manager
 A demonstration CRUD app using Express, Pug, Sequelize, and SQLite. The app provides CRUD access to a SQLite database with a simple Books table, with the primary records being `title`, `author`, `genre`, and `year`. The app uses Express routing to handle GET and POST actions, with Sequelize handling ORM duties to interface with the database. Form validation is handled at the model level (`title` and `genre` are required) rather than in-browser. Basic error routing catches both invalid routes (404 errors) and invalid records (caught as 500 server errors).

## Installation

In the project directory, run:

`npm install`

To start the app, run:

`npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.