import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';

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

class Result extends Component {

  componentWillMount() {
    const { resetThenHome } = this.props
    if (!this.props.shuffledQuizStack || !this.props.endedOn) {
      resetThenHome()
    }
  }

  render() {
    console.log(this.props.quizTotalTime)
    // const { correctAnswerStack, shuffledQuizStack } = this.props

    // const lastCorrectAnswer = correctAnswerStack.length > 0 ? correctAnswerStack[correctAnswerStack.length-1] : 'None'
    // const endedOn = shuffledQuizStack.length > 0 ? shuffledQuizStack[shuffledQuizStack.length-1] : lastCorrectAnswer

    // const imgUrl = require(`../assets/pokemon/${endedOn.id}.png`)

    return (
      <Grid fluid>
        <Row center="xs">
          <Col xs={12} sm={6} smOffset={1} md={4} mdOffset={1} lg={3} lgOffset={2}>
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
          </Col>
          <Col sm={4} md={3} lg={2}>
            <p>This is the stat bar</p>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  correctAnswerStack:  state.quizInstance.correctAnswerStack,
  shuffledQuizStack:  state.quizInstance.shuffledQuizStack,
  lastCorrectAnswer: getLastCorrectAnswer(state),
  endedOn: getCurrentMon(state),
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
