;N-INFO-CELL Installer Script (NSIS)
;===============================================

!include "MUI2.nsh"
!include "x64.nsh"
!include "nsDialogs.nsh"
!include "LogicLib.nsh"

; Define variables
!define PRODUCT_NAME "N-INFO-CELL"
!define PRODUCT_VERSION "1.0.0"
!define PRODUCT_PUBLISHER "N-INFO-CELL"
!define PRODUCT_WEB_SITE "https://github.com/Erroqwerty123/n-info-cell"
!define PRODUCT_DIR_REGKEY "Software\\Microsoft\\Windows\\CurrentVersion\\App Paths\\${PRODUCT_NAME}.exe"
!define PRODUCT_UNINST_KEY "Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\${PRODUCT_NAME}"
!define PRODUCT_UNINST_ROOT_KEY "HKLM"
!define INSTALL_DIR "$PROGRAMFILES\\N-INFO-CELL"

SetCompressor lzma
SetDatablockOptimize on

; MUI Settings
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH

!insertmacro MUI_LANGUAGE "Portuguese"

Name "${PRODUCT_NAME} ${PRODUCT_VERSION}"
OutFile "..\\dist\\N-INFO-CELL-Setup-v1.0.0.exe"
InstallDir "${INSTALL_DIR}"
ShowInstDetails show
ShowUnInstDetails show

Section "Instalar N-INFO-CELL"
  SetOutPath "$INSTDIR"
  SetOverwrite try
  
  ; Copy all files
  File /r "..\\..\\backend\\*.*"
  File /r "..\\..\\frontend\\*.*"
  File /r "..\\..\\database\\*.*"
  File /r "..\\..\\docs\\*.*"
  
  ; Create shortcuts
  CreateDirectory "$SMPROGRAMS\\${PRODUCT_NAME}"
  CreateShortCut "$SMPROGRAMS\\${PRODUCT_NAME}\\N-INFO-CELL.lnk" "$INSTDIR\\start.bat"
  CreateShortCut "$SMPROGRAMS\\${PRODUCT_NAME}\\Uninstall.lnk" "$INSTDIR\\uninstall.exe"
  CreateShortCut "$DESKTOP\\N-INFO-CELL.lnk" "$INSTDIR\\start.bat"
  
  ; Run setup script
  ExecWait '"$INSTDIR\\setup.bat"'
SectionEnd

Section "Uninstall"
  Delete "$INSTDIR\\*.*"
  RMDir /r "$INSTDIR"
  Delete "$SMPROGRAMS\\${PRODUCT_NAME}\\*.*"
  RMDir "$SMPROGRAMS\\${PRODUCT_NAME}"
  Delete "$DESKTOP\\N-INFO-CELL.lnk"
  
  DeleteRegKey ${PRODUCT_UNINST_ROOT_KEY} "${PRODUCT_UNINST_KEY}"
  DeleteRegKey HKLM "${PRODUCT_DIR_REGKEY}"
SectionEnd
