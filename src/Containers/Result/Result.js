import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'

import { 
  resetThenHome, 
  resetThenRestart 
} from '../../actions/resultActions';

import ResultsTable from '../../Components/ResultsTable'
import ResultsActions from '../../Components/ResultsActions'

import './Result.css';

// assets
import mark from '../../assets/pokemon/0.png';


class Result extends Component {

  componentWillMount() {
    const { resetThenHome } = this.props
    if (this.props.shuffledData === null) {
      resetThenHome()
    }
  }

  render() {
    const { correctAnswerStack, shuffledData } = this.props

    const lastCorrectAnswer = correctAnswerStack.length > 0 ? correctAnswerStack[correctAnswerStack.length-1].name : 'None'
    const endedOn = shuffledData.length > 0 ? shuffledData[shuffledData.length-1].name : lastCorrectAnswer

    return (
      <div className="App">
        <div className="App-header">
          <img src={mark} className="App-logo" alt="logo" />
          <h2>Mon, you are done!</h2>
          <ResultsTable
            lastCorrectAnswer={lastCorrectAnswer} 
            endedOn={endedOn} 
            {...this.props} 
          />
          <ResultsActions {...this.props} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  correctAnswerStack:  state.quizReducer.correctAnswerStack,
  shuffledData:  state.quizReducer.shuffledData,
});

const mapDispatchToProps = (dispatch) => ({
  resetThenHome: () => dispatch(resetThenHome()),
  resetThenRestart: () => dispatch(resetThenRestart()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Result);
