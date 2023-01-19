const express = require('express')
const rawBody = require('./middleware/raw-body');
const app = express();

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`<h1>Welcome to the Svelte compiler API</h1><h2>Just send a POST with your code in the body to get it compiled</h2>`);
});

app.post('/', rawBody, (req, res) => {
  res.send({ body: req.body  });
});

module.exports = app;
