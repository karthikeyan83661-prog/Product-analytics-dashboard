@echo off
setlocal enabledelayedexpansion

set "MVNW_REPOURL=https://repo.maven.apache.org/maven2"
set "MAVEN_HOME=%~dp0.mvn\wrapper"
set "MAVEN_OPTS=%MAVEN_OPTS% -Xmx512m"

"%MAVEN_HOME%\apache-maven-3.9.6-bin\bin\mvn.cmd" %*
endlocal
