'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    
    convenios: {
        default: undefined,
        type: [
            {
                id: {
                    type: String,
                    required: true
                },
                nomeConvenente: {
                    type: String,
                    required: true
                },
                nomeFantasia: {
                    type: String,
                    required: true
                },
                siglaEstado: {
                    type: String,
                    required: true
                },
                dataAbertura: {
                    type: String,
                    required: true
                } 
            }
        ]
    }
    // nomeConvenente:{
    //     type: String
    
    // },

    // nomeFantasia:{
    //     type: String
    
    // }, 

    // siglaEstado:{
    //     type: String
    
    // },

    // dataAbertura:{
    //     type: String
    
    // }
})

module.exports = mongoose.model('Cart', schema);
