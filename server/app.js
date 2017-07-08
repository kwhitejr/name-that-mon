const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const db = require('./models');
const Pokemon = db.Pokemon;

const app = express();

// TODO: move these functions to `common.js`
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
/************/

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(bodyParser.urlencoded({extended: false}));

// Get Pokemon by ID number
app.get('/api/pokemon/id/:id', (req, res) => {
  Pokemon.find({where: { id: req.params.id }})
    .then( (result) => {
      res.send(result);
    });
});

// Get Pokemon by name
app.get('/api/pokemon/name/:name', (req, res) => {
  const name = capitalizeFirstLetter(req.params.name);
  Pokemon.find({where: { name: name }})
    .then( (result) => {
      res.send(result);
    });
});

// Get Pokemon by generation
app.get('/api/pokemon/generation/:generation', (req, res) => {
  Pokemon.findAll({where: { generation: req.params.generation }})
    .then( (result) => {
      res.send(result);
    });
});

// Get Pokemon by type
app.get('/api/pokemon/type/:type', (req, res) => {
  const type = capitalizeFirstLetter(req.params.type);
  Pokemon.findAll({where: { type1: type }})
    .then( (result) => {
      res.send(result);
    });
});

// Get Legendary Pokemon
app.get('/api/pokemon/legendary', (req, res) => {
  Pokemon.findAll({where: { legendary: true }})
    .then( (result) => {
      res.send(result);
    });
});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.send("Server is listening, brah.");
});

module.exports = app;
