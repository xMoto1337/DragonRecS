@echo off
color 0B
title Dragon Recreation Services

:menu
cls
echo.
echo  ==========================================
echo   DRAGON RECREATION SERVICES - Dev Tools
echo  ==========================================
echo.
echo   [1] Start Dev Server (localhost:3000)
echo   [2] Build for Production
echo   [3] Type Check
echo   [4] Open in Browser
echo   [5] Push to GitHub
echo   [6] Exit
echo.
set /p choice=  Choose an option:

if "%choice%"=="1" goto dev
if "%choice%"=="2" goto build
if "%choice%"=="3" goto typecheck
if "%choice%"=="4" goto browser
if "%choice%"=="5" goto push
if "%choice%"=="6" exit
goto menu

:dev
cls
echo  Starting dev server at http://localhost:3000 ...
echo  Press Ctrl+C to stop.
echo.
start "" http://localhost:3000
npm run dev
pause
goto menu

:build
cls
echo  Building for production...
echo.
npm run build
echo.
pause
goto menu

:typecheck
cls
echo  Running TypeScript check...
echo.
npx tsc --noEmit
echo.
pause
goto menu

:browser
start "" http://localhost:3000
goto menu

:push
cls
echo  Pushing to GitHub...
echo.
set /p msg=  Commit message (or press Enter for "Update site"):
if "%msg%"=="" set msg=Update site
git add .
git commit -m "%msg%"
git push
echo.
echo  Done!
pause
goto menu
