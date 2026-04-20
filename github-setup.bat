@echo off
color 0B
title GitHub First-Time Setup

cls
echo.
echo  ==========================================
echo   GitHub First-Time Setup
echo  ==========================================
echo.
echo  This will configure git and push your code
echo  to https://github.com/xMoto1337/DragonRecS
echo.
pause

echo.
echo  Configuring git identity...
git config --global user.email "wesleybuderau@gmail.com"
git config --global user.name "Wesley"

echo  Staging all files...
git add .

echo  Creating initial commit...
git commit -m "Initial commit"

echo  Linking to GitHub...
git remote add origin https://github.com/xMoto1337/DragonRecS.git

echo  Pushing to GitHub...
git push -u origin main

echo.
echo  ==========================================
echo   Done! Check github.com/xMoto1337/DragonRecS
echo  ==========================================
echo.
pause
