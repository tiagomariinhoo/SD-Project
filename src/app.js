'use strict';
const axios = require('axios');

//Bd : tiago / tiago123
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config  = require('./config');


const app = express();
const router = express.Router();

//Conecta ao banco
mongoose.connect(config.connectionString, { useNewUrlParser: true });
const Car = require('./models/cart');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const cartRoute = require('./routes/cart-route');


app.use('/cart', cartRoute);

app.get("/:sigla",  (req, res, next) => {
    axios.get('http://www.transparencia.gov.br/api-de-dados/convenios?uf=' + req.params.sigla +'&pagina=1')
    .then((resp) => {
        resp = JSON.parse(JSON.stringify(resp.data))
        let texto = []
        resp.forEach((current, i, array) => {
            texto[i] = {
                id: resp[i].id,
                nomeConvenente: resp[i].convenente.nome,
            };
        })
        res.send(texto);
    }).catch((reason) => {
        console.log(reason);
    })
})


module.exports = app; //Podemos exportar algo desta classe
