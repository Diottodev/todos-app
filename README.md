# Minhas tarefas - Todo app – Monorepo

O `Minhas tarefas` - Todo app - é uma plataforma moderna para organização de tarefas, pensada para produtividade pessoal e de equipes. Desenvolvido em arquitetura monorepo, integra backend robusto, frontend responsivo e automação CI/CD.

## Links

- [Frontend](https://app.todolist.diottodev.com/register)
- [Backend - Documentação com Swagger](https://api.todolist.diottodev.com/api/docs)

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

O **Minhas tarefas - Todo app -** é uma solução completa para gerenciamento de tarefas, desenvolvida em arquitetura monorepo. O objetivo é fornecer uma experiência moderna, segura e escalável tanto para usuários finais quanto para desenvolvedores.

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
   npm install
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
   npm run prisma:migrate:dev
   npm run start:dev
   ```

### Frontend

1. Instale as dependências:
   ```bash
   cd frontend
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## Como rodar os testes

### Backend

Execute os testes unitários e de integração:

```bash
npm run test
```

Para testes end-to-end:

```bash
npm run test:e2e
```

### Frontend

Execute os testes end-to-end com Cypress:

```bash
npm run cypress:open
```

Ou rode em modo headless:

```bash
npm run cypress:run
```

---

## Pipeline CI/CD (GitHub Actions)

O CI/CD utiliza GitHub Actions e é disparado em push/pull request para a branch `master`.

### Etapas principais:

1. **Checkout do código**
2. **Instalação de dependências e build do backend** (`npm install`, `npm run build`)
3. **Testes automatizados backend** (`npm run test`)
4. **Instalação de dependências e build do frontend** (`npm install`, `npm run build`)
5. **Testes automatizados frontend** (`npm run test:component`)
6. **Build e push das imagens Docker** (API e Frontend)
7. **Deploy automatizado em EC2 via SSH**

Secrets e variáveis de ambiente são gerenciados pelo GitHub Actions.

### Notificações e Health Check

- Após cada execução do pipeline, uma workflow secundária envia notificações para o Discord informando sucesso ou falha do deploy.
- Existe uma rotina de health check que verifica periodicamente a saúde da API e envia alertas em caso de falha.

#### Exemplo de workflow (resumido)

```yaml
name: CI-CD-APP

on:
  push:
    branches: [master]
    paths-ignore:
      - "README.md"
      - "backend/README.md"
      - "frontend/README.md"
  pull_request:
    branches: [master]
    paths-ignore:
      - "README.md"
      - "backend/README.md"
      - "frontend/README.md"
  workflow_dispatch:

concurrency:
  group: deploy-production
  cancel-in-progress: true

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    env:
      NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}
      DATABASE_URL: ${{ secrets.DATABASE_URL }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install dependencies (backend)
        run: npm ci
        working-directory: backend

      - name: generate Prisma client
        run: npx prisma generate
        working-directory: backend

      - name: Run tests
        run: |
          ./node_modules/.bin/jest
        working-directory: backend

      - name: Build API
        run: npm run build
        working-directory: backend

      - name: Set up Node.js (frontend)
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install dependencies (frontend)
        run: npm ci
        working-directory: frontend

      - name: Run tests (frontend)
        run: npm run test:component
        working-directory: frontend

      - name: Build frontend
        run: npm run build
        working-directory: frontend

  dockerize:
    needs: build-and-test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to DockerHub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_PASSWORD }}

      - name: Build and push API Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          file: Dockerfile.api
          push: true
          tags: ${{ secrets.DOCKERHUB_USERNAME }}/todos-api:latest
          build-args: |
            RUN_PRISMA=false

      - name: Build and push Frontend Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          file: Dockerfile.front
          push: true
          tags: ${{ secrets.DOCKERHUB_USERNAME }}/frontend:latest

  deploy:
    needs: dockerize
    runs-on: ubuntu-latest
    timeout-minutes: 30

    steps:
      - name: Deploy to EC2
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}
          port: ${{ secrets.EC2_PORT || 22 }}
          debug: true
          envs: RUN_PRISMA
          script: |
            export RUN_PRISMA=true
            cd ~/todos-app
            set -o allexport
            source backend/.env
            set +o allexport
            git pull
            docker compose build
            docker compose up -d --remove-orphans
```

Veja o arquivo `.github/workflows/ci-cd.yml` para detalhes completos.

## Infraestrutura e Deploy

Após o deploy dos serviços no EC2, o servidor EC2 utiliza o Nginx como load balancer para gerenciar o DNS. O Nginx direciona as requisições do domínio para os links corretos do frontend e backend, garantindo alta disponibilidade e roteamento eficiente entre os serviços.

O **Minhas tarefas - Todo app -** é uma solução completa para gerenciamento de tarefas, desenvolvida em arquitetura monorepo. O objetivo é fornecer uma experiência moderna, segura e escalável tanto para usuários finais quanto para desenvolvedores.

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
