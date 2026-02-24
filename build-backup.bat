@echo off
setlocal
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\build-and-backup-apk.ps1" -Build both
endlocal
