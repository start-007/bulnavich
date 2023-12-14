const express = require('express');
const app = express();
const PORT = process.env.EXPRESS_PORT || 3001; // Choose your desired port

// Define a route for the home page
app.get('/', (req, res) => {

  res.send('Hello');
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
