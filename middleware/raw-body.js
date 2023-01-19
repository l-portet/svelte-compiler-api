module.exports = function (req, res, next) {
  let data = '';

  req.setEncoding('utf8');

  req.on('data', function (chunk) {
    data += chunk;
  });

  req.on('end', function () {
    req.body = data;
    next();
  });
};
