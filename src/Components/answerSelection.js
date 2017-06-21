import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import injectTapEventPlugin from 'react-tap-event-plugin';
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

// Mock Data
const pokeData = [
  { index: 1, name: "Bulbasaur", },
  { index: 4, name: "Charizard", },
  { index: 7, name: "Squirtle", },
  { index: 25, name: "Pikachu", },
]

class AnswerSelection extends Component {

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