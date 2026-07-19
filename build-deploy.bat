@echo off
chcp 65001 >nul
echo ============================================
echo   Building Product Analytics Dashboard
echo ============================================
echo.

echo [1/3] Building frontend (React + Vite)...
set PATH=C:\tools\node\node-v22.14.0-win-x64;%PATH%
cd /d "%~dp0frontend"
call npm run build
if %errorlevel% neq 0 ( echo Frontend build failed! & pause & exit /b 1 )

echo.
echo [2/3] Copying frontend to backend static...
if exist "%~dp0backend\src\main\resources\static" rmdir /s /q "%~dp0backend\src\main\resources\static"
xcopy /e /i /q "%~dp0frontend\dist" "%~dp0backend\src\main\resources\static" >nul

echo.
echo [3/3] Building backend JAR (Spring Boot)...
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-25.0.3.9-hotspot
set PATH=C:\tools\maven\apache-maven-3.9.6\bin;%PATH%
cd /d "%~dp0backend"
call mvn clean package -DskipTests -q
if %errorlevel% neq 0 ( echo Backend build failed! & pause & exit /b 1 )

echo.
echo ============================================
echo   Build complete!
echo.
echo   JAR: backend\target\product-dashboard-1.0.0.jar
echo.
echo   Run with: java -jar "backend\target\product-dashboard-1.0.0.jar"
echo   Open at:  http://localhost:8080
echo ============================================
echo.
pause
