Get-ChildItem -Path src -Recurse -Include *.ts,*.tsx | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $newContent = $content -replace "PROBIOTIC", "PREBIOTIC" -replace "Probiotic", "Prebiotic" -replace "probiotic", "prebiotic"
    if ($content -ne $newContent) {
        Set-Content -Path $_.FullName -Value $newContent -Encoding UTF8
    }
}
