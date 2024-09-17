const http = require('http');

http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    
    const headers = request.headers;

    const headersString = JSON.stringify(headers);

    response.write(headersString);

    response.end();
}).listen(3000, () => {
    console.log('Server is running on port 3000');
});
