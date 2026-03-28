@echo off
echo STARTING DEPLOYMENT > deploy_log.txt

echo Installing/updating dependencies... >> deploy_log.txt
call npm install --legacy-peer-deps >> deploy_log.txt 2>&1
echo dependencies installed status: %ERRORLEVEL% >> deploy_log.txt

rem echo Running lint check... >> deploy_log.txt
rem call npm run lint >> deploy_log.txt 2>&1
rem echo lint status: %ERRORLEVEL% >> deploy_log.txt

echo Staging changes... >> deploy_log.txt
git add . >> deploy_log.txt 2>&1

echo Committing... >> deploy_log.txt
git commit -m "feat: update deps, fix ESLint config, align Next.js 15 + Node v24 [vercel deploy]" >> deploy_log.txt 2>&1

echo Pushing to GitHub (triggers Vercel production deploy)... >> deploy_log.txt
git push origin main >> deploy_log.txt 2>&1
echo push status: %ERRORLEVEL% >> deploy_log.txt

echo DEPLOYMENT COMPLETE >> deploy_log.txt
