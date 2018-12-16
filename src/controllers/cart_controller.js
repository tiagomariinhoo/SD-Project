'use strict';

const mongoose = require('mongoose');
const Cart = mongoose.model('Cart');
const url = "http://www.transparencia.gov.br/api-de-dados";
const axios = require('axios');
const config  = require('../config');
var sendgrid = require('sendgrid')(config.sendgridKey);
const emailService = require('../services/email-service');

exports.index = (req, res, next) => {
    Cart.find({}, (error, result) => {
        if(error) console.log("Erro get index");
        else if(result != null){
            res.send(result);
        }
    })
}

exports.send = (req, res, next) => {
    let textAux = "";
    Cart.findOne({email: req.params.email}, (error, result) => {
        if(error){
            console.log("Erro no send");
            res.send(error);
        } else if(result != null){
            for(let i = 0; i < result.convenios.length ; i++){
            textAux += (result.convenios[i].id + " - " + result.convenios[i].nomeConvenente + "<br>");
            }
        } else {
            console.log(error);
            // res.send(404);
            res.send(error).status(404);
        }
    }).then(() => {
        // const sgMail = require('@sendgrid/mail');
        // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        emailService.send(
            req.params.email, 
            "Email from SDProject!", 
            textAux);
        res.status(201).send({message: 'Email mandado!'});
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
                nomeConvenente: req.body.nomeConvenente
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
            return ;
        })
        res.send(cart);
    }
}

