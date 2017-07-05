import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { 
  setAnswer, 
  reset, 
  getQuizData, 
  submitAnswer, 
  setNextQuestion,
  goToResults,
} from '../../actions/quizActions'

import {
  resetThenHome,
} from '../../actions/resultActions'

import QuizMon from '../../Components/quizMon';
import AnswerSelection from '../../Components/answerSelection';

import './Quiz.css';

const toggleMask = () => {
  let pokemon = document.getElementById("target-mon");
  pokemon.classList.toggle('mask');
}

class Quiz extends Component {

  componentWillMount() {
    const { resetThenHome } = this.props
    if (this.props.shuffledData === null) {
      resetThenHome()
    }
  }

  render() {
    const { shuffledData } = this.props
    const currentMon = shuffledData[shuffledData.length-1]

    return (
      <Grid fluid>
        <Row center="xs">
          <Col xs={12} sm={6} smOffset={1}>      
            <QuizMon
              {...this.props}
              currentMon={currentMon} 
            />
          <AnswerSelection 
            {...this.props}
            currentMon={currentMon}
            toggleMask={toggleMask}
          />
          </Col>
          <Col sm={4}>
            <p>This is the stat bar</p>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  isAnswerSelected:  state.quizReducer.isAnswerSelected,
  isAnswerSubmitted:  state.quizReducer.isAnswerSubmitted,
  userAnswer:  state.quizReducer.userAnswer,
  shuffledData:  state.quizReducer.shuffledData,
  answerChoices:  state.quizReducer.answerChoices,
  correctAnswerStack:  state.quizReducer.correctAnswerStack,
});

const mapDispatchToProps = (dispatch) => ({
  setAnswer:    (event, value) => dispatch(setAnswer(event, value)),
  getQuizData:  () => dispatch(getQuizData()),
  reset:        () => dispatch(reset()),
  submitAnswer: () => dispatch(submitAnswer()),
  setNextQuestion:  () => dispatch(setNextQuestion()),
  goToResults:  () => dispatch(goToResults()),
  resetThenHome: () => dispatch(resetThenHome()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quiz);
