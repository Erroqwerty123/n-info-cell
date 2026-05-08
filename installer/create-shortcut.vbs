' Create Desktop Shortcut
' ===========================

Set objShell = CreateObject("WScript.Shell")
strDesktop = objShell.SpecialFolders("Desktop")

Set objLink = objShell.CreateShortcut(strDesktop & "\N-INFO-CELL.lnk")
objLink.TargetPath = """" & WScript.Arguments(0) & "\start.bat"""
objLink.WorkingDirectory = WScript.Arguments(0)
objLink.Description = "N-INFO-CELL - Sistema de Compra e Venda de Celulares"
objLink.WindowStyle = 1
objLink.Save

MsgBox "Atalho criado com sucesso!", vbInformation, "N-INFO-CELL"
