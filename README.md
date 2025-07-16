# TypeORM Learning Project - CRUD de Cidades

Projeto desenvolvido para aprendizado e experimentação com **TypeORM em aplicações NestJS**. Este repositório serve como base de referência para implementações futuras do TypeORM em outros projetos.

## Sobre o Projeto

Este projeto implementa um CRUD básico completo para gerenciamento de cidades, utilizando as principais funcionalidades do TypeORM integrado ao NestJS. Foi desenvolvido seguindo um tutorial do YouTube e posteriormente será adaptado para servir como template de referência "limpo".

## Tecnologias Utilizadas

- **NestJS** - Framework Node.js para construção de aplicações server-side
- **TypeORM** - ORM para TypeScript e JavaScript
- **PostgreSQL** - Banco de dados relacional
- **Docker** - Containerização do banco de dados
- **TypeScript** - Linguagem de programação

## Estrutura do Projeto

O projeto segue a arquitetura padrão do NestJS com módulos organizados por feature:

```
src/
├── cities/
│   ├── dto/
│   ├── entities/
│   ├── cities.controller.ts
│   ├── cities.service.ts
│   └── cities.module.ts
├── app.module.ts
└── main.ts
```

## Funcionalidades Implementadas

### CRUD de Cidades
- **GET /cities** - Listar todas as cidades
- **GET /cities/:id** - Buscar cidade por ID
- **POST /cities** - Criar nova cidade
- **PUT /cities/:id** - Atualizar cidade existente
- **DELETE /cities/:id** - Remover cidade

### Conceitos TypeORM Demonstrados

- Configuração de conexão com banco de dados
- Definição de entidades e relacionamentos
- Repositórios e custom repositories
- Migrations e sincronização automática
- Validações e DTOs

## Configuração e Execução

### Pré-requisitos

- Node.js (versão 20 ou superior)
- Docker e Docker Compose
- npm ou yarn

### Passos para Execução

1. **Clone o repositório:**
```bash
git clone https://github.com/s0lturn3/typeorm-learning-project.git
cd typeorm-learning-project
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure o banco de dados:**
```bash
# Suba o container PostgreSQL
docker-compose up -d

# O banco estará disponível em:
# Host: localhost
# Port: 5432
# Database: pgcruddb
# Username: dev
# Password: secret
```

4. **Inicie a aplicação:**
```bash
# Modo desenvolvimento
npm run start:dev

# Modo produção
npm run start:prod
```

A aplicação estará disponível em `http://localhost:3000`

## Configuração do Banco de Dados

### Docker Compose

O arquivo `docker-compose.yml` está configurado para subir uma instância PostgreSQL com as seguintes configurações:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: postgres-crud-dev
    environment:
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: pgcruddb
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=dev
DB_PASSWORD=secret
DB_NAME=pgcruddb
```

## Exemplos de Uso

### Criar uma nova cidade
```bash
curl -X POST http://localhost:3000/cities \
  -H "Content-Type: application/json" \
  -d '{
    "name": "São Paulo",
    "state": "SP",
    "population": 12000000
  }'
```

### Listar todas as cidades
```bash
curl http://localhost:3000/cities
```

### Buscar cidade por ID
```bash
curl http://localhost:3000/cities/1
```

## Estrutura de Dados

### Entidade City

```typescript
@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 2 })
  state: string;

  @Column({ nullable: true })
  population: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

## Aprendizados e Conceitos Aplicados

### TypeORM
- Configuração e integração com NestJS
- Definição de entidades e decorators
- Repository pattern e custom repositories

### NestJS
- Arquitetura modular
- Dependency Injection
- Controllers e Services
- DTOs e validação

### Banco de Dados
- Containerização com Docker
- Configuração PostgreSQL
- Gestão de conexões

## Próximos Passos

Este projeto pode ser expandido com:

- Implementação de relacionamentos (Estados, Países)
- Autenticação e autorização
- Paginação e filtros avançados
- Testes unitários e de integração
- Logging e monitoramento
- Validações mais robustas

## Comandos Úteis

```bash
# Gerar nova migration
npm run migration:generate -- -n NomeDaMigration

# Executar migrations
npm run migration:run

# Reverter migration
npm run migration:revert

# Sincronizar schema (apenas desenvolvimento)
npm run schema:sync
```

## Referências

- [Documentação TypeORM](https://typeorm.io/)
- [Documentação NestJS](https://docs.nestjs.com/)
- [Tutorial YouTube utilizado como base](link-do-tutorial)

## Contribuição

Este é um projeto de aprendizado pessoal, mas sugestões e melhorias são bem-vindas através de issues e pull requests.

---

**Nota:** Este projeto foi desenvolvido para fins educacionais e serve como referência para implementações futuras do TypeORM em projetos NestJS.
