@echo off
set scriptDir=%~dp0
set fileName=%~n1

cd /D %scriptDir%

echo Starting...
node .\src\compileToPDF.js %1
echo Completed
pause