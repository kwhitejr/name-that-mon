import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col } from 'react-flexbox-grid';

import AnswerSelection from '../Components/answerSelection';

import pokemon from '../assets/pokemon/1.png';
import './Quiz.css';

const style = {
  margin: 12,
}

class Quiz extends Component {
  render() {
    return (
      <Grid>
        <div className="App">
          <Row>
            <div className="App-header">
              <img src={pokemon} className="mask" alt="logo" />
              <h2>Who is this?</h2>
            </div>
          </Row>
          <Row>            
            <AnswerSelection />
          </Row>
        </div>
      </Grid>
    );
  }
}

export default Quiz;