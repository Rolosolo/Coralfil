@echo off
echo STARTING DEPLOYMENT > deploy_log.txt
echo Installing dependencies... >> deploy_log.txt
call npm install --legacy-peer-deps >> deploy_log.txt 2>&1
echo dependencies installed status: %ERRORLEVEL% >> deploy_log.txt

echo Running lint check... >> deploy_log.txt
call npm run lint >> deploy_log.txt 2>&1
echo lint status: %ERRORLEVEL% >> deploy_log.txt

echo Staging changes... >> deploy_log.txt
git add . >> deploy_log.txt 2>&1

echo Committing... >> deploy_log.txt
git commit -m "fix: dependency conflicts and ESLint config alignment for Next.js 15" >> deploy_log.txt 2>&1

echo Pushing to GitHub... >> deploy_log.txt
git push origin main >> deploy_log.txt 2>&1
echo push status: %ERRORLEVEL% >> deploy_log.txt

echo DEPLOYMENT COMPLETE >> deploy_log.txt
