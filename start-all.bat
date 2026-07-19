@echo off
echo ============================================
echo   Product Analytics Dashboard - Starting...
echo ============================================
echo.

echo Starting Backend (Spring Boot + MongoDB)...
start "Backend" cmd /c "set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-25.0.3.9-hotspot && set PATH=C:\tools\maven\apache-maven-3.9.6\bin;%%PATH%% && cd /d "%~dp0backend" && mvn spring-boot:run"

echo Waiting 15 seconds for backend to initialize...
timeout /t 15 /nobreak >nul

echo Starting Frontend (React + Vite)...
start "Frontend" cmd /c "set PATH=C:\tools\node\node-v22.14.0-win-x64;%%PATH%% && cd /d "%~dp0frontend" && npm run dev"

echo.
echo ============================================
echo   Backend:  http://localhost:8080
echo   Frontend: http://localhost:5173
echo ============================================
echo.
pause
