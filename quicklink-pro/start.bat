@echo off
REM QuickLink Pro - One-Click Startup Script for Windows

echo ========================================
echo    QuickLink Pro - Starting Setup
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo Node.js version: %NODE_VERSION%
echo.

REM Install dependencies
echo Installing dependencies...
call npm install
echo.

REM Setup database
echo Setting up database...
call npx prisma generate
call npx prisma db push
echo.

REM Start the application
echo ========================================
echo    Setup Complete!
echo ========================================
echo.
echo Starting QuickLink Pro...
echo.
echo Application will be available at:
echo    http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev
