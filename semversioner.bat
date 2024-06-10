@echo off
cls

chcp 65001

Title wmic command which can return the local date/time in a locale-independent manner
@for /f "skip=1" %%x in ('wmic os get localdatetime') do if not defined today set today=%%x

set "types=major minor patch"

:Chose

echo Given a version number MAJOR.MINOR.PATCH, increment the:
echo - major version when you make incompatible API changes
echo - minor version when you add functionality in a backward compatible manner
echo - patch version when you make backward compatible bug fixes

set /p "type=Enter type: "

for %%i in (%types%) do if /i "%%i" == "%type%" goto :SupportedType
echo %type% is not supported
echo:
goto :Chose
:SupportedType

echo Provide a description of the change

set /p "description=Enter description: "

echo %type%-%today:~0,14%.json

if not exist .semversioner\next-release\ (
  mkdir .semversioner\next-release
)

echo {"type": "%type%","description": "%description%"} > .semversioner/next-release/%type%-%today:~0,14%.json

set /p DUMMY=Hit ENTER to continue...