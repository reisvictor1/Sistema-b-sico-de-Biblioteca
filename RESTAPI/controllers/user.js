const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secret = "hashthisplzz"

module.exports.createUser = async (req, res) => {

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

    const userCreated = await newUser.save()
    
    if(!userCreated){
        res.send('O usuário não pode ser cadastrado')
        return;
    }

    res.json(userCreated)
    
}


module.exports.getUser = (req, res) => {
    if (req.query.name) {
        res.send(`You have requested a user ${req.query.name}`)
    } else {
        res.send('You have requested a user')
    }

}

module.exports.updateUserEmail = async (req, res) => {
    if (!req.query.email) {
        return res.status(400).send("Não foi possível atualizar, pois está faltando o email")
    }

    const userUpdated = await userModel.findByIdAndUpdate({
            email: req.query.email
        }, req.body, {
            new: true
        })
        
        if(!userUpdated){
            res.status(500).send("A atualização de dados deu errado")
            return
        }

        res.json(userUpdated)

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



module.exports.getAllUsers = async (req, res) => {

    const allUsers = await userModel.find()
    
    if(!allUsers){

        res.send('Não há nenhum usuário cadastrado')
        return
    }

    res.json(allUsers)

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
            return error
        }
        if(bcrypt.compareSync(req.body.password, userFound.password)){
            res.json({
                token: jwt.sign({user: userFound}, secret),
                email: userFound.email
            })
        
        }else{
            res.send('Senha incorreta')
        }
    })

}