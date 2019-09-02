// Roteamento das funcionalidades do Objeto Book

const express = require("express")
const router = express.Router()
const bookController = require('../controllers/book');

router.get('/book', bookController.getAllBooks)

router.post('/book', bookController.createNewBook)

router.delete('/book',bookController.deleteBook)

module.exports = router
