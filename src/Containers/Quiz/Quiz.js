import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';

import QuizMon from '../../Components/QuizMon';
import AnswerSelection from '../../Components/AnswerSelection';

import './Quiz.css';

const Quiz = () => (
  <Grid>
    <div className="App">
      <Row center="xs">
        <Col xs={6}>
          <QuizMon />
        </Col>
      </Row>
      <Row>            
        <AnswerSelection />
      </Row>
    </div>
  </Grid>
)


export default Quiz;