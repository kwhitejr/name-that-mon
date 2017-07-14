import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { 
  setAnswer, 
  reset, 
  submitAnswer, 
  setNextQuestion,
  endCurrentQuiz,
  useClue,
} from './QuizActions'

import {
  resetThenHome,
} from '../Result/ResultActions'

import QuizTop from './QuizTop';
import QuizAnswers from './QuizAnswers';
import QuizProgress from './QuizProgress';

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
            <QuizTop
              {...this.props}
              currentMon={currentMon} 
            />
            <QuizProgress 
              {...this.props}
              quizLength={quizLength}
            />
            <QuizAnswers 
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
  isClueUsed:  state.quizReducer.isClueUsed,
  userAnswer:  state.quizReducer.userAnswer,
  shuffledQuizStack:  state.quizReducer.shuffledQuizStack,
  answerChoices:  state.quizReducer.answerChoices,
  correctAnswerStack:  state.quizReducer.correctAnswerStack,
});

const mapDispatchToProps = (dispatch) => ({
  setAnswer:        (event, value) => dispatch(setAnswer(event, value)),
  reset:            () => dispatch(reset()),
  submitAnswer:     () => dispatch(submitAnswer()),
  setNextQuestion:  () => dispatch(setNextQuestion()),
  endCurrentQuiz:   () => dispatch(endCurrentQuiz()),
  resetThenHome:    () => dispatch(resetThenHome()),
  useClue:          () => dispatch(useClue()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quiz);
