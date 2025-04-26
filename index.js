const fs = require('fs');
const http = require('http');
const url = require('url');

// Server
const replaceTemplate = (template, product) => {
  let output = template.replace(
    /{%PRODUCTNAME%}/g,
    product.productName
  );
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%BRAND%}/g, product.brand);
  output = output.replace(/{%SPECS%}/g, product.specs);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.new) {
    output = output.replace(/{%NOT_NEW%}/g, 'not-new');
  }
  return output;
};
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
  const pathName = req.url;
  // Home page
  if (pathName === '/' || pathName === '/overview') {
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
  } else if (pathName === '/product') {
    res.end('Product');

    // API
  } else if (pathName === '/api') {
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
