# migrate-to-src.ps1  ── Windows 用
$ErrorActionPreference = "Stop"
$root = Get-Location

# 1) src/ ディレクトリを作成
if (-not (Test-Path (Join-Path $root 'src'))) {
    New-Item -ItemType Directory -Path (Join-Path $root 'src') | Out-Null
}

# 2) 既存フォルダを src/ 直下へ移動
$dirs = @('app','components','hooks','lib','locales','styles','types','utils')
foreach ($d in $dirs) {
    $srcPath = Join-Path $root $d
    if (Test-Path $srcPath) {
        $destRoot = Join-Path $root 'src'
        $destPath = Join-Path $destRoot $d
        Write-Host "→ Moving $d → src\$d"
        Move-Item -Path $srcPath -Destination $destPath -Force
    }
}

# 3) tailwind.config.js を tailwind.config.ts にリネーム
$old = Join-Path $root 'tailwind.config.js'
if (Test-Path $old) {
    Rename-Item -Path $old -NewName 'tailwind.config.ts' -Force
    Write-Host "→ tailwind.config.ts にリネーム完了"
}

# 4) pages/ ディレクトリを削除
$pages = Join-Path $root 'pages'
if (Test-Path $pages) {
    Remove-Item -Path $pages -Recurse -Force
    Write-Host "→ pages フォルダを削除しました"
}

Write-Host ""
Write-Host "✅ src/ ベースへの再編が完了しました。"
Write-Host "  ・src 内の構成を確認してください。"
Write-Host "  ・pages/ フォルダが残っている場合、移植後に削除してください。" 