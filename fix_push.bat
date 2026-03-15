@echo off
echo STAGING > log_fix.txt
git add . >> log_fix.txt 2>&1
echo COMMITTING >> log_fix.txt
git commit -m "Fix coralstick cross-section image and reef library order" >> log_fix.txt 2>&1
echo PUSHING >> log_fix.txt
git push origin main >> log_fix.txt 2>&1
echo DONE >> log_fix.txt
