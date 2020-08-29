/**
 * Library management app built with Node.js, Express, and Sequelize on SQLite
 * 
 * Created as part of the Treehouse Full Stack JavaScript Techdegree
 * 
 */

const express = require('express');
const path = require('path');
const sequelize = require('./models').sequelize;

const routes = require('./routes/index');
const books = require('./routes/books');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up static route
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/books', books);

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).render('pagenotfound', { title: 'Page Not Found'});
});

// General error handler
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.render('pagenotfound', { title: 'Page Not Found'});
  } else {
    err.message = 'Something went wrong!';
    res.status(err.status);
    console.log(`${err.message} (Status Code: ${err.status})`);
    res.render('error', { title: 'Something Went Wrong' });
  }
});

sequelize.sync()
  .then(() => {
    console.log('Database connection successful');
    app.listen('3000', () => {
      console.log('Connected on Port 3000');
    });
  })
  .catch((err) => console.error('Error on start-up:', err));