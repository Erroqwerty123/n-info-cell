@echo off
REM N-INFO-CELL Startup Script
REM ======================================

cd /d "%~dp0"

echo.
echo ================================
echo N-INFO-CELL - Iniciando Sistema
echo ================================
echo.

REM Start Backend in new window
echo [*] Iniciando Backend...
start "N-INFO-CELL Backend" cmd /k "cd backend && npm run dev"

REM Wait for backend to start
timeout /t 3 /nobreak

REM Start Frontend in new window
echo [*] Iniciando Frontend...
start "N-INFO-CELL Frontend" cmd /k "cd frontend && npm start"

echo.
echo [OK] Sistema iniciado!
echo [*] Backend: http://localhost:3000
echo [*] Frontend: http://localhost:3000 (web)
echo.
echo Feche estas janelas para parar o sistema.
echo.
pause
