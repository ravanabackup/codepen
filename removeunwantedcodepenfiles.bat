@echo off
setlocal enabledelayedexpansion

REM Set the base directory to the cp folder inside the current directory
SET "base_dir=%~dp0cp"

REM Check if the cp folder exists
if not exist "%base_dir%" (
    echo The cp folder does not exist. Make sure the script is placed in the correct location.
    pause
    exit /b
)

REM Loop through each directory inside the cp folder
for /D %%D in ("%base_dir%\*") do (
    echo Processing folder: %%D

    REM Check if the dist folder exists
    if exist "%%D\dist" (
        REM Move index.html, script.js, and style.css from dist to the parent folder
        if exist "%%D\dist\index.html" (
            echo Moving index.html
            move /Y "%%D\dist\index.html" "%%D\"
        )
        if exist "%%D\dist\script.js" (
            echo Moving script.js
            move /Y "%%D\dist\script.js" "%%D\"
        )
        if exist "%%D\dist\style.css" (
            echo Moving style.css
            move /Y "%%D\dist\style.css" "%%D\"
        )

        REM Remove the dist folder
        echo Removing dist folder
        rd /s /q "%%D\dist"
    ) else (
        echo dist folder not found in %%D
    )

    REM Remove src folder if it exists
    if exist "%%D\src" (
        echo Removing src folder
        rd /s /q "%%D\src"
    ) else (
        echo src folder not found in %%D
    )

    REM Remove LICENSE.txt if it exists
    if exist "%%D\LICENSE.txt" (
        echo Removing LICENSE.txt
        del /q "%%D\LICENSE.txt"
    ) else (
        echo LICENSE.txt not found in %%D
    )

    REM Remove README.md if it exists
    if exist "%%D\README.md" (
        echo Removing README.md
        del /q "%%D\README.md"
    ) else (
        echo README.md not found in %%D
    )
)

echo Done processing all folders!
pause
