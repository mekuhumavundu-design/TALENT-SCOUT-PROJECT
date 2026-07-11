const http = require('http');

// Railway automatically gives us a PORT variable, default to 3000 locally
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Talent Scout Server is Live!\n');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});