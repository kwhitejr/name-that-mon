import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { Grid, Row, Col } from 'react-flexbox-grid';

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

let pokeData

const shuffle = (array, rng) => {
  var i = array.length, j, swap;
    if (!rng) rng = Math;
  while (--i) {
    j = rng.random() * (i + 1) | 0;
    swap = array[i];
    array[i] = array[j];
    array[j] = swap;
  }
  return array;
}

class AnswerSelection extends Component {

  componentWillMount() {
    // const { getQuizData } = this.props
    // getQuizData()
  }

  // componentDidMount() {
  //   const { shuffledData } = this.props
  //   this.getAnswerSelections(shuffledData)
  // }

  getAnswerSelections(shuffledData) {
    const currentMon = shuffledData[shuffledData.length-1]
    const remainingMon = shuffledData.slice(0,shuffledData.length-1)
    const pickThree = shuffle(remainingMon).slice(0,3)
    const answerSelections = currentMon.concat(remainingMon)
    const shuffledAnswerSelections = shuffle(answerSelections)

    return shuffledAnswerSelections
  }

  checkAnswer(selected, answer, shuffledData) {
    const { toggleMask } = this.props
    const currentMon = shuffledData[shuffledData.length-1].index

    if (selected && currentMon == answer) {
      toggleMask()
    } else {
      console.log("Nope!")
    }
  }

  render() {
    const { setAnswer, selected, answer, shuffledData } = this.props
  
    let answerSelections 
    if (shuffledData) {
      answerSelections = this.getAnswerSelections(shuffledData)
    } else {
      answerSelections = [{index:0, name:"There"},{index:0, name:"There"},{index:0, name:"There"},{index:0, name:"There"}]
    }
    // console.log(answerSelections)

    return (
      <div>
        <RadioButtonGroup name="answers" onChange={setAnswer} >
          {answerSelections.map( (datum, i) => (
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
          onTouchTap={this.checkAnswer.bind(this, selected, answer, shuffledData)}
        />
        <RaisedButton 
          label="Next"
          secondary={true}
          style={styles.raisedButton}
          onTouchTap={this.getAnswerSelections.bind(this, shuffledData)}
        />
      </div>
    );
  }
}

export default AnswerSelection;
