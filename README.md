# N - INFO CELL

## Sistema Híbrido de Compra e Venda de Celulares

Sistema completo para gerenciar compra e venda de celulares com suporte para dispositivos móveis e Windows.

### Características Principais

✅ **Plataforma Híbrida**: Funciona em iOS, Android, Windows e Web
✅ **Sistema de Autenticação**: Login seguro de usuários
✅ **Catálogo de Produtos**: Listagem e busca de celulares
✅ **Carrinho de Compras**: Gerenciar itens para compra
✅ **Termos de Responsabilidade**: Acordos legais para comprador e vendedor
✅ **Termos de Garantia**: Políticas de garantia personalizáveis
✅ **Impressão**: Suporte para A4 e 80mm (Térmica)
✅ **Dashboard Admin**: Painel administrativo completo
✅ **Sistema de Avaliações**: Ratings de produtos e vendedores
✅ **Relatórios**: Vendas e estatísticas

### Estrutura do Projeto

```
n-info-cell/
├── frontend/                 # App Mobile e Web (React Native + Expo)
├── backend/                  # API (Node.js + Express)
├── database/                 # Scripts SQL
├── docs/                     # Documentação
└── README.md
```

### Tech Stack

- **Frontend**: React Native + Expo
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Impressão**: React Native Print
- **Auth**: JWT
- **API**: RESTful

### Instalação Rápida

```bash
# Backend
cd backend
npm install
cp .env.example .env
npm run dev

# Frontend (em outro terminal)
cd frontend
npm install
npm start
```

### Documentação

- [Setup Completo](docs/SETUP.md)
- [API Endpoints](docs/SETUP.md#api-endpoints)
- [Estrutura do Banco](database/init.sql)

### Licença

MIT License