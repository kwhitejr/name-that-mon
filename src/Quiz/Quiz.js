import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; 
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

import { 
  getCurrentMon,
  getQuizLength
} from './QuizSelectors'

import QuizTop from './QuizTop';
import QuizAnswers from './QuizAnswers';
import QuizProgress from './QuizProgress';

import './Quiz.css';

const toggleMask = () => {
  let pokemon = document.getElementById("target-mon");
  pokemon.classList.toggle('mask');
}

export class Quiz extends Component {

  componentWillMount() {
    const { resetThenHome } = this.props
    if (!this.props.shuffledQuizStack || !this.props.currentMon) {
      resetThenHome()
    }
  }

  render() {
    return (
      <Grid fluid>
        <Row center="xs">
          <Col xs={12} sm={6} smOffset={1} md={4} mdOffset={1} lg={3} lgOffset={2}>      
            <QuizTop
              {...this.props}
            />
            <QuizProgress 
              {...this.props}
            />
            <QuizAnswers 
              {...this.props}
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
  isAnswerSelected:  state.quizInstance.isAnswerSelected,
  isAnswerSubmitted:  state.quizInstance.isAnswerSubmitted,
  isClueUsed:  state.quizInstance.isClueUsed,
  userAnswer:  state.quizInstance.userAnswer,
  shuffledQuizStack:  state.quizInstance.shuffledQuizStack,
  answerChoices:  state.quizInstance.answerChoices,
  correctAnswerStack:  state.quizInstance.correctAnswerStack,
  currentMon: getCurrentMon(state),
  quizLength: getQuizLength(state),
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

Quiz.propTypes = {
  reset: PropTypes.func,
  setAnswer: PropTypes.func,
  submitAnswer: PropTypes.func,
  setNextQuestion: PropTypes.func,
  useClue: PropTypes.func,
  endCurrentQuiz: PropTypes.func,
  isAnswerSelected: PropTypes.bool,
  isAnswerSubmitted: PropTypes.bool,
  isClueUsed: PropTypes.bool,
  currentMon: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quiz);
