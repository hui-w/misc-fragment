@ECHO ON
REM Starting to minify JS & CSS files ...

@ECHO OFF
REM don't watch the sausage being made

REM the folder
SET TOOLS=%~DP0
SET SRC=%TOOLS%\..
SET OUT=%TOOLS%\..\release

rd /S /Q %OUT%
md "%OUT%\"

REM Combine JS & CSS files into one file
type "%SRC%\vendor\shim.js" "%SRC%\vendor\Blob.js" "%SRC%\vendor\FileSaver.js" "%SRC%\vendor\Export2Excel.js" "%SRC%\vendor\xlsx.core.min.js" "%SRC%\common.js" "%SRC%\polyfill.js" "%SRC%\excel-app.js" > "%OUT%\app.js"
type "%SRC%\style.css" > "%OUT%\app.css"

REM Index Files
copy "%SRC%\index_release.html" "%OUT%\index.html"
copy "%SRC%\ProjectSubList.xlsx" "%OUT%\ProjectSubList.xlsx"
copy "%SRC%\ProjectTracker.xlsx" "%OUT%\ProjectTracker.xlsx"

@ECHO ON
