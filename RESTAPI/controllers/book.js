// Controllers do Objeto book

const bookModel = require('../models/book')

module.exports.getAllBooks = (req,res) => {

    bookModel.find()
    .then(doc => {
        res.json(doc)
    })
    .catch(err => {
        res.json(err)
    })

}

module.exports.createNewBook = (req,res) => {

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

    newBook.save()
        .then(doc => {
            if(!doc || doc.length === 0){
                return res.status(500).send(doc)
            }

            return res.status(201).send(doc)
            
        })
        .catch(err => {
            res.status(500).json(err)
        })

}

