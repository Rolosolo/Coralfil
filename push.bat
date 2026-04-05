@echo off
cd /d "c:\Users\User\Documents\Coralfill\Marketing\stitch_coralfill_website_launch.md (3)\stitch_coralfill_website_launch.md\reefmaker-app"

echo Starting at %TIME% > git_push_log.txt

git add -A >> git_push_log.txt 2>&1
echo GIT ADD STATUS: %ERRORLEVEL% >> git_push_log.txt

git commit -m "feat: Research section blog + smooth pellet animation physics" >> git_push_log.txt 2>&1
echo GIT COMMIT STATUS: %ERRORLEVEL% >> git_push_log.txt

git push origin main >> git_push_log.txt 2>&1
echo GIT PUSH STATUS: %ERRORLEVEL% >> git_push_log.txt

echo Finished at %TIME% >> git_push_log.txt
echo DONE >> git_push_log.txt
