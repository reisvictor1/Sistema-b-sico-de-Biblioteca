const express = require("express")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://admin:admin@mockcluster-zet4a.mongodb.net/test?retryWrites=true', { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })


const app = express()

const PORT = process.env.PORT || 3000

const userRoute = require('./routes/user')

let path = require('path')

app.use(bodyParser.json())

app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
    next();
})

app.use(userRoute)
app.use(express.static('public'))

//Requisição de erro (404 error handler)
app.use((req, res, next) => {
    res.status(404).send("Tá perdido, filhão!!!")
})

// Requisição de perda de servidor (500 Internet server handler)
app.use((err, req, res, next) => {
    console.error(err.stack)

    res.sendFile(path.join(__dirname, './public/500.html'))
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})