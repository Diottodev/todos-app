# Taskedtask – Monorepo

O Taskedtask é uma plataforma moderna para organização de tarefas, pensada para produtividade pessoal e de equipes. Desenvolvido em arquitetura monorepo, integra backend robusto, frontend responsivo e automação CI/CD.

## Links

- [Frontend](https://app.todolist.diottodev.com)
- [Backend - Documentação com Swagger](https://api.todolist.diottodev.com/api)

---

Este repositório contém uma aplicação completa de gerenciamento de tarefas, dividida em dois projetos principais:

- **Backend:** API RESTful construída com NestJS, Prisma e PostgreSQL.
- **Frontend:** Interface web moderna desenvolvida com Next.js.

## Arquitetura

- **Monorepo:** Backend e frontend juntos, facilitando integração e manutenção.
- **Backend:** API RESTful, autenticação, regras de negócio, persistência de dados.
- **Frontend:** Interface web, autenticação, integração com API, experiência de usuário moderna.
- **CI/CD:** Pipelines automatizadas para testes, build, Docker e deploy.

## Desenho do Sistema

```
Usuário <-> Frontend (Next.js) <-> Backend (NestJS) <-> Banco de Dados (PostgreSQL)
```

O frontend consome a API do backend, que gerencia autenticação, regras de negócio e persistência dos dados. Toda comunicação é protegida e validada.

## Principais Funcionalidades

- Cadastro e login de usuários
- Criação, edição, categorização e exclusão de tarefas
- Visualização de tarefas por categoria
- Testes automatizados
- Deploy automatizado

# Sobre o Projeto

O **Taskedtask** é uma solução completa para gerenciamento de tarefas, desenvolvida em arquitetura monorepo. O objetivo é fornecer uma experiência moderna, segura e escalável tanto para usuários finais quanto para desenvolvedores.

## Para que serve?

Permite que usuários criem, editem, categorizem e excluam tarefas, com autenticação segura e interface intuitiva. Ideal para uso pessoal, equipes de trabalho ou estudos.

## Arquitetura

- **Monorepo:** Backend e frontend no mesmo repositório, facilitando integração e manutenção.
- **Backend:** API RESTful com NestJS, Prisma e PostgreSQL, autenticação JWT, testes automatizados, documentação Swagger e deploy via Docker.
- **Frontend:** Interface web responsiva com Next.js, autenticação, integração com API, testes end-to-end com Cypress.
- **CI/CD:** Pipelines GitHub Actions para testes, build, Docker e deploy automatizado em EC2.

---

## Como rodar localmente

### Backend

1. Clone o repositório e acesse a pasta do backend:
   ```bash
   git clone https://github.com/Diottodev/todos-app
   cd backend
   ```
2. Instale as dependências:
   ```bash
   yarn install
   ```
3. Configure as variáveis de ambiente (`.env`):
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/todo-database"
   ```
4. Suba o banco de dados com Docker:
   ```bash
   docker-compose up -d
   ```
5. Rode as migrações e inicie o servidor:
   ```bash
   yarn prisma migrate dev
   yarn start:dev
   ```

### Frontend

1. Instale as dependências:
   ```bash
   cd frontend
   yarn install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   yarn dev
   ```
3. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## Como rodar os testes

### Backend

Execute os testes unitários e de integração:

```bash
yarn test
```

Para testes end-to-end:

```bash
yarn test:e2e
```

### Frontend

Execute os testes end-to-end com Cypress:

```bash
yarn cypress open
```

Ou rode em modo headless:

```bash
yarn cypress run
```

---


## Pipeline CI/CD e Notificações

O CI/CD do Taskedtask utiliza pipelines modernas para garantir qualidade, integração contínua, deploy automatizado e notificações em tempo real.

### Pepeline 

- **Disparo:** Pushs ou Pull Requests para a branch principal (`master`)
- **Etapas principais:**
  1. Checkout do código
  2. Instalação de dependências e build do backend (NestJS)
  3. Execução dos testes automatizados do backend
  4. Instalação de dependências e build do frontend (Next.js)
  5. Build das imagens Docker (API e Frontend)
  6. Push das imagens para o DockerHub
  7. Deploy automatizado em EC2 via SSH

Secrets e variáveis de ambiente são gerenciados pelo GitHub Actions para garantir segurança.

#### Notificações e Health Check  

- Após cada execução do pipeline, uma workflow secundária envia notificações para o Discord informando sucesso ou falha do deploy.
- Existe também uma rotina de health check que verifica periodicamente a saúde da API e envia alertas em caso de falha.

#### Exemplo de workflow (resumido)

```yaml
on:
  push:
    branches: [master]
  pull_request:
    branches: [master]
jobs:
  build-and-test:
    steps:
      - uses: actions/checkout@v4
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
      - name: Install dependencies
        run: cd backend && yarn install
      - name: Run tests
        run: cd backend && yarn test
      - name: Build API
        run: cd backend && yarn build
      - name: Install dependencies (frontend)
        run: cd frontend && yarn install
      - name: Build frontend
        run: cd frontend && yarn build
  dockerize:
    needs: build-and-test
    steps:
      - name: Build and push API Docker image
        uses: docker/build-push-action@v5
        with:
          file: Dockerfile.api
          push: true
      - name: Build and push Frontend Docker image
        uses: docker/build-push-action@v5
        with:
          file: Dockerfile.front
          push: true
  deploy:
    needs: dockerize
    steps:
      - name: Deploy to EC2
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            cd ~/todos-app
            git pull
            docker compose build
            docker compose up -d --remove-orphans
```

#### Notificações Discord

Após o deploy, o workflow `notify.yml` envia mensagens para o Discord informando sucesso ou falha, e também realiza health check na API, alertando se houver problemas.

Consulte os arquivos em `.github/workflows/` para detalhes e customizações específicas.

## Estrutura do Projeto

```
todos-app/
│
├── backend/   # API, banco de dados, autenticação, testes
├── frontend/  # Interface web, autenticação, integração com API
└── .github/
    └── workflows/  # Pipelines CI/CD para ambos os projetos
```

---

---

### Desenvolvidor por Diottodev
