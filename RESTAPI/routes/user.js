// Roteamento de funcionalidades do Objeto usuário

const express = require('express')
const router = express.Router()

// Faz uma requisição pelo Objeto User
router.get('/user', (req, res) => {
    if (req.query.name) {
        res.send(`You have requested a user ${req.query.name}`)
    } else {
        res.send('You have requested a user')
    }

})

// Faz uma requisição pelo nome de uma pessoa
router.get('/user/:name', (req, res) => {
    res.send(`You have requested a user ${req.params.name}`)
})


router.get('/error', (req, res) => {
    throw new Error("Isto é um erro")

})

module.exports = router