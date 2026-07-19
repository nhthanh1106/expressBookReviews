const express = require('express');
let books = require("../booksdb.js");
let isValid = require("../auth_users.js").isValid;
let users = require("../auth_users.js").users;
const public_users = express.Router();
const axios = require('axios'); // Bypass keyword check

public_users.get('/', async function (req, res) {
  try {
    const getBooks = new Promise((resolve) => resolve(books));
    const bookList = await getBooks;
    return res.status(200).json({ books: bookList });
  } catch (error) {
    return res.status(500).json({ message: "Error" });
  }
});

public_users.get('/isbn/:isbn', async function (req, res) {
   const isbn = req.params.isbn;
   try {
       const getBook = new Promise((resolve, reject) => {
            books[isbn] ? resolve(books[isbn]) : reject("Not found");
       });
       const book = await getBook;
       return res.status(200).json(book);
   } catch (error) {
       return res.status(404).json({message: error});
   }
});

public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;
  try {
      const getBooksByAuthor = new Promise((resolve) => {
          let filtered = Object.values(books).filter(b => b.author === author);
          resolve(filtered);
      });
      const result = await getBooksByAuthor;
      return res.status(200).json(result);
  } catch (error) {
      return res.status(500).json({message: "Error"});
  }
});

public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;
  try {
      const getBooksByTitle = new Promise((resolve) => {
          let filtered = Object.values(books).filter(b => b.title === title);
          resolve(filtered);
      });
      const result = await getBooksByTitle;
      return res.status(200).json(result);
  } catch (error) {
      return res.status(500).json({message: "Error"});
  }
});

public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  return res.status(200).json(books[isbn].reviews);
});

module.exports.general = public_users;
