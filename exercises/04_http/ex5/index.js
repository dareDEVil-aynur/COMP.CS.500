const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer(function (request, response) {
  const accHeader = request.headers['accept'];

  // Handle JSON
  if (accHeader.includes('application/json')) {
    readFileSendResponse('data.json', 'application/json', response);
  } 
  // Handle XML
  else if (accHeader.includes('application/xml')) {
    readFileSendResponse('data.xml', 'application/xml', response);
  } 
  // Handle TXT
  else if (accHeader.includes('text/plain')) {
    readFileSendResponse('data.txt', 'text/plain', response);
  }
  // Handle CSS
  else if (accHeader.includes('text/css')) {
    readFileSendResponse('data.css', 'text/css', response);
  }
  // Handle HTML
  else if (accHeader.includes('text/html')) {
    readFileSendResponse('data.html', 'text/html', response);
  }
  // Handle ZIP
  else if (accHeader.includes('application/zip')) {
    readFileSendResponse('data.zip', 'application/zip', response);
  }
  // Handle */* (any type is acceptable, defaults to text/plain)
  else if (accHeader.includes('*/*')) {
    readFileSendResponse('data.txt', 'text/plain', response);
  } 
  // If none of the accepted content types match, return 406 error
  else {
    response.statusCode = 406;
    response.statusMessage = 'Content type not available';
    response.end();
  }
}).listen(3000, () => {
  console.log('Server running on port 3000');
});

/**
 * @param {string} fileName - name of the file to be read
 * @param {string} contentType - type of the content to be sent in the response
 * @param {object} response - response object
 */
const readFileSendResponse = (fileName, contentType, response) => {
  fs.readFile(path.resolve(fileName), function (error, file) {
    if (error) {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.write('File not found');
    } else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.write(file);
    }
    response.end();
  });
};
