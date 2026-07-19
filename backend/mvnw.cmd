@echo off
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-25.0.3.9-hotspot"
set "MAVEN_HOME=C:\tools\maven\apache-maven-3.9.6"
"%MAVEN_HOME%\bin\mvn.cmd" %*
