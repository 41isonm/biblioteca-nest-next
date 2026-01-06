# 📚 Biblioteca Nest Next - Sistema de Gerenciamento de Biblioteca

Projeto fullstack completo para gerenciamento de biblioteca, integrando **backend em NestJS** com **frontend em Next.js**, seguindo princípios SOLID e boas práticas de desenvolvimento.



#### **Funcionalidades:**
1. **Sistema completo de empréstimos** com relações Many-to-One
2. **Validações de negócio** para evitar livros duplicados emprestados
3. **Status dinâmico** (ativo/devolvido/atrasado)
4. **Swagger atualizado** com documentação completa da API
5. **Tratamento de erros** robusto com mensagens amigáveis

#### **Endpoints principal Implementados:**
- `POST /emprestimos` - Criar novo empréstimo
- `GET /emprestimos` - Listar todos os empréstimos
- `GET /emprestimos/ativos` - Empréstimos em andamento
- `GET /emprestimos/atrasados` - Empréstimos com devolução atrasada
- `GET /emprestimos/estatisticas` - Métricas do sistema
- `PATCH /emprestimos/:id/devolver` - Registrar devolução
- Filtros por usuário e livro

  ## para observar os demais endpoint acesse http://localhost:3000/ap

## 📋 **Descrição do Sistema**

Sistema completo de gerenciamento de biblioteca com três entidades principais:

### **🏷️ Entidades do Sistema:**
1. **Usuários** - Cadastro de membros da biblioteca
2. **Livros** - Catálogo completo de obras disponíveis
3. **Empréstimos** - Controle de empréstimos e devoluções

### **🔗 Relacionamentos:**
- **Usuário** → (1:N) → **Empréstimos**
- **Livro** → (1:N) → **Empréstimos**
- Cada empréstimo pertence a um usuário e um livro

## 🛠️ **Tecnologias Utilizadas**

### **Backend (NestJS)**
- **NestJS 10+** - Framework progressivo Node.js
- **TypeScript** - Tipagem estática
- **TypeORM** - ORM para PostgreSQL
- **Swagger/OpenAPI** - Documentação interativa da API
- **PostgreSQL** - Banco de dados relacional
- **Docker** - Containerização
- **Prometheus** - Métricas e monitoramento

### **Frontend (Next.js) - A DESENVOLVER**
- **Next.js 14+** - App Router
- **React 18+** - Server Components
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária

### **DevOps & Ferramentas**
- **GitHub Actions** - CI/CD automatizado
- **Docker Compose** - Orquestração de containers
- **ESLint + Prettier** - Padronização de código
- **Prometheus** - Coleta de métricas
- **Grafana** - Dashboard de monitoramento
  
## 🏗️ **Arquitetura do Sistema**


## 🚀 Tecnologias Utilizadas

### Backend (NestJS)
- NestJS (framework progressivo Node.js)
- TypeScript
- Swagger (OpenAPI) para documentação da API
- Jest + Supertest para testes
- ESLint + Prettier
- Class Validator & Class Transformer

### Frontend (Next.js)
- Next.js 14+ (App Router)
- React 18 + Server Components
- TypeScript
- Tailwind CSS (ou outra lib de estilização – ajustar conforme seu projeto)
- Axios ou Fetch para consumo da API
- ESLint + Prettier

### Infra & DevOps
- GitHub Actions para CI/CD
- Docker (opcional para containerização)
- Notificações automáticas:
  - Slack (via Incoming Webhook)
  - Telegram
  - Criação automática de Issue no GitHub em caso de falha


## ⚙️ Como Rodar Localmente

### Pré-requisitos
- Node.js ≥ 18
- npm ou yarn ou pnpm
- Docker (opcional)

### Backend
```bash
cd backend
npm install
npm run start:dev
