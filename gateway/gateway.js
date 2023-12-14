const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3000; // Choose your desired port

// Define backend servers
const backendServers = [
  { path: '/express', url: 'http://localhost:3001' }, // Replace with the URL of your Express.js server
  { path: '/django', url: 'http://localhost:8000' },  // Replace with the URL of your Django server
  // Add more backend servers as needed
];

// Create proxies for each backend server
backendServers.forEach(({ path, url }) => {
  app.use(path, createProxyMiddleware({ target: url, changeOrigin: true }));
});

// Default route for the gateway itself
app.get('/', (req, res) => {
  res.send('Express.js Gateway is running!');
});

// Start the gateway
app.listen(port, () => {
  console.log(`Express.js Gateway listening on port ${port}`);
});
