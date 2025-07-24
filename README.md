# Todos App – Monorepo

Este repositório contém uma aplicação completa de gerenciamento de tarefas, dividida em dois projetos principais:

- **Backend:** API RESTful construída com NestJS, Prisma e PostgreSQL.
- **Frontend:** Interface web moderna desenvolvida com Next.js.

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

## Backend

### Descrição

O backend oferece autenticação JWT, cadastro de usuários, criação e gerenciamento de tarefas categorizadas (pessoal, trabalho, estudo), testes automatizados e integração com Docker.

### Tecnologias

- **NestJS:** Framework Node.js para APIs escaláveis.
- **Prisma ORM:** Mapeamento objeto-relacional para PostgreSQL.
- **PostgreSQL:** Banco de dados relacional.
- **Docker:** Containerização do banco de dados.
- **Jest:** Testes unitários e e2e.
- **Swagger:** Documentação automática da API.
- **ESLint & Prettier:** Padronização e formatação de código.

### Como rodar localmente

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
   ```
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

---

## Frontend

### Descrição

Interface web responsiva para o gerenciamento de tarefas, autenticação de usuários e integração com a API backend.

### Tecnologias

- **Next.js:** Framework React para aplicações web modernas.
- **TypeScript:** Tipagem estática.
- **Cypress:** Testes end-to-end.
- **ESLint & Prettier:** Padronização de código.

### Como rodar localmente

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

## CI/CD – GitHub Actions

O projeto utiliza pipelines automatizadas para garantir qualidade e facilitar o deploy:

### Backend (`.github/workflows/ci-cd-backend.yml`)

- **Disparo:** Pushs na branch `main` que alterem arquivos do backend.
- **Etapas:**
  1. Checkout do código.
  2. Setup do Node.js.
  3. Instalação de dependências.
  4. Execução dos testes (`yarn test`).
  5. Build do projeto.
  6. Build da imagem Docker.
  7. Deploy automatizado via SSH para uma instância EC2 (AWS).

### Frontend (`.github/workflows/ci-cd-frontend.yml`)

- **Disparo:** Pushs na branch `main` que alterem arquivos do frontend.
- **Etapas:**
  1. Checkout do código.
  2. Setup do Node.js.
  3. Instalação de dependências.
  4. Execução dos testes (`yarn test`).
  5. Build do projeto e exportação estática.
  6. Build da imagem Docker.
  7. Deploy automatizado via SSH para uma instância EC2 (AWS).

**Obs:** O acesso à EC2 é feito via secrets configurados no GitHub (`EC2_HOST`, etc).

---

### Desenvolvidor por Diottodev
