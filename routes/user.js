// Roteamento de funcionalidades do Objeto usuário
const express = require('express')
const router = express.Router()
const userController = require("../controllers/user")

// Cria um novo usuário 

router.post('/user', userController.createUser)

// Faz uma requisição de todos os usuarios

router.get('/user/all', userController.getAllUsers)

// Faz uma requisição pelo Objeto User
router.get('/user', userController.getUser)


// UPDATE router pelo email

router.put('/user', userController.updateUserEmail)


// DELETE router by email

router.delete('/user', userController.deleteUser)


module.exports = router