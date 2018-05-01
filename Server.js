
/**
 * Simple static file server that catches
 * all of the routes
 */

const express = require('express');
const url = require('url');
const http = require('http');
const path = require('path');

const app = express();

const visualization = path.resolve(__dirname, 'visualization');
const visualizationIndex = path.resolve(visualization, 'index.html');

const visualizationMiddleware = express.static(visualization);
app.get(/(\/static\/?|\/visualization\/?)/, express.static(__dirname));

app.get(/\/visualization\/?$/, function(req, res, next) {
  res.sendFile(visualizationIndex, () => res.end());
});

/**
 * @description - Middleware function to catch all routes
 * @param {ClientRequest} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
app.get(/\/[\w\d]*/, (req, res, next) => {
  res.sendFile(`${__dirname}/index.html`, () => res.end());
});

const Server = http.createServer(app);

Server.listen(80, () => {
  console.log('Listening on port: 80');
});
