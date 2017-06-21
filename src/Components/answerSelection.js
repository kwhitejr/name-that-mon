import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Mock Data
import mockData from '../mockData'

injectTapEventPlugin();

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

const getPokeData = (mockData) => {
  let shuffledPokeData = shuffle(mockData)
  pokeData = shuffledPokeData.slice(0,4)
  console.log(pokeData)
}

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
    getPokeData(mockData)
  }

  render() {
    const { checkAnswer, setAnswer, selected, answer, correctAnswer } = this.props

    return (
      <div>
        <RadioButtonGroup name="answers" onChange={setAnswer} >
          {pokeData.map( (datum, i) => (
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
          onTouchTap={checkAnswer.bind(this, selected, answer, correctAnswer)}
        />
      </div>
    );
  }
}

export default AnswerSelection;