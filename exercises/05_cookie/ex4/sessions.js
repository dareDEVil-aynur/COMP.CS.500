const http = require('http');
const url = require('url');
const querystring = require('querystring');

// In-memory session store
let sessions = {};

// DO NOT EDIT. Function to generate a unique session ID
function generateSessionId() {
  return Math.random().toString(36).substr(2);
}

// DO NOT EDIT. Function to create a new session
function createSession() {
  const sessionId = generateSessionId();
  sessions[sessionId] = {};
  return sessionId;
}

// Helper function to parse cookies from the request headers
function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;

  cookieHeader.split(';').forEach((cookie) => {
    const [key, value] = cookie.split('=');
    cookies[key.trim()] = value.trim();
  });
  return cookies;
}

// Create the HTTP server
const server = http.createServer((req, res) => {
  // Parse cookies from the request headers
  const cookies = parseCookies(req.headers.cookie);
  let sessionId = cookies.sessionId;

  // Check if the session ID exists, if not, create a new session
  if (!sessionId || !sessions[sessionId]) {
    sessionId = createSession();
    // Set the sessionId cookie in the response headers
    res.setHeader('Set-Cookie', `sessionId=${sessionId}; HttpOnly`);
  }

  const session = sessions[sessionId]; // Get the session data

  // DO NOT MODIFY BELOW THIS LINE
  const parsedUrl = url.parse(req.url, true);
  if (
    parsedUrl.pathname === '/set' &&
    parsedUrl.query.key &&
    parsedUrl.query.value
  ) {
    session[parsedUrl.query.key] = parsedUrl.query.value; 
    res.end(`Session Updated: ${JSON.stringify(session)}`);
  } else {
    res.end(`Session Data: ${JSON.stringify(session)}`);
  }
});

// Conditionally start the server if this script is run directly
if (require.main === module) {
  server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}

// For Plussa grader
module.exports = server;
