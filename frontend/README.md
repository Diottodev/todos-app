# Frontend

- [Frontend](https://app.todolist.diottodev.com/register)

Interface web moderna para o gerenciamento de tarefas, conectada ao backend NestJS.

## Funcionalidades

- Cadastro e login de usuários
- Criação, edição e exclusão de tarefas
- Visualização de tarefas por categoria (pessoal, trabalho, estudo)
- Integração com API backend
- Interface responsiva

## Tecnologias

- **Next.js** (React)
- **TypeScript**
- **Cypress** (testes end-to-end)
- **ESLint & Prettier**

## Como rodar localmente

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Testes

Execute os testes end-to-end com:

```bash
npm run test:open
```

## CI/CD

O pipeline utiliza GitHub Actions, rodando testes, build, Docker e deploy automatizado. Veja o README principal para detalhes.

- Instala dependências
- Faz build e exportação
- Cria imagem Docker
- Realiza deploy automático via SSH para EC2

## Deploy

O deploy é feito automaticamente para uma instância EC2 configurada via secrets no GitHub.

---

Dúvidas ou sugestões? Abra uma issue ou pull request.

```


## Futuras melhorias

- Melhorar cobertura de testes Cypress no frontend
- Refatoraração continua
```
