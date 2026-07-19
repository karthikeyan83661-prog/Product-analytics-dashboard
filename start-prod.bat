@echo off
chcp 65001 >nul
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-25.0.3.9-hotspot
echo Starting Product Analytics Dashboard...
echo.
echo Open http://localhost:8080 in your browser
echo.
java -jar "%~dp0backend\target\product-dashboard-1.0.0.jar"
pause
