# 🚀 Guia de Instalação do N-INFO-CELL para Windows

## 📋 Pré-requisitos

Antes de instalar o N-INFO-CELL, você precisa ter:

### 1. **Node.js (v16 ou superior)**
- Download: https://nodejs.org/
- Instale com as configurações padrão
- Verifique: Abra PowerShell e execute:
  ```powershell
  node --version
  npm --version
  ```

### 2. **PostgreSQL (v12 ou superior)**
- Download: https://www.postgresql.org/download/windows/
- Instale com as configurações padrão
- Anote a senha do usuário `postgres` (use durante instalação)
- Verifique: Abra PowerShell e execute:
  ```powershell
  psql --version
  ```

### 3. **Git (Opcional mas recomendado)**
- Download: https://git-scm.com/download/win
- Instale com as configurações padrão

---

## ✅ Instalação Expressa (Recomendado)

### Passo 1: Requisitos de Sistema
- [ ] Node.js instalado
- [ ] PostgreSQL instalado e rodando
- [ ] 2GB de espaço disponível
- [ ] Conexão com internet

### Passo 2: Execute o Instalador
1. Baixe: `N-INFO-CELL-Setup-v1.0.0.exe`
2. Clique 2 vezes para executar
3. Clique em **"Próximo"** (Next)
4. Clique em **"Instalar"** (Install)
5. Aguarde a instalação (2-5 minutos)
6. Clique em **"Finalizar"** (Finish)

### Passo 3: Inicie o Sistema

**Opção A - Pelo Atalho da Área de Trabalho:**
- Clique 2 vezes no ícone "N-INFO-CELL" na área de trabalho

**Opção B - Pelo Menu Iniciar:**
- Procure por "N-INFO-CELL" no menu Iniciar
- Clique em "N-INFO-CELL"

### Passo 4: Aguarde a Inicialização
- Duas janelas (terminal) se abrem:
  - Backend (porta 3000)
  - Frontend (selecione 'w' para Web)
- Aguarde ~30 segundos

### Passo 5: Acesse o Sistema
- Abra o navegador: http://localhost:3000
- Sistema pronto para uso! ✅

---

## 🔧 Instalação Manual (Avançado)

Se preferir instalar manualmente:

### 1. Clone o repositório
```powershell
git clone https://github.com/Erroqwerty123/n-info-cell.git
cd n-info-cell
```

### 2. Configure o banco de dados
```powershell
psql -U postgres
```

Dentre do psql:
```sql
CREATE DATABASE n_info_cell;
\c n_info_cell
\i database/init.sql
\q
```

### 3. Configure Backend
```powershell
cd backend
copy .env.example .env
# Edite .env se necessário
npm install
npm run dev
```

### 4. Configure Frontend (novo terminal)
```powershell
cd frontend
npm install
npm start
```

---

## 🧪 Testar a Instalação

### 1. Verificar Backend
```powershell
curl http://localhost:3000/health
```

Resposta esperada:
```json
{"status":"OK","timestamp":"2026-05-08T..."}
```

### 2. Acessar Frontend
- Abra: http://localhost:3000
- Você deverá ver a página inicial com "N - INFO CELL"

### 3. Testar Funcionalidades
- [ ] Página inicial carrega
- [ ] Busca de produtos funciona
- [ ] Clique em produto abre detalhes
- [ ] Checkout funciona
- [ ] Impressão funciona

---

## ⚙️ Configurações Avançadas

### Mudar Porta do Backend

Edite `backend/.env`:
```
PORT=3001
```

### Conectar de Outro Computador

Edite `frontend/src/api/client.js`:
```javascript
const API_URL = 'http://IP_DO_SEU_COMPUTADOR:3000/api';
```

### Banco de Dados Customizado

Edite `backend/.env`:
```
DB_HOST=seu_host
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
```

---

## 🐛 Troubleshooting

### Erro: "Node.js não é reconhecido"

**Solução:**
1. Reinicie o PowerShell/CMD
2. Ou reinicie o computador
3. Verifique se Node.js foi instalado corretamente

### Erro: "PostgreSQL connection refused"

**Solução:**
1. Verifique se PostgreSQL está rodando
   - Procure "Services" no Menu Iniciar
   - Procure "postgresql-x64"
   - Clique com botão direito > "Start"
2. Verifique credenciais em `backend/.env`
3. Tente com senha vazia em `.env`:
   ```
   DB_PASSWORD=
   ```

### Erro: "Porta 3000 já está em uso"

**Solução:**
1. Abra PowerShell como Admin
2. Execute:
   ```powershell
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```
3. Ou mude a porta em `backend/.env`

### Frontend não conecta ao Backend

**Solução:**
1. Verifique se Backend está rodando (porta 3000)
2. Verifique firewall do Windows
3. Tente desabilitar firewall temporariamente
4. Edite `frontend/.env`:
   ```
   EXPO_PUBLIC_API_URL=http://localhost:3000/api
   ```

### npm install lento

**Solução:**
1. Limpe cache:
   ```powershell
   npm cache clean --force
   ```
2. Reinstale:
   ```powershell
   rm -r node_modules package-lock.json
   npm install
   ```

---

## 🚀 Próximos Passos

1. **Adicione Produtos:**
   - Vá para Admin Panel
   - Crie novos produtos
   - Configure garantias

2. **Configure Termos:**
   - Edite termos de responsabilidade
   - Edite termos de garantia

3. **Personalize:**
   - Mude cores e logo
   - Configure termos legais
   - Adicione suas informações

4. **Backup:**
   - Faça backup do banco de dados regularmente
   - Backup de arquivos do sistema

---

## 📞 Suporte

- GitHub: https://github.com/Erroqwerty123/n-info-cell
- Issues: https://github.com/Erroqwerty123/n-info-cell/issues
- Email: Erroqwerty123@gmail.com

---

## 📝 Notas Importantes

- **Firewall:** Seu firewall pode bloquear as portas. Permita Node.js se solicitado.
- **Segurança:** Mude a senha de admin assim que possível
- **Backup:** Faça backup regularmente
- **Atualizações:** Verifique atualizações no GitHub

---

**Pronto para começar! Aproveite o N-INFO-CELL! 🎉**
