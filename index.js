const fs = require('fs');
const http = require('http');
const url = require('url');

// Server
const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === '/' || pathName === '/overview') {
    res.end('Overview');
  } else if (pathName === '/product') {
    res.end('Product');
  } else if (pathName === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-header': "Jeff's Header",
    });
    res.end('<h1>PNF</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening on port 8000');
});
