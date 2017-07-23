const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const db = require('./models');
const Pokemon = db.Pokemon;
const Playthru = db.Playthru;

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
app.use(bodyParser.json());

// Get Pokemon by ID number
app.get('/api/pokemon/id/:id', (req, res) => {
  if (!req.params.id) {
    return res.status(422).send({ error: 'You must enter an id.' });
  }

  Pokemon.find({where: { id: req.params.id }})
    .then( (result) => {
      res.send(result);
    })
    .catch( (err) => {
      res.send(err);
    });
});

// Get Pokemon by name
app.get('/api/pokemon/name/:name', (req, res) => {
  if (!req.params.name) {
    return res.status(422).send({ error: 'You must enter a name.' });
  }

  const name = capitalizeFirstLetter(req.params.name);
  Pokemon.find({where: { name: name }})
    .then( (result) => {
      res.send(result);
    })
    .catch( (err) => {
      res.send(err);
    });
});

// Get Pokemon by generation
app.get('/api/pokemon/generation/:generation', (req, res) => {
  if (!req.params.generation) {
    return res.status(422).send({ error: 'You must enter a generation.' });
  }

  Pokemon.findAll({where: { generation: req.params.generation }})
    .then( (result) => {
      res.send(result);
    })
    .catch( (err) => {
      res.send(err);
    });
});

// Get Pokemon by type
app.get('/api/pokemon/type/:type', (req, res) => {
  if (!req.params.type) {
    return res.status(422).send({ error: 'You must enter a type.' });
  }

  const type = capitalizeFirstLetter(req.params.type);
  Pokemon.findAll({where: { type1: type }})
    .then( (result) => {
      res.send(result);
    })
    .catch( (err) => {
      res.send(err);
    });
});

// Get Legendary Pokemon
app.get('/api/pokemon/legendary', (req, res) => {
  Pokemon.findAll({where: { legendary: true }})
    .then( (result) => {
      res.send(result);
    })
    .catch( (err) => {
      res.send(err);
    });
});

app.post('/api/playthru', (req, res) => {
  const playthruData = req.body
  console.log("request body");
  console.log(playthruData);
  Playthru.create({
    user_initials:        playthruData.user_initials,
    quiz_type:            playthruData.quiz_type,
    quiz_set:             playthruData.quiz_set,
    start_time:           playthruData.start_time,
    end_time:             playthruData.end_time,
    clue_count:           playthruData.clue_count,
    correct_answer_stack: playthruData.correct_answer_stack,
    wrong_answer:         playthruData.wrong_answer,
  });
});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.send("Server is listening, brah.");
});

module.exports = app;
