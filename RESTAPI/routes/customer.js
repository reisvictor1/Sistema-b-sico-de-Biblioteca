let customerModel = require('../models/customer')
let express = require('express')
let router = express.Router()

//Create a new customer

router.post('/customer', (req, res) => {

    if (!req.body) {
        return res.status(400).send('Algo está faltando')
    }

    if (!req.body.email) {

    }

    let model = new customerModel(req.body)
    model.save()
        .then(doc => {
            if (!doc || doc.length === 0) {
                return res.status(500).send(doc)
            }

            res.status(201).send(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })

})


//Pegar todos os customer 

router.get('/customer/all', (req, res) => {

    customerModel.find()
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })


})

// Pegar um customer com um email específico

router.get('/customer', (req, res) => {

    if (!req.query.email) {
        return res.status(400).send('Falta um parametro URL : email')
    }

    customerModel.findOne({
            email: req.query.email
        })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// UPDATE 
router.put('/customer', (req, res) => {

    if (!req.query.email) {
        return res.status(400).send('Falta um parametro URL : email')
    }

    customerModel.findOneAndUpdate({
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

})

// DELETE

router.delete('/customer', (req, res) => {
    if (!req.query.email) {
        return res.status(400).send('Falta um parametro URL : email')
    }

    customerModel.findOneAndRemove({
            email: req.query.email
        })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router