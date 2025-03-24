/** LC EVENTOS - API de Gerenciamento
 * Desenvolvida por: lucarl07
 * Métodos: POST, GET, PUT, DELETE
 * PORT: 3010
 */

import http from 'node:http';

const PORT = 3010;

const participants = [], partIds = [];

const server = http.createServer((request, response) => {
    const { method, url } = request;

    if (method === 'POST' && url === '/participants') {
        /** Adicionar um novo participante:
         * Rota para cadastrar um novo participante.
         * O corpo da requisição deve incluir seu nome, email, senha, idade e a cidade.
         * O participante deve ter no mínimo 16 anos de idade.
         */
 
        console.log('Para criar uma conta, lembre-se: \n1. O corpo da requisição deve incluir seu nome, email, senha, idade e a cidade. \n2. Você deve ter no mínimo 16 anos de idade para criar uma conta.')
        
        let body = "";

        try {
            request.on('data', (chunk) => {
                body += chunk.toString();
            });
    
            request.on('end', () => {
                const newPart = JSON.parse(body)
                newPart.id = 1 + participants.length;
                
                if (newPart.idade >= 16) {
                    participants.push(newPart)
                    console.log('Cadastro realizado com sucesso! \n');
    
                    response.writeHead(201, {"Content-Type": "application/json"})
                    response.end(JSON.stringify(newPart));
                } else {
                    console.log('Seu cadastro foi recusado. \n')
                    response.writeHead(401, {"Content-Type": "application/json"})
                    response.end(JSON.stringify({
                        resposta: "Cadastro recusado. \n",
                        motivo: "Usuário não corresponde a idade mínima exigida (16 anos)."
                    }));
                }
            });
        } catch (error) {
            console.log(error)
            response.writeHead(500, {"Content-Type": "application/json"})
            response.end(JSON.stringify({
                resposta: "Cadastro recusado por interno no servidor. \n",
                motivo: "Erro de código e/ou formatação de dados na criação do usuário."
            }));
        }
    } else if (method === 'GET' && url === '/participants') {
        /** Ver participantes:
         * Rota para obter a lista de todos os participantes cadastrados.
         * Retornará o status "204 No Content" no caso de não ter nenhuma pessoa cadastrada.
         */
        
        console.log('Pesquisando todos os participantes... \n');

        if (participants.length > 0) {
            response.setHeader('Content-Type', 'application/json')
        } else {
            response.writeHead(204, {"Content-Type": "application/json"})
        }
        
        response.end(JSON.stringify(participants));
    } else if (method === 'GET' && url === '/participants/count') {
        /** Ver o número de participantes:
         * Rota para contar o número total de participantes cadastrados.
         */

        const count = participants.length
        const pluralOrSingular = count > 1 ? 'participantes' : 'participante'

        if (count === 0) {
            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify({
                resposta: 'Nenhum participante cadastrado no momento.'
            }))
        } else {
            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify({
                resposta: `${count} ${pluralOrSingular}`
            }))
        }
    } else if (method === 'GET' && url.startsWith('/participants/')) {
        /** Ver um participante:
         * Rota para obter os detalhes de um participante específico com base no seu ID.
         */

        const partId = Number(url.split('/')[2])
        console.log(`Pesquisando o usuário ${partId}...`)

        const participant = participants.find(part => part.id == partId);

        if (participant) {
            console.log('Usuário encontrado! \n')
            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify(participant));
        } else {
            console.log('Usuário não encontrado. \n')
            response.writeHead(404, {"Content-Type": "application/json"})
            response.end(JSON.stringify({resposta: "Usuário não encontrado."}));
        }
    } else if (method === 'PUT' && url.startsWith('/participants/')) {
        /** Atualizar dados de um participante:
         * Rota para atualizar as informações de um participante específico com base no seu ID.
         * O corpo da requisição deve incluir os dados a serem atualizados.
         */

        const partId = url.split('/')[2]
        console.log(`Atualizando os dados do usuário ${partId}...`)

        let body = "";

        request.on('data', (chunk) => {
            body += chunk.toString();
        });

        request.on('end', () => {
            const updatedPart = JSON.parse(body)
            const index = participants.findIndex(part => part.id == partId);

            if (index !== -1) {
                participants[index] = {...updatedPart, id: Number(partId)};
                console.log('Usuário atualizado com sucesso! \n')

                response.setHeader('Content-Type', 'application/json')
                response.end(JSON.stringify(participants[index]));
            } else {
                console.log('Usuário não encontrado. \n')
                response.writeHead(404, {"Content-Type": "application/json"})
                response.end(JSON.stringify({resposta: "Usuário não encontrado."}));
            }
        });
    } else if (method === 'DELETE' && url.startsWith('/participants/')) {
        /** Remover um participante:
         * Rota para excluir um participante específico com base no seu ID.
         */

        const partId = url.split('/')[2]
        const index = participants.findIndex(part => part.id == partId);
        console.log(`Removendo o usuário ${partId}...`)

        if (index !== -1) {
            participants.splice(index, 1)
            console.log('Usuário removido com sucesso! \n');

            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify({
                resposta: "Usuário removido com sucesso.",
                dica: "Acesse GET http://localhost:3010/participants para ver os usuários ainda existentes."
            }));
        } else {
            console.log('Usuário não encontrado. Parece que ele nunca existiu mesmo. ¯\\_(ツ)_/¯ \n')
            response.writeHead(404, {"Content-Type": "application/json"})
            response.end(JSON.stringify({resposta: "Usuário não encontrado."}));
        }
    }
})

server.listen(PORT, () => {
    console.log(`LC-EVENTOS-API está em execução! \nServer on PORT: ${PORT}`)
})