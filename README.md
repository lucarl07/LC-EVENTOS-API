# Atividade 01

Uma organização deseja simplificar o processo de gestão de participantes para seus eventos. Eles precisam de uma solução digital que permita aos participantes se cadastrarem de forma eficiente e segura, além de fornecer métricas importantes sobre o perfil dos participantes.

Desenvolva uma API que possibilite o cadastro de participantes de eventos, onde cada participante deverá fornecer informações como nome, e-mail, senha, idade e cidade onde mora. A API deve oferecer um conjunto completo de operações CRUD (Create, Read, Update, Delete) para gerenciar os participantes.

Além disso, a API deve oferecer as seguintes funcionalidades:

1. **Selecionar um Único participante**: A API deve ser capaz de selecionar um único participante
2. **Contagem de Participantes**: A API deve ser capaz de fornecer o número total de participantes cadastrados.
3. **Contagem de Maiores de Idade**: A API deve ser capaz de calcular quantos participantes têm idade igual ou superior a 18 anos.
4. **Identificação da Cidade com Maior Número de Participantes**: A API deve determinar qual cidade teve o maior número de participantes cadastrados.

Para resolver este problema, o você deverá projetar e implementar uma API, utilizando o **Módulo core HTTP** do nodejs para o desenvolvimento de APIs web. 

### Requisitos Funcionais:

1. **Restrição de Idade**: A API só permitirá o cadastro de participantes com idade igual ou superior a 16 anos.
2. **Verificação de Senha de Dois Fatores**: Ao cadastrar ou atualizar a senha de um participante, a API deverá implementar um processo de verificação de dois fatores para garantir a segurança das contas. 

Esses requisitos funcionais adicionais garantem não apenas a segurança dos dados dos participantes, mas também a conformidade com regulamentações de proteção de dados e privacidade.

### Rotas para Aplicação:

1. **POST /participants**: Rota para cadastrar um novo participante. O corpo da requisição deve incluir as informações do participante (nome, e-mail, senha, idade, cidade).
2. **GET /participants**: Rota para obter a lista de todos os participantes cadastrados.
3. **GET /participants/{id}**: Rota para obter os detalhes de um participante específico com base no seu ID.
4. **PUT /participants/{id}**: Rota para atualizar as informações de um participante específico com base no seu ID. O corpo da requisição deve incluir os dados a serem atualizados.
5. **DELETE /participants/{id}**: Rota para excluir um participante específico com base no seu ID.
6. **GET /participants/count**: Rota para contar o número total de participantes cadastrados.
7. **GET /participants/count/over18**: Rota para contar quantos participantes são maiores de 18 anos.
8. **GET /participants/city/most**: Rota para identificar a cidade com o maior número de participantes.