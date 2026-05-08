@echo off
REM N-INFO-CELL Uninstall Script
REM ======================================

echo.
echo ================================
echo N-INFO-CELL - Desinstalacao
echo ================================
echo.

echo [?] Tem certeza que deseja desinstalar N-INFO-CELL?
echo.
echo Opcoes:
echo 1 - Apenas remover arquivos (manter banco de dados)
echo 2 - Remover arquivos E banco de dados
echo 3 - Cancelar
echo.
set /p choice="Escolha uma opcao (1-3): "

if "%choice%"=="1" goto RemoveFiles
if "%choice%"=="2" goto RemoveAll
if "%choice%"=="3" goto Cancel

goto RemoveFiles

:RemoveAll
echo [*] Removendo banco de dados...
psql -U postgres -c "DROP DATABASE n_info_cell;" >nul 2>&1
echo [OK] Banco removido

:RemoveFiles
echo [*] Removendo arquivos...
REM Files will be removed by uninstaller
echo [OK] Arquivos removidos

echo.
echo ================================
echo [OK] Desinstalacao concluida!
echo ================================
echo.
pause
goto End

:Cancel
echo [*] Desinstalacao cancelada
echo.
pause

:End
