@echo off
REM Verify N-INFO-CELL Installation
REM ======================================

echo.
echo ================================
echo N-INFO-CELL - Verificacao
echo ================================
echo.

setlocal enabledelayedexpansion
set all_ok=1

echo [*] Verificando componentes...
echo.

REM Check Node.js
echo Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERRO] Node.js nao encontrado
    set all_ok=0
) else (
    for /f "tokens=*" %%i in ('node --version') do echo [OK] Node.js %%i
)

REM Check npm
echo Verificando npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERRO] npm nao encontrado
    set all_ok=0
) else (
    for /f "tokens=*" %%i in ('npm --version') do echo [OK] npm %%i
)

REM Check PostgreSQL
echo Verificando PostgreSQL...
psql --version >nul 2>&1
if errorlevel 1 (
    echo [ERRO] PostgreSQL nao encontrado
    set all_ok=0
) else (
    for /f "tokens=*" %%i in ('psql --version') do echo [OK] %%i
)

REM Check backend folder
echo.
echo Verificando estrutura...
if exist "backend" (
    echo [OK] Pasta backend existe
) else (
    echo [ERRO] Pasta backend nao encontrada
    set all_ok=0
)

if exist "frontend" (
    echo [OK] Pasta frontend existe
) else (
    echo [ERRO] Pasta frontend nao encontrada
    set all_ok=0
)

if exist "database" (
    echo [OK] Pasta database existe
) else (
    echo [ERRO] Pasta database nao encontrada
    set all_ok=0
)

echo.

if !all_ok! equ 0 (
    echo ================================
    echo [ERRO] Verificacao falhou!
    echo ================================
    echo.
    echo Componentes faltando. Verifique:
    echo - Node.js instalado?
    echo - PostgreSQL instalado?
    echo - Pastas do projeto existem?
    echo.
) else (
    echo ================================
    echo [OK] Todos os componentes OK!
    echo ================================
    echo.
    echo Sistema pronto para usar.
    echo.
)

pause
