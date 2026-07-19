@echo off
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-25.0.3.9-hotspot
set PATH=C:\tools\maven\apache-maven-3.9.6\bin;%PATH%
cd /d "%~dp0backend"
echo Starting backend server on port 8080...
mvn spring-boot:run
pause
