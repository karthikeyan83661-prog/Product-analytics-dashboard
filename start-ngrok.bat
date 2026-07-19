@echo off
chcp 65001 >nul
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-25.0.3.9-hotspot
set PATH=C:\tools\ngrok;%PATH%

echo ============================================
echo   Starting Dashboard + ngrok tunnel
echo ============================================
echo.

:: Start dashboard
echo [1/2] Starting dashboard on port 8080...
start "Dashboard" cmd /c "java -jar "%~dp0backend\target\product-dashboard-1.0.0.jar""

timeout /t 8 /nobreak >nul

:: Start ngrok
echo [2/2] Starting ngrok public tunnel...
start "ngrok" cmd /c "ngrok http 8080"

echo.
echo ============================================
echo   Dashboard is starting up...
echo   ngrok web interface: http://localhost:4040
echo.
echo   Open http://localhost:4040 to get the
echo   public URL to share with anyone.
echo ============================================
echo.
pause
