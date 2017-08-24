import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; 

import { 
  setAnswer,
  reset, 
  submitAnswer, 
  setAnswerCorrectFlag,
  setQuizCompleteFlag,
  setNextQuestion,
  stackCorrectAnswer,
  endTimer,
  endCurrentQuiz,
  useClue,
} from './QuizActions'

import {
  resetThenHome,
} from '../Result/ResultActions'

import { 
  getCurrentMon,
  getQuizLength,
  getAnswerChoices,
} from './QuizSelectors'

import QuizTop from './QuizTop';
import QuizAnswers from './QuizAnswers';
import QuizProgress from './QuizProgress';

import './Quiz.css';

const toggleMask = () => {
  let pokemon = document.getElementById("target-mon");
  pokemon.classList.toggle('mask');
}

const stackCorrectAnswerHelper = (shuffledQuizStack, correctAnswerStack) => {
  const lastDatum = shuffledQuizStack[shuffledQuizStack.length-1]
  correctAnswerStack.push(lastDatum)

  const newObj = {
    shuffledQuizStack: shuffledQuizStack.slice(0,-1) || [],
    correctAnswerStack: correctAnswerStack,
  };
  return newObj;
}

export class Quiz extends Component {

  componentWillMount() {
    // TODO: refactor this away
    const { resetThenHome } = this.props
    if (!this.props.shuffledQuizStack || !this.props.currentMon) {
      resetThenHome()
    }
  }

  render() {
    return (
      <div className="view-container">
        <QuizTop
          {...this.props}
        />
        <QuizProgress 
          {...this.props}
        />
        <QuizAnswers 
          {...this.props}
          toggleMask={toggleMask}
          getAnswerChoices={getAnswerChoices}
          stackCorrectAnswerHelper={stackCorrectAnswerHelper}
        />
      </div>          
    )
  }
}

const mapStateToProps = (state) => ({
  isAnswerSelected:  state.quizInstance.isAnswerSelected,
  isAnswerSubmitted:  state.quizInstance.isAnswerSubmitted,
  isAnswerCorrect:  state.quizInstance.isAnswerCorrect,
  isClueUsed:  state.quizInstance.isClueUsed,
  isQuizComplete:  state.quizInstance.isQuizComplete,
  userAnswer:  state.quizInstance.userAnswer,
  shuffledQuizStack:  state.quizInstance.shuffledQuizStack,
  answerChoices:  state.quizInstance.answerChoices,
  correctAnswerStack:  state.quizInstance.correctAnswerStack,
  currentMon: getCurrentMon(state),
  quizLength: getQuizLength(state),
});

const mapDispatchToProps = (dispatch) => ({
  setAnswer:            (event, value) => dispatch(setAnswer(event, value)),
  reset:                () => dispatch(reset()),
  submitAnswer:         () => dispatch(submitAnswer()),
  setNextQuestion:      (arrObj, answerChoices) => dispatch(setNextQuestion(arrObj, answerChoices)),
  setQuizCompleteFlag:  () => dispatch(setQuizCompleteFlag()),
  setAnswerCorrectFlag: () => dispatch(setAnswerCorrectFlag()),
  stackCorrectAnswer:   (arrObj) => dispatch(stackCorrectAnswer(arrObj)),
  endTimer:             () => dispatch(endTimer()),
  endCurrentQuiz:       (userInitials) => dispatch(endCurrentQuiz(userInitials)),
  resetThenHome:        () => dispatch(resetThenHome()),
  useClue:              () => dispatch(useClue()),
});

Quiz.propTypes = {
  reset: PropTypes.func,
  setAnswer: PropTypes.func,
  submitAnswer: PropTypes.func,
  setNextQuestion: PropTypes.func,
  useClue: PropTypes.func,
  endTimer: PropTypes.func,
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
