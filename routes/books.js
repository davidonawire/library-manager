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
  res.render('new', { book: {}, title: 'New Book' });
}));

// POST new book
router.post('/new', asyncHandler(async (req, res) => {
  book = await Book.create(req.body);
  res.redirect("/books");
}));

// GET book detail page
router.get('/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    res.render('edit', { book, title: book.title });
  } else {
    res.sendStatus(404);
  }
}));

// POST book update
router.post('/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    await book.update(req.body);
    res.redirect("/books");
  } else {
    res.sendStatus(404);
  }
}));

// DELETE a book
router.post('/:id/delete', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    await book.destroy();
    res.redirect("/articles");
  } else {
    res.sendStatus(404);
  }
}));

module.exports = router;