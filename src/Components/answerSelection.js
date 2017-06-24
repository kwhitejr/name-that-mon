import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { shuffle } from '../common'

// Mock Data
import mockData from '../mockData'

// For simple styles, no need for separate CSS file
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
      answerChoices: this.shuffle(this.getAnswerChoices(this.props.shuffledData))
    }
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  shuffle(array, rng) {
    let i = array.length, j, swap;
      if (!rng) rng = Math;
    while (--i) {
      j = rng.random() * (i + 1) | 0;
      swap = array[i];
      array[i] = array[j];
      array[j] = swap;
    }
    return array;
  }

  getAnswerChoices(shuffledData) {
    let answerChoices = [];

    // insert correct answer
    const currentMon = shuffledData[shuffledData.length-1];
    answerChoices.push(currentMon);

    // add three bogus answers
    const remainingMon = shuffledData.slice(0,shuffledData.length-1);
    const pickThree = remainingMon.slice(0,3);
    pickThree.forEach( (obj) => {
      answerChoices.push(obj);
    });

    return answerChoices;
  }

  checkAnswer() {
    const { toggleMask, answerIsSelected, userAnswer, shuffledData } = this.props
    const currentMon = shuffledData[shuffledData.length-1].index

    if (answerIsSelected && currentMon == userAnswer) {
      toggleMask()
    } else {
      console.log("Nope!")
    }
  }

  render() {
    const { setAnswer, answerIsSelected, userAnswer, shuffledData } = this.props
    const { answerChoices } = this.state
    console.log(answerChoices)

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
          primary={true}
          style={styles.raisedButton}
          onTouchTap={this.checkAnswer}
        />
        <RaisedButton 
          label="Next"
          secondary={true}
          style={styles.raisedButton}
          onTouchTap={this.getAnswerChoices.bind(this, shuffledData)}
        />
      </div>
    );
  }
}

export default AnswerSelection;
