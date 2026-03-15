@echo off
echo STARTING PUSH > log.txt
git add . >> log.txt 2>&1
echo ADDED >> log.txt
git commit -m "Final branding refinements and UI polish" >> log.txt 2>&1
echo COMMITTED >> log.txt
git push origin main >> log.txt 2>&1
echo PUSHED >> log.txt
echo ENDING PUSH >> log.txt
