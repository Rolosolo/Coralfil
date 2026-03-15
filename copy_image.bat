@echo off
copy "C:\Users\User\.gemini\antigravity\brain\afa4b516-aef2-4410-8f2e-6918e78da977\coralstick_cross_section_v2_1773561117986.png" "public\coralstick-crosssection.png"
if %errorlevel% neq 0 (
    echo Error copying file: %errorlevel% > copy_error.txt
) else (
    echo Success >> copy_error.txt
)
