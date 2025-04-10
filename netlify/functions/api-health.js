// API Health Check - Netlify Functions
exports.handler = async function(event, context) {
  // サーバー時間
  const serverTime = new Date().toISOString();
  
  // 環境変数チェック
  const envStatus = {
    DATABASE_URL: process.env.DATABASE_URL ? '設定済み' : '未設定',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ? '設定済み' : '未設定',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? '設定済み' : '未設定',
    NODE_ENV: process.env.NODE_ENV || 'development'
  };
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      status: 'ok',
      message: 'API is healthy',
      serverTime,
      environment: process.env.NODE_ENV || 'development',
      nodeVersion: process.version,
      envStatus
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  };
}; 