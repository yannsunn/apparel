export default function Home() {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>APPAREL SHOP</title>
        <style>{`
          body {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #fafafa;
            margin: 0;
          }
          h1 {
            font-size: 2rem;
            font-weight: bold;
            color: #222;
            margin-bottom: 1rem;
          }
          p {
            color: #555;
          }
        `}</style>
      </head>
      <body>
        <h1>APPAREL SHOP</h1>
        <p>ようこそ。ファッションストアのトップページです。</p>
        <script>{`
          // 必要ならここにJSを記述
        `}</script>
      </body>
    </html>
  );
} 