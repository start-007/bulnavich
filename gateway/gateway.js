const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.GATEWAY_PORT || 3000;

// Define backend servers
const backendServers = [
  { path: '/express', url: `http://localhost:${process.env.EXPRESS_PORT || 3001}` },
  { path: '/django', url: `http://localhost:${process.env.DJANGO_PORT || 8000}` },
  // Add more backend servers as needed
];

// Create proxies for each backend server
backendServers.forEach(({ path, url }) => {
  app.use(path, createProxyMiddleware({ target: url, pathRewrite: { [`^${path}`]: '' }, changeOrigin: true }));
});

// Default route for the gateway itself
app.get('/', (req, res) => {
  res.send('Express.js Gateway is running!');
});

// Start the gateway
app.listen(port, () => {
  console.log(`Express.js Gateway listening on port ${port}`);
});
