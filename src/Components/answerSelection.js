import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { shuffle } from '../common'

// Mock Data
import mockData from '../mockData'

const styles = {
  raisedButton: {
    margin: 6,
  },
  radioButton: {
    marginBottom: 16,
  },
};

class AnswerSelection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      answerChoices: shuffle(this.getAnswerChoices(this.props.shuffledData))
    }
  }

  getAnswerChoices(shuffledData) {
    let answerChoices = [];

    // insert correct answer
    const { currentMon } = this.props;
    answerChoices.push(currentMon);

    // add three bogus answers
    const remainingMon = shuffledData.slice(0,shuffledData.length-1);
    const pickThree = remainingMon.slice(0,3);
    pickThree.forEach( (obj) => {
      answerChoices.push(obj);
    });

    var dup_array = answerChoices.slice();
    shuffle(dup_array);

    return answerChoices;
  }

  checkAnswer() {
    const { toggleMask, isAnswerSelected, userAnswer, shuffledData, currentMon, submitAnswer } = this.props

    if (isAnswerSelected && currentMon.index == userAnswer) {
      toggleMask()
      submitAnswer()
    } else {
      console.log("Nope!")
    }
  }

  render() {
    const { setAnswer, isAnswerSelected, isAnswerSubmitted, userAnswer, shuffledData, loadNextMon } = this.props
    const { answerChoices } = this.state

    return (
      <div>
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
          onTouchTap={loadNextMon}
        />
      </div>
    );
  }
}

export default AnswerSelection;
