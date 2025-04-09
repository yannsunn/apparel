// Netlify Functions メインエントリーポイント
const { builder } = require('@netlify/functions');

// リクエストハンドラー
async function handler(event, context) {
  // リクエストパスを取得
  const path = event.path.replace('/.netlify/functions/index', '');
  
  // ルートパスの場合はホームページにリダイレクト
  if (path === '' || path === '/') {
    return {
      statusCode: 200,
      body: `
        <!DOCTYPE html>
        <html>
          <head>
            <title>AparelEC | オンラインアパレルショップ</title>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 0;
                color: #333;
              }
              .container {
                max-width: 960px;
                margin: 0 auto;
                padding: 40px 20px;
                text-align: center;
              }
              h1 {
                font-size: 2.5rem;
                margin-bottom: 20px;
              }
              p {
                font-size: 1.2rem;
                margin-bottom: 30px;
              }
              .button {
                display: inline-block;
                background-color: #000;
                color: #fff;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 4px;
                font-weight: 500;
                transition: background-color 0.3s;
              }
              .button:hover {
                background-color: #333;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Welcome to AparelEC</h1>
              <p>オンラインアパレルショッピングの新しい体験を始めましょう</p>
              <p>このサイトは現在構築中です。すぐに新しいコレクションをお届けします。</p>
              <a href="/api/health" class="button">サイト状態を確認</a>
            </div>
          </body>
        </html>
      `,
      headers: {
        'Content-Type': 'text/html',
      },
    };
  }

  // APIパスの場合
  if (path.startsWith('/api')) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'API is coming soon',
        path: path,
        requestTime: new Date().toISOString(),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  // 404 Not Found
  return {
    statusCode: 404,
    body: `
      <!DOCTYPE html>
      <html>
        <head>
          <title>404 - ページが見つかりません | AparelEC</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              line-height: 1.6;
              margin: 0;
              padding: 0;
              color: #333;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              flex-direction: column;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 40px 20px;
              text-align: center;
            }
            h1 {
              font-size: 4rem;
              margin-bottom: 0;
              color: #000;
            }
            h2 {
              font-size: 2rem;
              margin-top: 10px;
              margin-bottom: 20px;
            }
            p {
              font-size: 1.2rem;
              margin-bottom: 30px;
            }
            .button {
              display: inline-block;
              background-color: #000;
              color: #fff;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 4px;
              font-weight: 500;
              margin: 0 10px;
              transition: background-color 0.3s;
            }
            .button:hover {
              background-color: #333;
            }
            .button.secondary {
              background-color: transparent;
              color: #000;
              border: 1px solid #ccc;
            }
            .button.secondary:hover {
              background-color: #f5f5f5;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>404</h1>
            <h2>ページが見つかりません</h2>
            <p>お探しのページは存在しないか、移動された可能性があります。</p>
            <div>
              <a href="javascript:history.back()" class="button secondary">前のページに戻る</a>
              <a href="/" class="button">ホームに戻る</a>
            </div>
          </div>
        </body>
      </html>
    `,
    headers: {
      'Content-Type': 'text/html',
    },
  };
}

// Netlify Functionsとしてエクスポート
exports.handler = builder(handler); 