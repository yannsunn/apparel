# Claude Code - Project Configuration

## 自動プッシュ設定

### Git Hooks
- `post-commit` フック設定済み
- コミット後自動でプッシュされます

### コマンド
```bash
# ビルド
npm run build

# 開発サーバー
npm run dev

# Vercelデプロイ
npx vercel --prod

# テスト（設定時）
npm run test

# Lint（設定時）
npm run lint
```

## プロジェクト構成
- Next.js 15.3.3 + React 19
- TypeScript 5.7.3
- 日本のアパレルECサイト特化
- Vercel自動デプロイ設定済み

## 注意事項
- コミット時に自動プッシュされます
- GitHub Actions経由でVercelデプロイ
- 日本語対応済み（ja_JP）