const http = require('http');
const port = 3000;
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*', // Allow all origins
    'Access-Control-Allow-Methods': 'GET, POST, HEAD', // Allow GET, POST, and HEAD methods
    'Access-Control-Max-Age': '14400', // Cache the CORS information for 2 hours (7200 seconds)
  };

  // Check if the Origin header is set
  if (!req.headers['origin']) {
    res.writeHead(400, { ...headers, 'Content-Type': 'text/plain' });
    res.end('Origin header not in the request');
    return;
  }

  // Handle GET and POST methods
  if (req.method === 'GET' || req.method === 'POST') {
    res.writeHead(200, { ...headers, 'Content-Type': 'text/plain' });
    res.end('I was requested using CORS!');
    return;
  }

  // Handle HEAD method
  if (req.method === 'HEAD') {
    res.writeHead(200, headers);
    res.end();
    return;
  }

  // Handle unsupported methods with 405 and correct headers
  res.writeHead(405, { ...headers, 'Content-Type': 'text/plain' });
  res.end('Request used a HTTP method which is not allowed.'); // Fix the string to match the test case
});

// DO NOT MODIFY BELOW THIS LINE
module.exports = server;

if (require.main === module) {
  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
