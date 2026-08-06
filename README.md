# Adonai API

API REST em desenvolvimento para gerenciamento de produtos, categorias, pedidos
e endereços de usuários.

O projeto segue **arquitetura hexagonal (ports & adapters)**, organizada por
camadas para facilitar a evolução e a inclusão de novos recursos.

## Arquitetura

```text
HTTP (driving) → Application (use cases) → Ports ← Infrastructure (driven)
                       ↑
                    Domain
```

- **Domain**: entidades, tipos e erros de negócio (sem dependências externas)
- **Application**: casos de uso e contratos (ports) de saída
- **Infrastructure**: adapters (Drizzle/Postgres, Redis, S3) e composition root
- **HTTP**: controllers, routes, schemas Zod e middlewares

```text
src/
├── domain/                 # Regras e tipos de negócio
│   ├── category/
│   ├── product/
│   ├── order/
│   ├── user-address/
│   └── shared/
├── application/
│   ├── ports/outbound/     # Contratos (repositories, cache, storage)
│   └── use-cases/          # Orquestração da aplicação
├── infrastructure/
│   ├── config/             # Variáveis de ambiente
│   ├── database/           # Schema e conexão Drizzle
│   ├── persistence/        # Adapters de banco
│   ├── cache/              # Adapter Redis
│   ├── storage/            # Adapter S3
│   └── di/                 # Composition root
├── http/
│   ├── controllers/
│   ├── routes/
│   ├── schemas/
│   └── middlewares/
└── server.ts               # Entry point
```

Fluxo típico:

```text
Route → Controller → Use Case → Port → Adapter (DB / Cache / S3)
```

## Tecnologias

- Node.js e TypeScript
- Fastify
- PostgreSQL + Drizzle ORM
- Redis
- AWS S3
- Zod
- JWT
- Swagger
- Docker Compose

## Pré-requisitos

- Node.js 20+
- PostgreSQL
- Redis
- Credenciais AWS S3
- Docker Compose (opcional, para o banco)

## Configuração

```bash
npm ci
```

Crie um `.env`:

```env
DATABASE_URL=postgresql://adonai:adonai@localhost:5432/adonai
REDIS_URL=redis://localhost:6379
JWT_SECRET=substitua-por-um-segredo-seguro

AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=sua-access-key
AWS_SECRET_ACCESS_KEY=sua-secret-key
AWS_BUCKET_NAME=nome-do-bucket
```

## Banco de dados

```bash
docker compose up -d db
```

As tabelas estão em `src/infrastructure/database/schema.ts`. Ainda não há
migrations versionadas; as tabelas precisam existir antes de subir a API.

## Executando

```bash
npm start
```

API em `http://localhost:3000`.

## Rotas

### Categorias (`/category`)

| Método | Rota | Descrição |
| --- | --- | --- |
| `POST` | `/category/` | Cria categoria |
| `GET` | `/category/` | Lista categorias |
| `GET` | `/category/:id` | Busca categoria |
| `PUT` | `/category/:id` | Atualiza categoria |
| `DELETE` | `/category/:id` | Remove categoria |

### Produtos (`/product`)

| Método | Rota | Descrição |
| --- | --- | --- |
| `POST` | `/product/` | Cria produto |
| `GET` | `/product/` | Lista produtos |
| `GET` | `/product/:id` | Busca produto |
| `PUT` | `/product/:id` | Atualiza produto |
| `DELETE` | `/product/:id` | Remove produto |

### Pedidos (`/order`)

| Método | Rota | Descrição |
| --- | --- | --- |
| `POST` | `/order/` | Cria pedido |
| `GET` | `/order/` | Lista pedidos |
| `GET` | `/order/:id` | Busca pedido |

### Endereços (`/user-address`)

| Método | Rota | Descrição |
| --- | --- | --- |
| `POST` | `/user-address/` | Cria endereço |
| `GET` | `/user-address/` | Lista endereços |
| `GET` | `/user-address/:id` | Busca endereço |

## Como adicionar um novo recurso

1. Modele tipos em `src/domain/<recurso>/`
2. Crie o port em `src/application/ports/outbound/`
3. Implemente o use case em `src/application/use-cases/<recurso>/`
4. Implemente o adapter em `src/infrastructure/persistence/` (ou outro adapter)
5. Exponha via HTTP em `src/http/{schemas,controllers,routes}/`
6. Conecte no composition root `src/infrastructure/di/container.ts`
7. Registre a rota em `src/server.ts`

## Estado atual

Projeto em evolução. Próximos passos sugeridos:

- Migrations e seeds
- Autenticação protegendos as rotas (`http/middlewares`)
- Error handler central (DomainError → HTTP status)
- Testes de domínio e use cases
- Build e scripts de produção
- Swagger UI

## Licença

ISC
