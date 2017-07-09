import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';


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
    if (this.props.shuffledQuizStack === null) {
      resetThenHome()
    }
  }

  render() {
    const { correctAnswerStack, shuffledQuizStack } = this.props

    const lastCorrectAnswer = correctAnswerStack.length > 0 ? correctAnswerStack[correctAnswerStack.length-1].name : 'None'
    const endedOn = shuffledQuizStack.length > 0 ? shuffledQuizStack[shuffledQuizStack.length-1].name : lastCorrectAnswer

    return (
      <Grid fluid>
        <Row center="xs">
          <Col xs={12} sm={6} smOffset={1} md={4} mdOffset={1} lg={3} lgOffset={2}>
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
  correctAnswerStack:  state.quizReducer.correctAnswerStack,
  shuffledQuizStack:  state.quizReducer.shuffledQuizStack,
});

const mapDispatchToProps = (dispatch) => ({
  resetThenHome: () => dispatch(resetThenHome()),
  resetThenRestart: () => dispatch(resetThenRestart()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Result);
