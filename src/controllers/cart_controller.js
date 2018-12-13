'use strict';

const mongoose = require('mongoose');
const Cart = mongoose.model('Cart');
const url = "http://www.transparencia.gov.br/api-de-dados";
const axios = require('axios');

// const emailService = require('../services/email-service');

exports.index = (req, res, next) => {
    Cart.find({}, (error, result) => {
        if(error) console.log("Erro get index");
        else if(result != null){
            res.send(result);
        }
    })
}

exports.delete = (req, res, next) => {
    Cart.findOneAndRemove({email: req.params.email}, (error, result) => {
        if(error) console.log("Erro no delete");
        else if(result != null) res.send(result);
    })
}

exports.put = (req, res, next) => {
    Cart.findOneAndUpdate({email: req.params.email}, {
        $addToSet : {
            convenios: {
                id: req.body.id,
                nomeConvenente: req.body.nomeConvenente,
                nomeFantasia: req.body.nomeFantasia,
                siglaEstado: req.body.siglaEstado,
                dataAbertura: req.body.dataAbertura 
            }
        }
    }, { new: true
    }, (error, result) => {
        if(error){
            console.log("Erro no put");
            res.status(400).send("Erro no put");
        }     
        else if(result != null){
            res.send(result);
        } else {
            res.status(404).send("Erro mesmo assim no put");
        }
    })
}

exports.post = (req, res, next) => {

    let cart = new Cart(req.body);
    let errors;
    if(errors = cart.validateSync()){
        console.log(errors);
        res.send(errors);
    } else {
        cart.save((erro, resultados) => {
            console.log(erro);
        })
        res.send(cart);
    }
}

