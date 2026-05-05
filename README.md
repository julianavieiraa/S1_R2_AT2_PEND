# Lojinha da Ju

Projeto desenvolvido para a Unidade Curricular de Programação Front-End.

A aplicação consiste em um sistema web com interface gráfica que consome uma API desenvolvida em Node.js. Todas as operações de CRUD (criar, listar, editar e excluir produtos) são realizadas diretamente pela interface do sistema, sem necessidade de ferramentas externas como Insomnia.

## Tecnologias utilizadas

- HTML  
- CSS  
- JavaScript  
- Node.js  
- Express  
- MySQL  

 Como clonar o projeto

Abra o terminal e execute:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git

cd nome-do-projeto
````

Configuração do banco de dados:

Abra o MySQL Workbench
Execute o script SQL disponível no projeto
Verifique se o banco loja_informatica foi criado
Confirme se as tabelas foram geradas corretamente
Como iniciar o backend


Acesse a pasta do backend:

```bash
cd backend
````

Instale as dependências:

````bash
npm install
````
Inicie o servidor:


````bash
nodemon ./server
````

A API será executada em:

http://localhost:8000


Como executar o frontend:

Abra o arquivo index.html no navegador
ou utilize a extensão Live Server no VS Code

Uso da interface

Toda a interação com o sistema é feita pela interface web.

Uso da interface

Ao abrir a aplicação, será exibida a tela inicial.

- Clique em "Ver Produtos" para acessar a listagem.

Listar produtos
- A interface carrega automaticamente os produtos cadastrados no banco.

Cadastrar produto
- Clique em "Novo Produto"  
- Preencha os campos do formulário exibido na tela  
- Clique em "Criar" para salvar o produto  

Editar produto
- Clique no botão "Editar" em um produto  
- Altere os dados no formulário de edição  
- Clique em "Salvar"  

Excluir produto
- Clique no botão "Excluir"  
- Confirme a exclusão na janela exibida  

Endpoints da API

````bash
GET /produtos
POST /produtos
PUT /produtos/:id
DELETE /produtos/:id
````

Exemplo de uso


````bash
Criação de um produto:

{
  "nome": "Mouse Gamer",
  "preco": 150,
  "imagem": "https://link-da-imagem.com/mouse.png"
}
````

Todas as ações são processadas pela API e atualizadas automaticamente na interface, sem recarregar a página.

Observações
O backend deve estar em execução para que a interface funcione corretamente
É necessário ter pelo menos cinco produtos cadastrados para atender aos requisitos da atividade
A comunicação com a API é feita utilizando fetch()
Os elementos da interface são criados dinamicamente com createElement()
