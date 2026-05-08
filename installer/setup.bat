@echo off
REM N-INFO-CELL Setup Script
REM ======================================

setlocal enabledelayedexpansion

echo.
echo ================================
echo N-INFO-CELL - Instalacao
echo ================================
echo.

REM Check Node.js
echo [*] Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo [!] Node.js nao encontrado!
    echo [*] Baixe em: https://nodejs.org/
    pause
    exit /b 1
)
echo [OK] Node.js instalado

REM Check PostgreSQL
echo.
echo [*] Verificando PostgreSQL...
psql --version >nul 2>&1
if errorlevel 1 (
    echo [!] PostgreSQL nao encontrado!
    echo [*] Baixe em: https://www.postgresql.org/download/windows/
    pause
    exit /b 1
)
echo [OK] PostgreSQL instalado

REM Create database
echo.
echo [*] Criando banco de dados...
psql -U postgres -c "CREATE DATABASE n_info_cell;" >nul 2>&1
if errorlevel 1 (
    echo [!] Erro ao criar banco
    pause
    exit /b 1
)
echo [OK] Banco criado

REM Import schema
echo.
echo [*] Importando schema...
psql -U postgres -d n_info_cell -f "database\init.sql" >nul 2>&1
if errorlevel 1 (
    echo [!] Erro ao importar schema
    pause
    exit /b 1
)
echo [OK] Schema importado

REM Install backend
echo.
echo [*] Instalando Backend...
cd backend
call npm install >nul 2>&1
if errorlevel 1 (
    echo [!] Erro ao instalar dependencias backend
    pause
    exit /b 1
)
echo [OK] Backend instalado

REM Setup .env
echo.
echo [*] Configurando .env...
if not exist ".env" (
    copy .env.example .env >nul
)
echo [OK] .env configurado

REM Install frontend
echo.
echo [*] Instalando Frontend...
cd ..
cd frontend
call npm install >nul 2>&1
if errorlevel 1 (
    echo [!] Erro ao instalar dependencias frontend
    pause
    exit /b 1
)
echo [OK] Frontend instalado

cd ..

echo.
echo ================================
echo [OK] Instalacao concluida!
echo ================================
echo.
echo Para iniciar o sistema:
echo.
echo 1. Execute: npm run dev (na pasta backend)
echo 2. Execute: npm start (na pasta frontend)
echo.
echo Abra o navegador em: http://localhost:3000
echo.
pause
