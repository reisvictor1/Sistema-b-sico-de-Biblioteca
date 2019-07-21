const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secret = "hashthisplzz"

module.exports.createUser = (req, res) => {

    if (!req.body.name) {
        res.send('Campo obrigatório está vazio')
    }
    if (!req.body.password) {
        res.send('Campo obrigatório está vazio')
    }
    if (!req.body.email) {
        res.send('Campo obrigatório está vazio')
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(req.body.password, salt)

    let newUser = new userModel()

    newUser.email = req.body.email
    newUser.password = hashedPass
    newUser.name = req.body.name

    newUser.save()
        .then(doc => {
            if (!doc || doc.length === 0) {
                return res.status(500).send(doc)
            }


            return res.status(201).send(doc)

        })
        .catch(err => {
            res.status(500).json(err)
        })
}


module.exports.getUser = (req, res) => {
    if (req.query.name) {
        res.send(`You have requested a user ${req.query.name}`)
    } else {
        res.send('You have requested a user')
    }

}

module.exports.updateUserEmail = (req, res) => {
    if (!req.query.email) {
        return res.status(400).send("Não foi possível atualizar, pois está faltando o email")
    }

    userModel.findByIdAndUpdate({
            email: req.query.email
        }, req.body, {
            new: true
        })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })

}

module.exports.deleteUser = (req, res) => {
    if (!req.query.email) {
        return res.status(400).send("O campo obrigatório está vazio")
    }

    userModel.findOneAndRemove({
            email: req.query.email
        })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.json(err)
        })
}



module.exports.getAllUsers = (req, res) => {

    userModel.find()
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.json(err)
        })

}


module.exports.login = (req,res) => {

    if(!req.body.email){
        res.send('Campos obrigatórios estão vazios')
    }

    if(!req.body.password){
        res.send('Campos obrigatórios estão vazios')
    }

    userModel.findOne({email: req.body.email},(error, userFound) => {
        if(!userFound){
            res.send('Usuário não encontrado')
            return
        }
        if(bcrypt.compareSync(req.body.password, userFound.password)){
            res.json({
                token: jwt.sign({user: userFound}, secret),
                email: userFound.email
            })
            res.send('Senhas batem e token foi criado')
        }else{
            res.send('Senha incorreta')
        }
    })

}