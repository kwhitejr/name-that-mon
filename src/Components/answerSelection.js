import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

const styles = {
  raisedButton: {
    margin: 6,
  },
  radioButton: {
    marginBottom: 16,
  },
};

class AnswerSelection extends Component {

  checkAnswer() {
    const {
      // redux state 
      isAnswerSelected, 
      userAnswer, 
      currentMon,
      // actions 
      submitAnswer, 
      toggleMask, 
      goToResults, 
    } = this.props

    if (isAnswerSelected && currentMon.index === userAnswer) {
      toggleMask()
      submitAnswer()
    } else {
      goToResults()
    }
  }

  render() {
    const { 
      setAnswer, 
      isAnswerSelected, 
      isAnswerSubmitted, 
      setNextQuestion, 
      answerChoices, 
    } = this.props

    return (
      <div className="answers">
        <RadioButtonGroup name="answers" onChange={setAnswer} >
          {answerChoices.map( (datum, i) => (
            <RadioButton
              key={i}
              value={datum.index}
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
      </div>
    );
  }
}

export default AnswerSelection;
