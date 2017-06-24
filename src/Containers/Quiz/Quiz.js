import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { setAnswer, reset, getQuizData, getNextMon } from '../../actions/quizActions';

import QuizMon from '../../Components/QuizMon';
import AnswerSelection from '../../Components/AnswerSelection';

import './Quiz.css';

const toggleMask = () => {
  let pokemon = document.getElementById("target-mon");
  pokemon.classList.toggle('mask');
}

class Quiz extends Component {

  constructor(props) {
    super(props);

    const { shuffledData } = this.props
    this.state = {
      currentMon: shuffledData[shuffledData.length-1]
    }
  }

  componentDidMount() {
  }

  checkAnswer(selected, answer, correctAnswer) {
    if (selected && correctAnswer === answer) {
      toggleMask()
    } else {
      console.log("Nope!")
    }
  }

  render() {

    return (<div>
      <Grid fluid>
        <Row>
          <Col xsOffset={3} xs={12}>      
            <QuizMon
              {...this.props}
              currentMon={this.state.currentMon} 
            />
          </Col> 
        <Row>
        </Row>
          <Col xs={12}>          
            <AnswerSelection 
              {...this.props}
              currentMon={this.state.currentMon}
              toggleMask={this.toggleMask}
              checkAnswer={this.checkAnswer}
            />
          </Col>
        </Row>
      </Grid>
    </div>)
  }
}

const mapStateToProps = (state) => ({
  answerIsSelected:  state.quizReducer.answerIsSelected,
  userAnswer:  state.quizReducer.userAnswer,
  shuffledData:  state.quizReducer.shuffledData,
});

const mapDispatchToProps = (dispatch) => ({
  setAnswer:    (event, value) => dispatch(setAnswer(event, value)),
  getQuizData:  () => dispatch(getQuizData()),
  reset:        () => dispatch(reset()),
  getNextMon:   () => dispatch(getNextMon()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quiz);