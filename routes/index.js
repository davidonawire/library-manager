const express = require('express');
const router = express.Router();

// Re-route to Books from our root page
router.get('/', (req, res, next) => {
  res.redirect("/books");
});

module.exports = router;