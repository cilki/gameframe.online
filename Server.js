
/**
 * Simple static file server that catches
 * all of the routes
 */

const express = require('express');
const http = require('http');

const app = express();

app.get(/\/static\/?/, express.static(`${__dirname}`));

/**
 * @description - Middleware function to catch all routes
 * @param {ClientRequest} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
app.get(/\/\w*/, (req, res, next) => {
  res.sendFile(`${__dirname}/index.html`, () => res.end());
});

const Server = http.createServer(app);

Server.listen(80, () => {
  console.log('Listening on port: 80');
});
