//importação de pacotes
const express = require('express');
const consign = require('consign');
//inicializa a aplicacao com express
const app = express();
//importa arquivos em subpastas para o index
consign().
then("routes"). // todos os arquivos na pasta routes com os serviços REST
into(app);

// manda rodar aplicação na porta 3000
app.listen(3000, () => {
	console.log('server started');
});