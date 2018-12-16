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
//mongoose.connect('mongodb://tiago:tiago123@ds123454.mlab.com:23454/ndstr');
// mongoose.connect("mongodb://tiago:tiago123@ds123454.mlab.com:23454/ndstr", { useNewUrlParser: true })
mongoose.connect(config.connectionString, { useNewUrlParser: true });
const Car = require('./models/cart');
//Carrega os Models
// const Product = require('./models/product');
// const Customer = require('./models/customer');
// const Order = require('./models/order');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Carrega as rotas
const cartRoute = require('./routes/cart-route');
// const indexRoute = require('./routes/index-route');
// const productRoute = require('./routes/product-route');
// const customerRoute = require('./routes/customer-route');
// const orderRoute = require('./routes/order-route');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: false
// }));

// app.use('/', indexRoute);
app.use('/cart', cartRoute);
// app.use('/products', productRoute);
// app.use('/customers', customerRoute);
// app.use('/orders', orderRoute);

app.get("/:sigla",  (req, res, next) => {
    // let data = new Cart(data);
    // await order.save();
    axios.get('http://www.transparencia.gov.br/api-de-dados/convenios?uf=' + req.params.sigla +'&pagina=1')
    .then((resp) => {
        // resp = JSON.parse(resp.data);
        resp = JSON.parse(JSON.stringify(resp.data))
        // res.json(JSON.parse(resp));
        // console.log(resp);
        // console.log(resp.servidor.id + " " + resp.servidor.nome);
        // resp.foreach(resp.servidor.id);
        let texto = []
        resp.forEach((current, i, array) => {
            texto[i] = {
                id: resp[i].id,
                nomeConvenente: resp[i].convenente.nome,
            };
            // texto = Object.assign(texto, resp[i].id + " " + resp[i].convenente.nome);
            // texto += resp[i].id + " " + resp[i].convenente.nome + '\n';
        })
        res.send(texto);
    }).catch((reason) => {
        // console.log('http://www.transparencia.gov.br/api-de-dados/convenios?uf=' + req.params.sigla +'&pagina=1')
        console.log(reason);
    })
    // res.send(req.body.name);
})


module.exports = app; //Podemos exportar algo desta classe
