'use strict';

const mongoose = require('mongoose');
const Cart = mongoose.model('Cart');
const url = "http://www.transparencia.gov.br/api-de-dados";
const axios = require('axios');

// const emailService = require('../services/email-service');

exports.post = (req, res, next) => {
    // try{
    //     await repository.create({
    //         // id: req.body.id,
    //         // nome: req.body.name,
    //         // nomeFantasia: req.body.nomeFantasia,
    //         // siglaEstado: req.body.siglaEstado,
    //         // dataAbertura: req.body.dataAbertura
    //     })
    // } catch(e) {
    //     res.status(500).send({
    //         message: 'Falha ao processar a requisição!'
    //     })
    // }
}

exports.get = (req, res, next) => {
        // let data = new Cart(data);
        // await order.save();
        axios.get('http://www.transparencia.gov.br/api-de-dados/convenios?uf=AL&pagina=1')
        .then((resp) => {
            // resp = JSON.parse(resp.data);
            resp = JSON.parse(JSON.stringify(resp.data))
            // res.json(JSON.parse(resp));
            // console.log(resp);
            // console.log(resp.servidor.id + " " + resp.servidor.nome);
            // resp.foreach(resp.servidor.id);
            let texto = "";
            resp.forEach((current, i, array) => {
                texto = Object.assign(texto, resp[i].id + " " + res)
                texto += resp[i].id + " " + resp[i].convenente.nome + '\n';
            })
            res.send(texto);
        }).catch((reason) => {
            console.log(reason);
        })
        // res.send(req.body.name);
}
