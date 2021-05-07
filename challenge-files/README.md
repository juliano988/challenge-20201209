# Fullstack Challenge 20201209

## Introdução

Este é um desafio para testar seus conhecimentos de Full stack;

O objetivo é avaliar a sua forma de estruturação e autonomia em decisões para construir algo escalável utilizando os Frameworks sugeridos na vaga aplicada.

## Case

A empresa Pharma Inc, está trabalhando em um projeto em colaboração com sua base de clientes para facilitar a gestão e visualização da informação dos seus pacientes de maneira simples e objetiva em um Dashboard onde podem listar, filtrar e expandir os dados disponíveis.
O seu objetivo nesse projeto, é trabalhar no desenvolvimento da plataforma da empresa Pharma Inc seguindo os requisitos propostos neste desafio.

## Recursos

1. Desenvolver REST API importando os dados do projeto: https://randomuser.me/documentation
2. Utilizar Frameworks CSS, recomendamos alguns como:

    - Tailwind CSS: https://tailwindcss.com/
    - Material UI: https://material-ui.com/
    - Angular Material: https://material.angular.io/
    - Bootstrap: https://getbootstrap.com/
    - Bulma: https://bulma.io/

3. Trabalhar em um [FORK](https://lab.coodesh.com/help/gitlab-basics/fork-project.md) deste repositório em seu usuário;


## API / Back-End

### Modelo de Dados:

Para a definição do modelo, consultar o arquivo [model.json](model.json) com os campos a serem trabalhados.

### Importar Dados:

Antes de seguir com o desafio, devemos importar a lista de usuarios do arquivo [users.json](users.json), o arquivo contem 500 registros no seguinte formato:

```json
{
   "results": [
       {}
   ],
   "info": {
       "seed": "2f10116f1799d353",
       "results": 500,
       "page": 1,
       "version": "1.3"
   }
}
```

### REST API

Para desenvolver a API, precisamos definir o Framework para trabalhar, para isso revisar na vaga a tecnologia de Back-end obrigatória. Em caso de ter duas stacks, utilizar a de preferência.

Detalhes para desenvolver a REST API:

- Nós ainda não temos o Banco de Dados! Então precisamos que você implemente e configure a criação do Banco de Dados com base no model.

- Criar os endpoints:
   - `GET /`: Retornar uma mensagem "REST Fullstack Challenge 20201209 Running"
   - `PUT /users/:userId`: Será responsável por receber atualizações realizadas no Projeto Web
   - `DELETE /users/:userId`: Remover o user da base
   - `GET /users/:userId`: Obter a informação somente de um user da base de dados
   - `GET /users`: Listar todos os usuários da base de dados
- Integrar a API com o banco de dados solicitado para persistir os dados

### Extras

- **Diferencial 1** Escrever Unit Test nos endpoints
- **Diferencial 2** Executar o projeto usando Docker
- **Diferencial 3** Escrever um esquema de segurança utilizando `API KEY` nos endpoints. Ref: https://learning.postman.com/docs/sending-requests/authorization/#api-key
- **Diferencial 4** Descrever a documentação da API utilizando o conceito de Open API 3.0;

## Front-end:

### Lista de Pacientes

A tela inicial do projeto será um lista de pacientes que deverá conter um buscador para facilitar filtrar todos os que são exibidos na lista, proposta de tela:

![List users](assets/list.png)

Para obter os dados, utilizaremos a REST API desenvolvida.

Além de realizar a request, devemos aplicar alguns filtros na API:

- Limitar em 50 resultados por request
- Adicionar o parâmetro de paginação para controlar o `Loading more`

### Visualizar paciente / Editar

Na coluna de ações da tabela, existe o botão visualizar para expandir os dados dos pacientes. Seguir o modelo proposto:

![View user](assets/view.png)

Devemos exibir os seguintes campos do paciente:

- Imagem
- Nome completo
- Email
- Gênero
- Data de nascimento
- Telefone
- Nacionalidade
- Endereço
- ID (Número de identificação)

### Extras

Além do desafio proposto com as duas telas, temos alguns diferenciais:

- **Diferencial 1** Adicionar um filtro por Gênero na tabela;
- **Diferencial 2** Configurar o buscador para poder filtrar por nome e nacionalidade;
- **Diferencial 3** Adicionar o paginador rota para facilitar compartilhar o link e manter a posição na lista;
- **Diferencial 4** Escrever Unit tests da lista de pacientes;
- **Diferencial 5** Configurar Docker no Projeto para facilitar o Deploy da equipe de DevOps;

## Readme do Repositório

- Deve conter o título do projeto
- Uma descrição de uma frase
- Como instalar e usar o projeto (instruções)
- Não esqueça o [.gitignore](https://www.toptal.com/developers/gitignore)

## Finalização

Avisar sobre a finalização e enviar para correção em: [https://coodesh.com/review-challenge](https://coodesh.com/review-challenge)
Após essa etapa será marcado a apresentação/correção do projeto.

## Instruções para a Apresentação:

1. Será necessário compartilhar a tela durante a vídeo chamada;
2. Deixe todos os projetos de solução previamente abertos em seu computador antes de iniciar a chamada;
3. Deixe os ambientes configurados e prontos para rodar;
4. Prepara-se pois você será questionado sobre cada etapa e decisão do Challenge;
5. Prepare uma lista de perguntas, dúvidas, sugestões de melhorias e feedbacks (caso tenha).

## Suporte

Use o nosso canal no slack: http://bit.ly/32CuOMy para tirar dúvidas sobre o processo ou envie um e-mail para contato@coodesh.com.
