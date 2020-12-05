var admin = require("firebase-admin");
const bodyParser = require('body-parser');
// arquivo contendo as chaves de acesso ao banco de dados
var serviceAccount = require("../projetos-topes-2020-firebase-adminsdk-6ynnf-91302e2967.json");
// instancia administrativo com acesso ao banco de dados configurado no arquivo anterior
admin.initializeApp({
				credential: admin.credential.cert(serviceAccount),
				databaseURL: "https://projetos-topes-2020.firebaseio.com"
});

module.exports = app => {
		app.get("/alunos", async (req, res) => {			
					// abre conexão com o banco de dados
					const conexao = admin.firestore();
					var lista = []

					// busca todos os itens da coleção alunos
					let alunosLista = await conexao.collection("alunos").get()
					//for para cada documento da coleção
					for (let alunoDoc of alunosLista.docs) {
						// pega o dado de cada documento 
						var aluno = alunoDoc.data()
						// imprime na tela o nome do aluno
						var idTurma = 'nao tem'
						if(aluno.turma !== undefined){
							idTurma = aluno.turma.id
						}

						lista.push(
							{
								nome: aluno.nome,
								turma: idTurma
							})						
					}

					res.send(
						{
							alunos: lista
						}
					);

	}
	);	

	app.get("/alunos/comturma", async (req, res) => {
	
					// abre conexão com o banco de dados
					const db = admin.firestore();
					var nomeAluno = ''

					// busca todos os itens da coleção alunos
					let alunosLista = await db.collection("alunos").get()
					//for para cada documento da coleção
					for (let alunoDoc of alunosLista.docs) {
						// pega o dado de cada documento 
						var aluno = alunoDoc.data()
						// imprime na tela o nome do aluno
						console.log(aluno.nome)
						nomeAluno = aluno.nome
						if (aluno.turma != undefined && aluno.turma != null) {
							// busca no banco o documento da turma
							let turmaDoc = await db.doc("/turma/" + aluno.turma.id).get()
							if (turmaDoc != undefined && turmaDoc != null) {
								var turma = turmaDoc.data()
								// junta o nome do aluno com a turma e sai do loop            
								res.send(
									{
										aluno: aluno.nome,
										turma: turma.nome
									}
								);
							}
						}
					}

					res.send(
						{
							aluno: nomeAluno
						}
					);

	}
	);

	app.delete("/alunos/:id", async (req, res) => {			

					var idAluno = req.params.id 

					// abre conexão com o banco de dados
					const conexao = admin.firestore();

					// busca todos os itens da coleção alunos
					//db.collection('cities').doc('DC').delete();

					let deleteDoc = await conexao.collection("alunos").doc(idAluno).delete()
					//for para cada documento da coleção
					res.send("ok");

	}
	);	

	app.post("/alunos/:nome", async (req, res) => {			
					var nomeAluno = req.params.nome 
					// abre conexão com o banco de dados
					const conexao = admin.firestore();

					const resultado = await conexao.collection('alunos').add(
						{
							nome: nomeAluno,
							dataCriado: new Date()
						}
					);

					res.send("ok");

	}
	);	

	// create application/json parser
	var jsonParser = bodyParser.json()
	app.post("/alunos", jsonParser, async function(req, res) {
		
			var nomeAluno = req.body.nome
 			var cursoAluno = req.body.curso
			 
			const conexao = admin.firestore();

			const resultado = await conexao.collection('alunos').add(
						{
							nome: nomeAluno,
							dataCriado: new Date(),
							curso: cursoAluno
						}
					);

					res.send("ok");
			
	});



	

};