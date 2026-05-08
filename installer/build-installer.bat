@echo off
REM Build N-INFO-CELL Installer
REM ======================================

echo.
echo ================================
echo N-INFO-CELL - Build Installer
echo ================================
echo.

REM Check if NSIS is installed
echo [*] Verificando NSIS...
if not exist "C:\Program Files (x86)\NSIS\makensis.exe" (
    if not exist "C:\Program Files\NSIS\makensis.exe" (
        echo [!] NSIS nao encontrado!
        echo [*] Baixe em: https://nsis.sourceforge.io/
        pause
        exit /b 1
    )
    set NSIS_PATH=C:\Program Files\NSIS\makensis.exe
) else (
    set NSIS_PATH=C:\Program Files (x86)\NSIS\makensis.exe
)
echo [OK] NSIS encontrado

REM Create dist folder
if not exist "dist" mkdir dist

REM Build installer
echo.
echo [*] Compilando instalador...
"%NSIS_PATH%" /V4 setup.nsi

if errorlevel 1 (
    echo [!] Erro ao compilar
    pause
    exit /b 1
)

echo.
echo ================================
echo [OK] Instalador criado!
echo ================================
echo.
echo Arquivo: dist\N-INFO-CELL-Setup-v1.0.0.exe
echo.
pause
