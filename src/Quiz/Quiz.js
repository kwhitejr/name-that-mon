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
  useClue:              () => dispatch(useClue()),
  incrementClueCount:   () => dispatch(incrementClueCount()),
  endQuiz:              () => dispatch(endQuiz()),
  moveToResults:        () => dispatch(moveToResults()),
});

Quiz.propTypes = {
  reset: PropTypes.func,
  resetThenHome: PropTypes.func,
  setSelectedAnswer: PropTypes.func,
  setNextQuestion: PropTypes.func,
  setUserInitials: PropTypes.func,
  useClue: PropTypes.func,
  incrementClueCount: PropTypes.func,
  endQuiz: PropTypes.func,
  moveToResults: PropTypes.func,
  isClueUsed: PropTypes.bool,
  isQuizComplete: PropTypes.bool,
  userAnswer: PropTypes.number,
  questionStack: PropTypes.array,
  answerStack: PropTypes.array,
  answerChoices: PropTypes.array,
  currentMon: PropTypes.object,
  quizLength: PropTypes.number,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quiz);
