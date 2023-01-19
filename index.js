const app = require('express')();

app.get('/', (req, res) => {
  res.send(`hello world!`);
});

app.get('/api', (req, res) => {
  const path = `/api/plop`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/plop', (req, res) => {
  res.send({ status: 'plop' });
});

module.exports = app;
