@echo off
cd /d "%~dp0\.."
echo === npm install ===
call npm install
echo === Brave s'ouvre dans 20 s sur l'editeur de pages ===
start "" powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep 20; Start-Process 'C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe' 'http://localhost:3000/admin/pages'"
echo === npm run dev ===
npm run dev
