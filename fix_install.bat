@echo off
echo STARTING INSTALL AT %TIME% > temp_install.log
npm install --legacy-peer-deps --no-audit --no-fund >> temp_install.log 2>&1
echo INSTALL FINISHED WITH STATUS %ERRORLEVEL% AT %TIME% >> temp_install.log
