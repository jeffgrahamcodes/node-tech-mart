const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = require('./modules/replaceTemplate');

// Server
const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const overviewTemplate = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const productTemplate = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const cardTemplate = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const productObject = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  // Home page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cards = productObject
      .map((product) => {
        return replaceTemplate(cardTemplate, product);
      })
      .join('');

    const output = overviewTemplate.replace(
      '{%PRODUCT_CARDS%}',
      cards
    );

    res.end(output);

    // Products page
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const product = productObject[query.id];
    const output = replaceTemplate(productTemplate, product);
    res.end(output);

    // API
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);

    // 404 PAGE
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
