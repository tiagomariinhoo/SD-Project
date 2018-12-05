'use strict';

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

//Carrega os Models
// const Product = require('./models/product');
// const Customer = require('./models/customer');
// const Order = require('./models/order');
const Car = require('./models/cart');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

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

module.exports = app; //Podemos exportar algo desta classe