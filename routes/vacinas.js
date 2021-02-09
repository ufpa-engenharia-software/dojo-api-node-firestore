var admin = require("firebase-admin");
// arquivo contendo as chaves de acesso ao banco de dados
var serviceAccount = require("../bdi-ere-ufpa-firebase-adminsdk-93ff4-811cc23b4a.json");
// instancia administrativo com acesso ao banco de dados configurado no arquivo anterior
admin.initializeApp({
				credential: admin.credential.cert(serviceAccount),
				databaseURL: "https://bdi-ere-ufpa.firebaseio.com"
});

module.exports = app => {

		app.get("/vacinas", async (req, res) => {			
					// abre conexão com o banco de dados
					const conexao = admin.firestore();
					var lista = []

					// busca todos os itens da coleção alunos
					let vacinasLista = await conexao.collection("vacinas").get()
					//for para cada documento da coleção
					for (let vacinaDoc of vacinasLista.docs) {
						// pega o dado de cada documento 
						var vacina = vacinaDoc.data()
						// imprime na tela o nome do aluno
						var fabricanteNome = 'nao tem'
						if(vacina.fabricante !== undefined){
							fabricanteNome = vacina.fabricante
						}
						lista.push(
							{
								nome: vacina.id,
								fabricante: fabricanteNome
							}
						)						
					}

					res.send(
						{
							vacinas: lista
						}
					);

	}
	);	

	app.get("/pessoas", async (req, res) => {			
					// abre conexão com o banco de dados
					const conexao = admin.firestore();
					var lista = []

					// busca todos os itens da coleção alunos
					let pessoaLista = await conexao.collection("pessoas").get()
					//for para cada documento da coleção
					for (let pessoaDoc of pessoaLista.docs) {
						// pega o dado de cada documento 
						var pessoa = pessoaDoc.data()
						// imprime na tela o nome do aluno
						var pessoaNome = 'nao tem'
						if(pessoa.nome !== undefined){
							pessoaNome = pessoa.nome
						}

						lista.push(
							{
								nome: pessoa.nome,
								prof: pessoa.profissao,
								nasceu: pessoa.nascimento
							}
						)						
					}

					res.send(
						{
							vacinas: lista
						}
					);

	}
	);	

	
};