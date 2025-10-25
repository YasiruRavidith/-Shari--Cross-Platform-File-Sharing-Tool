@echo off
echo.
echo ╔══════════════════════════════════════════╗
echo ║   Frontend Deployment Helper             ║
echo ╚══════════════════════════════════════════╝
echo.
echo Before deploying, you need your backend URL.
echo.
echo Step 1: Get Your Backend URL
echo ─────────────────────────────────────────
echo 1. Go to: https://vercel.com/dashboard
echo 2. Click on your backend project
echo 3. Copy the Production URL
echo    (Example: https://shari-backend-xyz.vercel.app)
echo.
echo.
set /p BACKEND_URL="Paste your backend URL here: "
echo.
echo.

if "%BACKEND_URL%"=="" (
    echo ❌ No URL provided. Exiting...
    pause
    exit /b
)

echo ✅ Backend URL: %BACKEND_URL%
echo.
echo Creating .env file...
echo REACT_APP_API_URL=%BACKEND_URL% > .env
echo ✅ .env file created!
echo.
echo.
echo Now deploying to Vercel...
echo ─────────────────────────────────────────
echo.
vercel --prod
echo.
echo.
echo ═══════════════════════════════════════════
echo ✅ Deployment Complete!
echo ═══════════════════════════════════════════
echo.
echo Next Steps:
echo 1. Copy your frontend URL from above
echo 2. Open it in your browser
echo 3. Login and test!
echo.
pause
