import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; 

import { 
  reset,
  setSelectedAnswer,
  setNextQuestion,
  setUserInitials,
  useClue,
  incrementClueCount,
  endQuiz,
  moveToResults,
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

// const stackCorrectAnswerHelper = (questionStack, answerStack) => {
//   const lastDatum = questionStack[questionStack.length-1]
//   answerStack.push(lastDatum)

//   const newObj = {
//     questionStack: questionStack.slice(0,-1) || [],
//     answerStack: answerStack,
//   };
//   return newObj;
// }

export class Quiz extends Component {

  componentWillMount() {
    // TODO: refactor this away
    const { resetThenHome } = this.props
    if (!this.props.questionStack || !this.props.currentMon) {
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
          // getAnswerChoices={getAnswerChoices}
          // stackCorrectAnswerHelper={stackCorrectAnswerHelper}
        />
      </div>          
    )
  }
}

const mapStateToProps = (state) => ({
  isClueUsed:         state.quizInstance.isClueUsed,
  isQuizComplete:     state.quizInstance.isQuizComplete,
  userAnswer:         state.quizInstance.userAnswer,
  questionStack:      state.quizInstance.questionStack,
  answerStack:        state.quizInstance.answerStack,
  answerChoices:      getAnswerChoices(state),
  currentMon:         getCurrentMon(state),
  quizLength:         getQuizLength(state),
});

const mapDispatchToProps = (dispatch) => ({
  reset:                () => dispatch(reset()),
  resetThenHome:        () => dispatch(resetThenHome()),
  setSelectedAnswer:    (value) => dispatch(setSelectedAnswer(value)),
  setNextQuestion:      () => dispatch(setNextQuestion()),
  setUserInitials:      (userInitials) => dispatch(setUserInitials(userInitials)),
  incrementClueCount:   () => dispatch(incrementClueCount()),
  endQuiz:              () => dispatch(endQuiz()),
  moveToResults:        () => dispatch(moveToResults()),
});

// Quiz.propTypes = {
//   reset: PropTypes.func,
//   setSelectedAnswer: PropTypes.func,
//   submitAnswer: PropTypes.func,
//   setNextQuestion: PropTypes.func,
//   useClue: PropTypes.func,
//   endTimer: PropTypes.func,
//   endCurrentQuiz: PropTypes.func,
//   isAnswerSelected: PropTypes.bool,
//   isAnswerSubmitted: PropTypes.bool,
//   isClueUsed: PropTypes.bool,
//   currentMon: PropTypes.object,
// };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quiz);
