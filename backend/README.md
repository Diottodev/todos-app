# Todos App Backend

> Backend para um aplicativo de gerenciamento de tarefas (todos), desenvolvido com NestJS, Prisma e PostgreSQL. O projeto oferece autenticação JWT, cadastro de usuários, criação e gerenciamento de tarefas categorizadas (pessoal, trabalho, estudo), além de testes automatizados e integração com Docker.

---

## Tecnologias Utilizadas

- **NestJS**: Framework Node.js para aplicações escaláveis.
- **Prisma ORM**: Mapeamento objeto-relacional para PostgreSQL.
- **PostgreSQL**: Banco de dados relacional.
- **Docker**: Containerização do banco de dados.
- **Jest**: Testes unitários e e2e.
- **Swagger**: Documentação automática da API.
- **ESLint & Prettier**: Padronização e formatação de código.

---

## Como rodar localmente

1. **Clone o repositório e acesse a pasta do backend:**
   ```bash
   git clone https://github.com/Diottodev/todos-app
   cd backend
   ```

2. **Instale as dependências:**
   ```bash
   yarn install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` com a seguinte variável:
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/todo-database"
   ```

4. **Suba o banco de dados com Docker:**
   ```bash
   docker-compose up -d
   ```

5. **Execute as migrações do Prisma:**
   ```bash
   yarn db:migrate
   ```

6. **Inicie o servidor em modo desenvolvimento:**
   ```bash
   yarn start:dev
   ```

7. **Acesse a documentação Swagger:**
   Normalmente disponível em `http://localhost:3000/api`

---

## Como rodar os testes

- **Testes unitários:**
  ```bash
  yarn test
  ```

- **Testes end-to-end:**
  ```bash
  yarn test:e2e
  ```

- **Cobertura dos testes:**
  ```bash
  yarn test:cov
  ```

---

## Como funciona o CI/CD

O projeto está preparado para integração contínua (CI/CD) utilizando plataformas como GitHub Actions, similares. O fluxo padrão inclui:

1. **Instalação das dependências**
2. **Execução dos testes unitários e e2e**
3. **Verificação de cobertura**
4. **Lint e formatação**
5. **Build para produção**
6. **Deploy (pode ser adaptado para plataformas como AWS, Vercel, Heroku, etc.)**

> **Observação:** O arquivo de configuração do CI/CD (`.github/workflows/ci.yml`) não está presente no projeto. Recomenda-se criar um workflow básico para rodar os comandos acima em cada push/pull request.

Exemplo de workflow para GitHub Actions:
```yaml
name: CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:latest
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: todo-database
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: yarn install
      - run: yarn db:migrate
      - run: yarn test
      - run: yarn test:e2e
      - run: yarn test:cov
      - run: yarn lint
```

---

## Estrutura das principais rotas

- **Autenticação:** `/auth/login`, `/auth/register`
- **Tarefas:** `/tasks` (CRUD, protegido por JWT)

---

## Prisma

O schema do Prisma define os modelos `User` e `Task`, com enumeração para tipos de tarefa (`PERSONAL`, `WORK`, `STUDY`). As migrações são gerenciadas via comando `yarn db:migrate`.

---

## Licença

Este projeto está sob licença MIT.


### Desenvolvido por Diottodev
