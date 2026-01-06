# Biblioteca Nest Next

Projeto fullstack completo que integra um **backend em NestJS** com um **frontend em Next.js**, utilizando uma arquitetura moderna, CI/CD com GitHub Actions e notificações automáticas em múltiplos canais.

## 📋 Descrição

Este repositório contém uma aplicação exemplo/demostração de como estruturar e integrar:

- **Backend**: API RESTful construída com **NestJS** (TypeScript)
- **Frontend**: Aplicação web moderna com **Next.js** (App Router, React Server Components, TypeScript)

O foco do projeto é servir como base de estudo para praticas de devops como configurações de CI/CD, testes, lint, notificações e boas práticas.

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
