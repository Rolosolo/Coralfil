@echo off
echo ============================================ > deploy_log.txt
echo  CORALFILL DEPLOY - %DATE% %TIME% >> deploy_log.txt
echo ============================================ >> deploy_log.txt

echo [1/4] Installing dependencies... >> deploy_log.txt
call npm install --legacy-peer-deps >> deploy_log.txt 2>&1
echo Install status: %ERRORLEVEL% >> deploy_log.txt

echo [2/4] Staging all changes... >> deploy_log.txt
git add -A >> deploy_log.txt 2>&1

echo [3/4] Committing... >> deploy_log.txt
git commit -m "feat: Research section blog + physics-based pellet animation" >> deploy_log.txt 2>&1
echo Commit status: %ERRORLEVEL% >> deploy_log.txt

echo [4/4] Pushing to GitHub (triggers Vercel deploy)... >> deploy_log.txt
git push origin main >> deploy_log.txt 2>&1
echo Push status: %ERRORLEVEL% >> deploy_log.txt

echo ============================================ >> deploy_log.txt
echo  DONE - Check Vercel dashboard for build >> deploy_log.txt
echo ============================================ >> deploy_log.txt

type deploy_log.txt
