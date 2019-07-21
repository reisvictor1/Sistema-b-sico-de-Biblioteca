const mongoose = require('mongoose')
const book = require('./book')

let booksAvailableSchema = new mongoose.Schema({

    booksAvailable: {
        type: Schema.Types.ObjectId, 
        ref:'book',
        required: true,
        unique: true
    },

    numberAvailable: {
        type: Number,
        required: true
    }

})


module.exports = mongoose.model('Available', booksAvailableSchema)