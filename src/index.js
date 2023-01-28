const express = require('express');
const cors = require('cors');
const rawBody = require('./middleware/raw-body');
const bundler = require('./bundler');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(
    `<h1>Welcome to the Svelte compiler API</h1><h2>Just send a POST with your code in the body to get it compiled</h2>`
  );
});

app.post('/', rawBody, async (req, res) => {
  const autorun = 'autorun' in req.query;
  const code = await bundler(req.body, { autorun });

  res.send(code);
});

module.exports = app;
