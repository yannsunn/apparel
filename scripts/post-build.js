/**
 * ビルド後の処理を行うスクリプト
 * 静的ファイルをstandaloneディレクトリにコピーする
 */
const fs = require('fs');
const path = require('path');

// 環境変数からNext.jsの出力ディレクトリを取得（デフォルト: .next）
const nextOutputDir = process.env.NEXT_OUTPUT_DIR || '.next';
const staticDir = path.join(process.cwd(), nextOutputDir, 'static');
const targetDir = path.join(process.cwd(), nextOutputDir, 'standalone', '.next', 'static');

console.log(`🔄 Post-build process started...`);

// スタンドアロンディレクトリが存在するか確認
if (!fs.existsSync(path.join(process.cwd(), nextOutputDir, 'standalone'))) {
  console.log('❌ Standalone directory not found. Skipping post-build process.');
  process.exit(0);
}

// スタティックファイルをスタンドアロンディレクトリにコピー
try {
  console.log(`📁 Copying static files from ${staticDir} to ${targetDir}`);
  
  // 対象ディレクトリが存在しない場合は作成
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  // 再帰的にディレクトリの内容をコピー
  copyFolderRecursive(staticDir, targetDir);
  
  console.log('✅ Post-build process completed successfully!');
} catch (error) {
  console.error(`❌ Error during post-build process: ${error.message}`);
  process.exit(1);
}

// 再帰的にディレクトリをコピーする関数
function copyFolderRecursive(source, target) {
  // ソースディレクトリが存在しない場合はスキップ
  if (!fs.existsSync(source)) {
    console.log(`⚠️ Source directory ${source} does not exist. Skipping.`);
    return;
  }
  
  // 対象ディレクトリが存在しない場合は作成
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }
  
  // ディレクトリの内容を取得
  const files = fs.readdirSync(source);
  
  // 各ファイルをコピー
  for (const file of files) {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);
    
    const stat = fs.statSync(sourcePath);
    
    if (stat.isDirectory()) {
      // ディレクトリの場合は再帰的にコピー
      copyFolderRecursive(sourcePath, targetPath);
    } else {
      // ファイルの場合はコピー
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
} 