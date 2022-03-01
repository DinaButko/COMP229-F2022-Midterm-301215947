//// books.js - Dzina Butko - ID 301215947 - Midterm Test - Test 1

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // Create redirection to the books details page
  res.render('books/details', {
    title: 'Add a Book',
    books: '',
    action: '/books/add'
  });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
  // Get the data from the request body
  let data = req.body;
  // Data format, parse integer value in float for price
  const newBook = {
    Title: data.title,
    Description: data.description,
    Price: parseFloat(data.price),
    Author: data.author,
    Genre: data.genre
  }
  // Create the book on MongoDB
  book.create(newBook, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.redirect('/books');
    }
  });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     let id = req.params.id;
     book.findById( id , (err, book) => {
      if (err) {
        return console.error(err);
      }
      else {
        // User redirection to the books details page
        res.render('books/details', {
          title: 'Edit a Book',
          books: book,
          action: ''
        });
      }
    });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // Get the  data from the form to update request of an existing book by using it's id property
    let id = req.params.id;
    let data = req.body;
      // Data format, parse integer value in float for price
    const updateData = {
      Title: data.title,
      Description: data.description,
      Price: parseFloat(data.price),
      Author: data.author,
      Genre: data.genre
    }
    book.updateOne( {_id: id} , updateData, {upsert: true}, (err, result) => {
      if (err) {
        return console.error(err);
      }
      else {
        res.redirect('/books');
      }
    });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
    /*****************
     * ADD CODE HERE *
     *****************/

    //Logic that processes the user's delete request  and removes an existing book from databaseby using it's id property
     let id = req.params.id;
     book.remove( {_id: id} , (err) => {
      if (err) {
        return console.error(err);
      }
      else {
        res.redirect('/books');
      }
    });
});


module.exports = router;
