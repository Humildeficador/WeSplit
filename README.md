# WeSplit

Aplicação web para divisão de contas e gastos entre amigos ou moradores de uma mesma casa. Cada grupo registra suas despesas, e o sistema calcula automaticamente quem deve para quem.

## Stack

### Frontend
- **React** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (com tema de cores customizado)
- **React Router DOM** (rotas e navegação)
- **React Hook Form** + **Zod** (formulários e validação)
- **Axios** (requisições HTTP, com interceptors para autenticação)
- **Recharts** (gráficos)
- **Lucide React** (ícones)

### Backend
- **Node.js** + **TypeScript**
- **Fastify** (servidor HTTP)
- **Prisma ORM** + **SQLite**
- **Zod** (validação de schemas, integrado via `fastify-type-provider-zod`)
- **bcrypt** (hash de senhas)
- **@fastify/jwt** (geração e verificação de tokens JWT)
- **Swagger / Swagger UI** (documentação interativa da API)
- **Docker** (ambiente de desenvolvimento)

## Estrutura do projeto

```
WeSplit/
├── frontend/   → aplicação React (interface do usuário)
└── backend/    → API Fastify (regras de negócio e banco de dados)
```

Frontend e backend vivem no mesmo repositório, mas são desenvolvidos e versionados como projetos independentes, cada um com seu próprio `package.json` e dependências.

## Como rodar o projeto

### Backend

O backend roda em ambiente Docker.

```bash
cd backend
docker compose up --build
```

Na primeira vez que o ambiente for configurado (ou após mudanças no schema do banco), é necessário aplicar as migrations do Prisma dentro do container:

```bash
docker compose exec api npx prisma migrate dev
```

A API estará disponível em `http://localhost:3333`, com a documentação interativa (Swagger) em `http://localhost:3333/docs`.

### Frontend

```bash
cd frontend
pnpm install
pnpm run dev
```

A aplicação estará disponível em `http://localhost:5173` (ou na porta indicada pelo terminal).

## Fluxo de trabalho

- O frontend é desenvolvido de forma independente do backend, com dados mockados quando uma funcionalidade ainda não tem endpoint pronto.
- Cada funcionalidade é desenvolvida em uma branch própria (`feature/...`, `fix/...`, `refactor/...`, `chore/...`), com Pull Request revisado antes do merge na `main`.
- Os commits seguem o padrão [Conventional Commits](https://www.conventionalcommits.org/), com escopo indicando a área afetada (ex: `feat(dashboard): ...`, `fix(login): ...`).

## Funcionalidades

- [x] Autenticação (login com e-mail e senha, sessão persistida)
- [x] Dashboard com resumo financeiro (total a receber, a pagar, movimentado e despesas)
- [ ] Cadastro de usuário
- [ ] Criação e gerenciamento de grupos
- [ ] Registro de despesas com divisão automática entre participantes
- [ ] Cálculo de saldos (quem deve para quem)
- [ ] Relatórios e gráficos por categoria de gasto
