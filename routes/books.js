const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

// Wrapper function to handle async functions in routes
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error) {
      res.status(500).send(error);
    }
  }
}

// GET books listing
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll();
  res.render('index', { books, title: 'Books' });
}));

// GET create new book form
router.get('/new', asyncHandler(async (req, res) => {
  res.render('new-book', { book: {}, title: 'New Book' });
}));

// POST new book
router.post('/new', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect("/books");
  } catch (error) {
    // Check for required field errors
    if (error.name === 'SequelizeValidationError') {
      book = await Book.build(req.body);
      res.render('new-book', { book, errors: error.errors, title: 'New Book' });
    } else {
      throw error;
    }
  }
}));

// GET book detail page
router.get('/:id', asyncHandler(async (req, res, next) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    res.render('update-book', { book, title: book.title });
  } else {
    const error = new Error("Record not found");
    error.status = 500;
    next(error);
  }
}));

// POST book update
router.post('/:id', asyncHandler(async (req, res, next) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    if (book) {
      await book.update(req.body);
      res.redirect("/books");
    } else {
      const error = new Error("Record not found");
      error.status = 500;
      next(error);
    }
  } catch (error) {
    // Check for required field errors
    if (error.name === 'SequelizeValidationError') {
      book = await Book.build(req.body);
      res.render('update-book', { book, errors: error.errors, title: book.title });
    } else {
      throw error;
    }
  }
  
}));

// DELETE a book
router.post('/:id/delete', asyncHandler(async (req, res, next) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    await book.destroy();
    res.redirect("/books");
  } else {
    const error = new Error("Record not found");
    error.status = 500;
    next(error);
  }
}));

module.exports = router;