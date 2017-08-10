import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
  resetThenHome, 
  resetThenRestart, 
} from './ResultActions';

import { 
  getLastCorrectAnswer,
  getQuizTotalTime,
} from './ResultSelectors'

import { 
  getCurrentMon,
} from '../Quiz/QuizSelectors'

import ResultTable from './ResultTable'
import ResultNext from './ResultNext'
import ResultTop from './ResultTop'

import './Result.css';

export class Result extends Component {

  render() {
    return (      
      <div className="App">
        <ResultTop 
          {...this.props}
        />
        <ResultTable
          {...this.props} 
        />
        <ResultNext 
          {...this.props} 
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  correctAnswerStack:  state.quizInstance.correctAnswerStack,
  shuffledQuizStack:  state.quizInstance.shuffledQuizStack,
  lastCorrectAnswer: getLastCorrectAnswer(state),
  wrongAnswer: getCurrentMon(state),
  quizTotalTime: getQuizTotalTime(state),
});

const mapDispatchToProps = (dispatch) => ({
  resetThenHome: () => dispatch(resetThenHome()),
  resetThenRestart: () => dispatch(resetThenRestart()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Result);
