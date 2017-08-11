const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const db = require('./models');
const Pokemon = db.Pokemon;
const Playthru = db.Playthru;
const Answer = db.Answer;

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
      // console.log(result)
      // console.log("result: ", typeof result)
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

// Get Global Stats
app.get('/api/stats/mostwrong', (req, res) => {
  db.sequelize.query(
    "SELECT id, name " +
    "FROM pokemon " +
    "WHERE id in (" +
      "SELECT pokemon_id " +
      "FROM answer " +
      "GROUP BY pokemon_id " +
      "ORDER BY COUNT(CASE WHEN NOT was_correct THEN 1 END) " +
    "DESC LIMIT 1)", { type: db.sequelize.QueryTypes.SELECT}
  ).then(mostwrong => {
    res.send(mostwrong[0]);
  });
});

app.get('/api/stats/mostright', (req, res) => {
  db.sequelize.query(
    "SELECT id, name " +
    "FROM pokemon " +
    "WHERE id in (" +
      "SELECT pokemon_id " +
      "FROM answer " +
      "GROUP BY pokemon_id " +
      "ORDER BY COUNT(CASE WHEN was_correct THEN 1 END) " +
    "DESC LIMIT 1)", { type: db.sequelize.QueryTypes.SELECT}
  ).then(mostright => {
    res.send(mostright[0]);
  });
});

app.get('/api/stats/highscore', (req, res) => {
  db.sequelize.query(
    "SELECT * " +
    "FROM playthru " +
    "WHERE id in (" +
      "SELECT playthru_id " +
      "FROM answer " +
      "GROUP BY playthru_id " +
      "ORDER BY COUNT(CASE WHEN was_correct THEN 1 END) " +
    "DESC LIMIT 1)",
    { type: db.sequelize.QueryTypes.SELECT })
  .then(highscore => {
    res.send(highscore[0]);
  });
});

// Post Playthru and Answer data
app.post('/api/playthru', (req, res) => {
  const playthruData = req.body
  Playthru.create(playthruData)
    .then( (result) => {
      // submit incorrect answer
      Answer.create({
        pokemon_id: result.dataValues.wrong_answer,
        playthru_id: result.dataValues.id,
        was_correct: false
      });
      // submit correct answers
      result.dataValues.correct_answer_stack.map( (correct_answer) => {
        Answer.create({
          pokemon_id: correct_answer,
          playthru_id: result.dataValues.id,
          was_correct: true
        });
      })
    })
    .catch( (err) => {
      res.send(err);
    });

  res.end('Successful POST!');
});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.send("Server is listening, brah.");
});

module.exports = app;
