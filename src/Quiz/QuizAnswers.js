import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

const styles = {
  raisedButton: {
    margin: 6,
  },
  radioButton: {
    marginBottom: 16,
  },
};

class QuizAnswers extends Component {
  state = {
    dialogOpen: false,
  };

  handleOpen = () => {
    this.setState({dialogOpen: true});
  };

  handleClose = () => {
    this.setState({dialogOpen: false});
  };

  checkAnswer() {
    const {
      // redux state 
      isAnswerSelected,
      userAnswer, 
      currentMon,
      // actions 
      submitAnswer, 
      toggleMask, 
      // endCurrentQuiz, 
    } = this.props

    if (isAnswerSelected && currentMon.id === userAnswer) {
      toggleMask()
      submitAnswer()
    } else {
      this.handleOpen()
    }
  }

  render() {
    const { 
      setAnswer, 
      isAnswerSelected, 
      isAnswerSubmitted, 
      setNextQuestion, 
      answerChoices,
      endCurrentQuiz, 
    } = this.props

    const actions = [
      <FlatButton
        label="Continue"
        primary={true}
        onTouchTap={endCurrentQuiz}
      />,
    ];

    return (
      <div className="answers">
        <RadioButtonGroup name="answers" onChange={setAnswer} >
          {answerChoices.map( (datum, i) => (
            <RadioButton
              key={i}
              value={datum.id}
              label={datum.name}
              style={styles.radioButton}
            />
          ))}
        </RadioButtonGroup>
        <RaisedButton 
          label="Submit"
          primary={isAnswerSelected}
          disabled={!isAnswerSelected}
          style={styles.raisedButton}
          onTouchTap={this.checkAnswer.bind(this)}
        />
        <RaisedButton 
          label="Next"
          secondary={isAnswerSubmitted}
          disabled={!isAnswerSubmitted}
          style={styles.raisedButton}
          onTouchTap={setNextQuestion}
        />
        <Dialog
          title="Oh Noes!"
          actions={actions}
          modal={true}
          open={this.state.dialogOpen}
        >
          Game Over, Mon.
        </Dialog>
      </div>
    );
  }
}

QuizAnswers.propTypes = {
  reset: PropTypes.func,
  setAnswer: PropTypes.func,
  setNextQuestion: PropTypes.func,
  useClue: PropTypes.func,
  endCurrentQuiz: PropTypes.func,
  toggleMask: PropTypes.func,
  isAnswerSelected: PropTypes.bool,
  isAnswerSubmitted: PropTypes.bool,
  isClueUsed: PropTypes.bool,
  userAnswer: PropTypes.number,
  currentMon: PropTypes.object,
  answerChoices: PropTypes.array,
};

export default QuizAnswers;
