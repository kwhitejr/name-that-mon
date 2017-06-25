import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { setAnswer, reset, getQuizData, loadNextMon, submitAnswer } from '../../actions/quizActions';

import QuizMon from '../../Components/quizMon';
import AnswerSelection from '../../Components/answerSelection';

import './Quiz.css';

const toggleMask = () => {
  let pokemon = document.getElementById("target-mon");
  pokemon.classList.toggle('mask');
}

class Quiz extends Component {

  // constructor(props) {
  //   super(props);

  //   const { shuffledData } = this.props
  //   this.state = {
  //     currentMon: shuffledData[shuffledData.length-1]
  //   }
  // }

  render() {
    const { shuffledData } = this.props
    const currentMon = shuffledData[shuffledData.length-1]

    return (<div>
      <Grid fluid>
        <Row>
          <Col xsOffset={3} xs={12}>      
            <QuizMon
              {...this.props}
              currentMon={currentMon} 
            />
          </Col> 
        <Row>
        </Row>
          <Col xs={12}>          
            <AnswerSelection 
              {...this.props}
              currentMon={currentMon}
              toggleMask={toggleMask}
            />
          </Col>
        </Row>
      </Grid>
    </div>)
  }
}

const mapStateToProps = (state) => ({
  isAnswerSelected:  state.quizReducer.isAnswerSelected,
  isAnswerSubmitted:  state.quizReducer.isAnswerSubmitted,
  userAnswer:  state.quizReducer.userAnswer,
  shuffledData:  state.quizReducer.shuffledData,
});

const mapDispatchToProps = (dispatch) => ({
  setAnswer:    (event, value) => dispatch(setAnswer(event, value)),
  getQuizData:  () => dispatch(getQuizData()),
  reset:        () => dispatch(reset()),
  submitAnswer: () => dispatch(submitAnswer()),
  loadNextMon:  () => dispatch(loadNextMon()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quiz);
