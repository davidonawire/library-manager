/**
 * Library management app built with Node.js, Express, and Sequelize on SQLite
 * 
 * Created as part of the Treehouse Full Stack JavaScript Techdegree
 * 
 */

const express = require('express');
const path = require('path');

const routes = require('./routes/index');
const books = require('./routes/books');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set up static route
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/books', books);