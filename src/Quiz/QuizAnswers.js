import React, { Component } from 'react';
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

class AnswerSelection extends Component {
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

export default AnswerSelection;
