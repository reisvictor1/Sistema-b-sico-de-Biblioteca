// Controllers do Objeto book

const bookModel = require('../models/book')

module.exports.getAllBooks = async (req,res) => {

   const books = await bookModel.find()
    
    res.json(books)
}

module.exports.createNewBook = async (req,res) => {

    if(!req.body.title){
        res.send("O novo livro da biblioteca precisa de um título")
    }

    if(!req.body.author){
        res.send("O novo livro da biblioteca precisa de um nome")
    }

    if(!req.body.genre){
        res.send("O novo livro da biblioteca precisa de um gênero")
    }

    if(!req.body.publishing_company){
        res.send("O novo livro da biblioteca precisa de uma editora")
    }

    let newBook = new bookModel();
    
    newBook.title = req.body.title
    newBook.publishing_company = req.body.publishing_company
    newBook.author = req.body.author
    newBook.genre = req.body.genre

    const bookCreated = await newBook.save()
        
    if(!bookCreated){
        res.send('Um erro aconteceu ao colocar um novo livro na biblioteca')
    }

    res.json(bookCreated)

}

