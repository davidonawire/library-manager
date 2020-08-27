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
  const books = await Book.FindAll();
  console.log(books.map(book => book.toJSON()));
  res.render('index', { books, title: 'Books' });
}));

// GET create new book form
router.get('/new', asyncHandler(async (req, res) => {

}));

// POST new book
router.post('/new', asyncHandler(async (req, res) => {

}));

// GET book detail page
router.get('/:id', asyncHandler(async (req, res) => {

}));

// POST book update
router.post('/:id', asyncHandler(async (req, res) => {

}));

// DELETE a book


module.exports = router;