const mongoose = require('mongoose')


let bookSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    author: {
        type: String,
        required: true
    },

    publishing_company: {

        type: String,
        required: true

    },

    genre: {
        type: String,
        required: true
    }

})


module.exports = mongoose.model('Book', bookSchema)