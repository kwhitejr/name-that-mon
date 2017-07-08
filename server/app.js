const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const db = require('./models');
const Pokemon = db.Pokemon;

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/api/pokemon/:id', function (req, res) {
  Pokemon.find({where: {id: req.params.id}})
    .then(function (result) {
      res.send(result);
    });
});

app.get('/api/generation/:id', function (req, res) {
  Pokemon.findAll({where: {generation: req.params.id}})
    .then(function (result) {
      res.send(result);
    });
});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.send("Server is listening, brah.");
});

module.exports = app;
