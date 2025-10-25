@echo off
setlocal EnableDelayedExpansion

echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║  Fix DATABASE_URL in Vercel Dashboard                 ║
echo ╚════════════════════════════════════════════════════════╝
echo.
echo The Vercel CLI is adding extra characters.
echo You need to update it manually in the dashboard.
echo.
echo 1. Go to: https://vercel.com/dashboard
echo 2. Click on: shari-backend
echo 3. Go to: Settings -^> Environment Variables
echo 4. Find: DATABASE_URL
echo 5. Click: Edit (pencil icon)
echo 6. Replace with exactly this (copy from below):
echo.
echo === COPY THIS (select and Ctrl+C) ===
type .db_url.txt
echo.
echo === END ===
echo.
echo 7. Click Save
echo 8. Then run: vercel --prod
echo.
pause
