'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    id: {
        type: String,
        required: true
    }, 
    
    nome:{
        type: String,
        required: true
    }, 

    nomeFantasia:{
        type: String,
        required: true
    }, 

    siglaEstado:{
        type: String,
        required: true
    },

    dataAbertura:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Cart', schema);