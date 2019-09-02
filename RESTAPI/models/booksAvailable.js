const mongoose = require('mongoose')

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