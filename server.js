const http = require('http');//importa o módulo nativo "http"
const colors = require('colors');//importa o módulo colors
const fs = require('fs');//importa módulo File System para ler arquivos
const path = require('path');//importa módulo para "caminho" e (rotas se for express)

//simular dados de um banco de dados
const dados = [
    { id: 1, nomedados: "Lírio", valor: 175 },
    { id: 2, nomedados: "Orquídea", valor: 230 },
    { id: 3, nomedados: "Tulipa", valor: 300 },
    { id: 4, nomedados: "Rosa Vermelha", valor: 100 },
    { id: 5, nomedados: "Girassol", valor: 250 },
    { id: 6, nomedados: "Crisântemo", valor: 367 }
];

//criar o servidor
//função callback que recebe a requisição (req) e a resposta (res)
// req (Request): informações sobre o pedido do usuário.
// res (Response): objeto para enviar a resposta de volta ao usuário.
const server = http.createServer((req, res) =>{

        //log para ver qual URL está sendo acessada no terminal
        console.log(`Requisição recebida: ${req.url}`.green);

       // roteamento simple (caminho da URL)
    if (req.url === '/'){
        //lê o arquio 'index.html' que estána pasta "public"
        const filePath = path.join(__dirname, 'public' , 'index.html');

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Erro do servidor');
            }else {
                res.writeHead(200, {'Content-Type': 'text/ html; charset=utf-8'});
                res.end(content);
            }
        });
    } 

    //rota da API retorna a tabela em formato JSON
    //localhost:3000/api/jogos que pode ser consumida no front-end
    else if (req.url === '/api/floricultura'){
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        res.end(JSON.stringify(dados));
    }

     else {
        const file404 = path.join(__dirname, 'public', '404.html');

        fs.readFile(file404, 'utf8', (err, content) => {
            if (err) {
                console.log(`Erro ao ler 404.html: ${err}`.red);
                res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
                res.end(`Erro! O servidor tentou ler o arquivo aqui: ${file404} e não conseguiu.`);
            } else {
                console.log('Arquivo 404.html carregado com sucesso!'.green);
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(content);
            }
        });
    }
});
    

//configurar a porta do servidor
const PORT = 3000;

//iniciar o servidor usar o listem para ouvir a porta
server.listen(PORT, () => {
    console.log(`Servidor Rodando http://localhost:${PORT}`.green.bold);
});