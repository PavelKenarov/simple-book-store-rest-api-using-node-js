const express = require('express');
const router = express.Router();
const fs = require('fs');
let books = require('./books.json');

// Get all the books
router.get('/', (req, res) => {
  res.json(books);
});

// Get a specific book
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json(books.filter((el) => el.id === parseInt(id)));
});

router.post('/', (req, res) => {
  const body = req.body;
  books.push(body);
  fs.writeFile('books.json', JSON.stringify(books, null, 2), 'utf8', function (err) {
      if (err)
          throw err;
  });
  res.json({ message: 'The book has been added' });
  //res.json(books);
});

// update book
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  books.forEach((book, index) => {
    if (book.id === parseInt(id)) {
      books[index] = body;
    }
  });
  fs.writeFile('books.json', JSON.stringify(books, null, 2), 'utf8', function (err) {
    if (err)
        throw err;
  });
  res.json({ message: `The book with ID ${id} has been updated` });
});

// delete book
router.delete('/:id',
(req, res) => {
  const {id} = req.params;
  books = books.filter(item => item.id !== parseInt(id));

  fs.writeFile('books.json', JSON.stringify(books, null, 2), 'utf8', function (err) {
    if (err)
      throw err;
  });
  res.json({message: `Book with id #${id} has been deleted`});
});

module.exports = router;
