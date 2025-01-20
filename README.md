
# Sistema de Biblioteca

<p align="center">
  <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" />
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" />
</p>

## 📚 Sobre o Projeto

Sistema de gerenciamento de biblioteca desenvolvido com Angular no frontend e NestJS no backend. O projeto permite gerenciar autores e livros, além de contar com um chat em tempo real para interação entre usuários.

### 🌟 Funcionalidades Principais

- Gerenciamento completo de autores (CRUD)
- Gerenciamento completo de livros (CRUD)
- Visualização de livros por autor
- Chat em tempo real entre usuários
- Interface responsiva e moderna
- Interceptação de erros global

## 🛠️ Tecnologias Utilizadas

### Frontend
- Angular 18.1
- TypeScript
- RxJS
- Socket.io-client
- Font Awesome (para ícones)

### Backend
- NestJS
- TypeORM
- SQLite
- Socket.io
- Playwright (para automação RPA)

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Backend

1. Entre na pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run start:dev
```

O servidor estará rodando em `http://localhost:3000`

### Frontend

1. Entre na pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm start
```

A aplicação estará disponível em `http://localhost:4200`

## 📁 Estrutura do Projeto

### Frontend

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── models/
│   │   ├── services/
│   │   ├── interceptors/
│   │   └── app.module.ts
│   ├── assets/
│   └── styles.css
```

### Backend

```
backend/
├── src/
│   ├── controllers/
│   ├── entities/
│   ├── modules/
│   ├── services/
│   ├── gateway/
│   └── utils/
```

## 🔄 API Endpoints

### Autores
- `GET /authors` - Lista todos os autores
- `GET /authors/:id` - Obtém um autor específico
- `GET /authors/:id/livros` - Lista livros de um autor
- `POST /authors` - Cria um novo autor
- `PUT /authors/:id` - Atualiza um autor
- `DELETE /authors/:id` - Remove um autor

### Livros
- `GET /books` - Lista todos os livros
- `GET /books/:id` - Obtém um livro específico
- `POST /books` - Cria um novo livro
- `PUT /books/:id` - Atualiza um livro
- `DELETE /books/:id` - Remove um livro

## 💬 Chat em Tempo Real

O sistema inclui um chat em tempo real implementado com Socket.io, permitindo:
- Conexão de múltiplos usuários
- Mensagens em tempo real
- Notificações de entrada/saída de usuários
- Timestamps nas mensagens

## 🎨 Interface

A interface do usuário foi desenvolvida com foco em:
- Design responsivo
- Animações suaves
- Tema consistente
- Feedback visual para ações
- Ícones intuitivos

## 📹 Observação Final

Infelizmente, não foi possível editar o vídeo explicativo completo a tempo, mas planejo disponibilizá-lo futuramente para detalhar o funcionamento e as escolhas técnicas do projeto. Obrigado pela compreensão!

<p align="center"> <img src="https://img.icons8.com/emoji/96/crying-face.png" alt="Sad Icon" /> </p>
