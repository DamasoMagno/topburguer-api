# Adonai API

API REST em desenvolvimento para gerenciamento de produtos, categorias, pedidos
e endereços de usuários.

O projeto utiliza uma arquitetura em camadas, separando o transporte HTTP, as
regras de negócio e a persistência de dados.

## Tecnologias

- Node.js e TypeScript
- Fastify
- PostgreSQL
- Drizzle ORM
- Redis
- AWS S3
- Zod
- JWT
- Swagger
- Docker Compose

## Arquitetura

O fluxo principal da aplicação é:

```text
Route -> Controller -> Service -> Repository -> PostgreSQL
                              -> Redis
                              -> AWS S3
```

Estrutura dos principais diretórios:

```text
src/
├── database/             # Conexão e schema do banco
├── http/
│   ├── controllers/      # Entrada HTTP e validação dos dados
│   └── middlewares/      # Middlewares HTTP
├── lib/                  # Clientes Redis e AWS S3
├── repository/           # Contratos de persistência
│   └── drizzle/          # Implementações com Drizzle ORM
├── routes/               # Registro das rotas Fastify
├── services/             # Regras de negócio
├── env.ts                # Validação das variáveis de ambiente
└── server.ts             # Inicialização da aplicação
```

## Pré-requisitos

- Node.js 20 ou superior
- npm
- PostgreSQL
- Redis
- Uma conta e um bucket no AWS S3
- Docker e Docker Compose, caso queira executar o PostgreSQL em container

## Configuração

Instale as dependências:

```bash
npm ci
```

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL=postgresql://adonai:adonai@localhost:5432/adonai
REDIS_URL=redis://localhost:6379

JWT_SECRET=substitua-por-um-segredo-seguro

AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=sua-access-key
AWS_SECRET_ACCESS_KEY=sua-secret-key
AWS_BUCKET_NAME=nome-do-bucket
```

Não versione o arquivo `.env`.

## Banco de dados

O Docker Compose fornece um serviço PostgreSQL:

```bash
docker compose up -d db
```

As tabelas estão declaradas em `src/database/schema.ts`. O projeto ainda não
possui migrations ou um script para criar o schema automaticamente; antes de
iniciar a API, as tabelas devem existir no banco configurado em `DATABASE_URL`.

O Redis não está incluído no Docker Compose e deve estar disponível
separadamente no endereço definido em `REDIS_URL`.

## Executando

Inicie a aplicação em modo de desenvolvimento:

```bash
npm start
```

A API será disponibilizada em:

```text
http://localhost:3000
```

O script atual utiliza `tsx watch`, portanto reinicia a aplicação
automaticamente após alterações no código.

## Rotas disponíveis

### Categorias

| Método | Rota | Descrição |
| --- | --- | --- |
| `POST` | `/category/` | Cria uma categoria |
| `GET` | `/category/` | Lista as categorias |
| `GET` | `/category/:id` | Busca uma categoria |
| `PUT` | `/category/:id` | Atualiza uma categoria |
| `DELETE` | `/category/:id` | Remove uma categoria |

Exemplo de corpo para criação e atualização:

```json
{
  "name": "Camisetas"
}
```

### Produtos

| Método | Rota | Descrição |
| --- | --- | --- |
| `POST` | `/product/` | Cria um produto |
| `GET` | `/product/` | Lista os produtos |
| `GET` | `/product/:id` | Busca um produto |
| `PUT` | `/product/:id` | Atualiza um produto |
| `DELETE` | `/product/:id` | Remove um produto |

Exemplo de corpo para criação e atualização:

```json
{
  "name": "Camiseta básica",
  "description": "Camiseta de algodão",
  "price": 59.9
}
```

## Funcionalidades em desenvolvimento

O schema e os repositórios também possuem estruturas para:

- Pedidos e itens de pedidos
- Endereços de usuários
- Upload de imagens no AWS S3
- Cache de produtos no Redis

Essas funcionalidades ainda não possuem todas as rotas HTTP registradas.

## Estado atual

Este projeto está em desenvolvimento e ainda não deve ser considerado pronto
para produção. Entre os próximos passos estão:

- Adicionar migrations e seeds
- Conectar o cliente Redis durante a inicialização
- Implementar autenticação e proteger as rotas
- Adicionar tratamento centralizado de erros
- Adicionar testes automatizados
- Criar scripts de build e execução para produção
- Documentar e publicar a interface Swagger

## Licença

ISC
