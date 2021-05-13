# Tabela de consulta de clientes da empresa Pharma Inc

## Proposta

Construir uma **REST API** em **node** utilizando **MongoDB** juntamente com um front-end em **React** capaz de *exibir*, *editar*, *excluir* e *filtrar* clientes da empresa Pharma Inc.

## Ferramentas utilizadas

- Next.js;
- TypeScript;
- Bootstrap;
- Mongoose;
- MongoDB;
- React Data Table Component.

## Instalação

1. Criar o arquivo ***.env*** na raíz do diretório;
2. Inserir a constante ``MONGO_DB_URI`` com a *URI* de acesso ao seu banco de dados MongoDB;
3. Executar o comando na raíz do diretório:

```node
node buildDB.js
```

## Utilização

- Executar os comandos na raíz do diretório:

```node
yarn build
yarn start
```

## Rotas da API

- **GET /api/users?p=**
  - Lista todos os usuários da base de dados;
    - ***p*** recebe o número da página desejada.
- **GET /api/users/:userId**
  - Obtém a informação somente de um user da base de dados;
    - ***userId*** é a *ID* do usuário.
- **DELETE /api/users/:userId**
  - Remove o user da base de dados;
    - ***userId*** é a *ID* do usuário.
- **PUT /api/users/:userId?userObj=**
  - Será responsável por receber atualizações realizadas no front-end;
    - ***userId*** é a *ID* do usuário.
    - ***userObj*** recebe um objeto no formato do *model* do banco de dados.
- **GET /api/users/filter?userName=&userLastName=&userGender=&p=**
  - Lista todos os usuários da base de dados com base nos parâmetros de filtragem;
    - ***userName*** recebe o primeiro nome do usuário;
    - ***userLastName*** recebe o último nome do usuário;
    - ***userGender*** recebe o gênero do usuário;
    - ***p*** recebe o número da página desejada.
