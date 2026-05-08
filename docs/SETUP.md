# Guia de Setup - N-INFO-CELL

## Pré-requisitos

- Node.js v16+ e npm
- PostgreSQL 12+
- Git
- Android Studio ou Xcode (para desenvolvimento mobile)
- Expo CLI: `npm install -g expo-cli`

## Backend Setup

### 1. Instalar dependências

```bash
cd backend
npm install
```

### 2. Configurar banco de dados

```bash
psql -U postgres
\i ../database/init.sql
```

### 3. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Edite `.env` com suas configurações.

### 4. Iniciar o servidor

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

## Frontend Setup

### 1. Instalar dependências

```bash
cd frontend
npm install
```

### 2. Iniciar o app

```bash
npm start
```

### 3. Executar em diferentes plataformas

**Android:**
```bash
npm run android
```

**iOS:**
```bash
npm run ios
```

**Web:**
```bash
npm run web
```

## API Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Fazer login

### Produtos
- `GET /api/products` - Listar produtos
- `GET /api/products/:id` - Detalhes do produto
- `POST /api/products` - Criar novo produto

### Pedidos
- `POST /api/orders` - Criar pedido
- `GET /api/orders/user/:userId` - Listar pedidos
- `PUT /api/orders/:id` - Atualizar status

### Termos
- `GET /api/terms/responsibility` - Termo de responsabilidade
- `GET /api/terms/warranty` - Termos de garantia

### Impressão
- `POST /api/print/receipt-a4` - Recibo A4
- `POST /api/print/receipt-80mm` - Recibo 80mm