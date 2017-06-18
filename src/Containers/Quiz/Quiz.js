import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';

import QuizMon from '../../Components/QuizMon';
import AnswerSelection from '../../Components/AnswerSelection';

import './Quiz.css';

class Quiz extends Component {

  toggleMask () {
    console.log("Fire Toggle Mask!")
    let pokemon = document.getElementById("target-mon");
    pokemon.classList.toggle('mask');
  }

  render () {
    return (<div>
      <Grid fluid>
        <Row>
          <Col xsOffset={3} xs={12}>      
            <QuizMon />
          </Col> 
        <Row>
        </Row>
          <Col xs={12}>          
            <AnswerSelection 
              toggleMask={this.toggleMask}
            />
          </Col>
        </Row>
      </Grid>
    </div>)
  }
}


export default Quiz;