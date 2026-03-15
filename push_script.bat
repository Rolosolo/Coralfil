@echo off
echo Staging changes... > git_output.txt
git add . 2>> git_output.txt
echo Committing changes... >> git_output.txt
git commit -m "Refactor dashboard sub-pages and simplify terminology for demo" 2>> git_output.txt
echo Pushing changes... >> git_output.txt
git push origin main 2>> git_output.txt
echo Done. >> git_output.txt
