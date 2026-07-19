@echo off
chcp 65001 >nul
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-25.0.3.9-hotspot

echo ============================================
echo   Product Analytics Dashboard - PUBLIC
echo ============================================
echo.

:: Get local IP
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /C:"IPv4"') do set "IP=%%a"
set "IP=%IP: =%"
echo   Local Network: http://%IP%:8080
echo   This machine:  http://localhost:8080
echo.
echo   Anyone on the same WiFi can open the URL above.
echo.
echo ============================================
echo.

java -jar "%~dp0backend\target\product-dashboard-1.0.0.jar"
pause
