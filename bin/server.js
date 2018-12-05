'use strict' //Força o Js a ser mais criterioso (caso esqueça ponto e vírgula por exemplo)

//console.log('Testando...');

const app = require('../src/app');
const debug = require('debug')('nodestr:server');
const http = require('http');
//const express = require('http');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

console.log('API rodando na porta ' + port);

//Normalizar a porta da aplicação
//Tirada do express
function normalizePort(val){
    const port = parseInt(val, 10);

    if(isNaN(port)){
        return val;
    }

    if(port >= 0){
        return port;
    }

    return false;
}

//Checa erros e põe na tela
function onError(error){
    if(error.syscall !== 'listen'){
        throw error;
    }

    const bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

    switch(error.code){
        case 'EACCES': //Verifica se é um erro de permissão
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
    
        case 'EADDRINUSE': //Verifica se é endereço em uso
            console.error(bind + ' is already in use');
            process.exit(1);
            break;    
        default:
            throw error;
    }

}

//Pega as infos do servidor e seta o debug
function onListening(){
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}