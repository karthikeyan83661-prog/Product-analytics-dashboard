@echo off
set PATH=C:\tools\node\node-v22.14.0-win-x64;%PATH%
cd /d "%~dp0frontend"
echo Starting frontend dev server on port 5173...
npm run dev
pause
