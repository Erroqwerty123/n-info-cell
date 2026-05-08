# 🔨 Guia de Build do Instalador N-INFO-CELL

## Pré-requisitos para Construir o Instalador

### 1. **NSIS (Nullsoft Scriptable Install System)**
- Download: https://nsis.sourceforge.io/download/
- Versão recomendada: 3.09 ou superior
- Instale com as configurações padrão

### 2. **Node.js e npm**
- Já deve estar instalado

### 3. **Git**
- Para clonar o repositório

---

## 🔧 Processo de Build

### Passo 1: Prepare o Repositório

```powershell
git clone https://github.com/Erroqwerty123/n-info-cell.git
cd n-info-cell
```

### Passo 2: Instale Dependências do Backend

```powershell
cd backend
npm install
cd ..
```

### Passo 3: Instale Dependências do Frontend

```powershell
cd frontend
npm install
cd ..
```

### Passo 4: Execute o Script de Build

Abra PowerShell como **Administrador** e execute:

```powershell
cd installer
.\build-installer.bat
```

### Passo 5: Arquivo de Saída

O instalador será criado em:
```
installer\dist\N-INFO-CELL-Setup-v1.0.0.exe
```

---

## 📦 Estrutura do Instalador

O arquivo `.exe` contém:

```
N-INFO-CELL-Setup-v1.0.0.exe
├── Backend (Node.js + Express)
├── Frontend (React Native + Expo)
├── Database (Scripts SQL)
├── Documentação
└── Scripts de inicialização
```

---

## 🐛 Troubleshooting

### Erro: "NSIS não encontrado"

**Solução:**
1. Instale NSIS: https://nsis.sourceforge.io/download/
2. Coloque no caminho padrão: `C:\Program Files\NSIS\`
3. Ou edite `build-installer.bat` com o caminho correto

### Erro: "Acesso negado"

**Solução:**
1. Execute PowerShell como Administrador
2. Ou execute `cmd` como Administrador
3. Feche antivírus temporariamente

### Arquivo exe muito grande

**Solução normal:** ~400-500MB (inclui todas as dependências)

**Para reduzir:**
1. Remova pasta `node_modules` antes do build
2. Crie script que instala npm durante instalação

---

## 🚀 Distribuir o Instalador

### Opção 1: GitHub Releases

```powershell
# Upload arquivo .exe para:
# https://github.com/Erroqwerty123/n-info-cell/releases
```

### Opção 2: Google Drive / OneDrive

1. Faça upload do arquivo
2. Compartilhe o link
3. Usuários fazem download e executam

### Opção 3: Servidor Web

1. Hospede em seu servidor
2. Crie link de download
3. Compartilhe URL

---

## 📋 Checklist de Build

- [ ] NSIS instalado
- [ ] Backend e Frontend compilados
- [ ] Scripts de setup testados
- [ ] Versão atualizada em setup.nsi
- [ ] Pasta `dist` criada
- [ ] Build executado sem erros
- [ ] Arquivo .exe gerado
- [ ] .exe testado em máquina limpa
- [ ] Hash verificado
- [ ] Documentação atualizada

---

## 🔐 Segurança

### Assine o Instalador (Opcional)

Para adicionar certificado digital:

```powershell
# Usar ferramenta de signing
signtool sign /f certificate.pfx /p password /t http://timestamp.server /d "N-INFO-CELL" dist\N-INFO-CELL-Setup-v1.0.0.exe
```

---

## 📝 Próximas Versões

Para atualizar instalador:

1. Edite versão em `setup.nsi`:
   ```
   !define PRODUCT_VERSION "1.0.1"
   ```

2. Atualize saída:
   ```
   OutFile "..\\dist\\N-INFO-CELL-Setup-v1.0.1.exe"
   ```

3. Execute build novamente

---

**Pronto para fazer build do seu instalador! 🎉**
