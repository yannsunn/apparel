// テスト用のNetlify関数
exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World from Netlify Functions!" }),
    headers: {
      "Content-Type": "application/json"
    }
  };
}; 