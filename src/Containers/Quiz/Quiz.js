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
import QuizProgress from '../../Components/QuizProgress';

import './Quiz.css';

const toggleMask = () => {
  let pokemon = document.getElementById("target-mon");
  pokemon.classList.toggle('mask');
}

class Quiz extends Component {

  componentWillMount() {
    const { resetThenHome } = this.props
    if (this.props.shuffledQuizStack === null) {
      resetThenHome()
    }
  }

  render() {
    const { shuffledQuizStack, correctAnswerStack } = this.props
    const currentMon = shuffledQuizStack ? shuffledQuizStack[shuffledQuizStack.length-1] : null
    const quizLength = shuffledQuizStack ? shuffledQuizStack.length + correctAnswerStack.length : null

    return (
      <Grid fluid>
        <Row center="xs">
          <Col xs={12} sm={6} smOffset={1} md={4} mdOffset={1} lg={3} lgOffset={2}>      
            <QuizMon
              {...this.props}
              currentMon={currentMon} 
            />
            <QuizProgress 
              {...this.props}
              quizLength={quizLength}
            />
            <AnswerSelection 
              {...this.props}
              currentMon={currentMon}
              toggleMask={toggleMask}
            />
          </Col>
          <Col sm={4} md={3} lg={2}>
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
  shuffledQuizStack:  state.quizReducer.shuffledQuizStack,
  answerChoices:  state.quizReducer.answerChoices,
  correctAnswerStack:  state.quizReducer.correctAnswerStack,
});

const mapDispatchToProps = (dispatch) => ({
  setAnswer:    (event, value) => dispatch(setAnswer(event, value)),
  getQuizData:  (generation) => dispatch(getQuizData(generation)),
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
