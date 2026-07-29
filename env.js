// This would go in api/env.js on your Vercel deployment
// It exposes the Upstash environment variables to the frontend

module.exports = (req, res) => {
  // Allow all origins for now (restrict in production if needed)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Return only the Upstash variables needed by the frontend
  // These are read from environment variables automatically by Vercel
  res.status(200).json({
    KV_REST_API_URL: process.env.KV_REST_API_URL,
    KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
    UPSTASH_REST_URL: process.env.KV_REST_API_URL,
    UPSTASH_REST_TOKEN: process.env.KV_REST_API_TOKEN
  });
};
