import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

// For simple styles, no need for separate CSS file
const styles = {
  raisedButton: {
    generation: {
      margin: 6,
    },
    type: {
      margin: 6,
      height: 20,
    },
  },
  radioButton: {
    marginBottom: 16,
  },
};

class HomeQuizChoice extends Component {

  state = {
    quizType: null
  }

  handleQuizGeneration = () => {
    this.setState({quizType: 'generation'});
  }

  handleQuizType = () => {
    this.setState({quizType: 'type'});
  }

  selectQuizType() {
    if (this.state.quizType === 'generation') {
      return (
        <GenerationChoice {...this.props} />
      );
    } else if (this.state.quizType === 'type') {
      return (
        <TypeChoice {...this.props} />
      );
    } else {
      return (
        <HomeQuizTypes
          handleQuizGeneration={this.handleQuizGeneration} 
          handleQuizType={this.handleQuizType} 
          {...this.props} 
        />
      );
    }
  }

  render() {
    return (
      <div className="quiz-select">
        { this.selectQuizType() }
      </div>
    )
  }
}

export default HomeQuizChoice;

// { getLegendaryData }

const HomeQuizTypes = ({ handleQuizGeneration, handleQuizType, getLegendaryData }) => (
  <div>
    <RaisedButton 
      label="Generations"
      primary={true}
      style={styles.raisedButton.generation}
      onTouchTap={handleQuizGeneration}
      // onClick={(event) => getQuizData(event)}
    />
    <RaisedButton 
      label="Types"
      primary={true}
      style={styles.raisedButton.generation}
      onTouchTap={handleQuizType}
    />
    <RaisedButton 
      label="Legendaries"
      primary={true}
      style={styles.raisedButton.generation}
      onTouchTap={getLegendaryData}
    />
  </div>
)

const pokemonGenerations = [1,2,3,4,5,6,7]

const GenerationChoice = ({ getQuizData }) => (
  <div>
    {pokemonGenerations.map( (generation, i) => (
      <RaisedButton
        key={i}
        primary={true}
        label={`Generation ${generation}`}
        style={styles.radioButton.generation}
      />
    ))}
  </div>
)

const pokemonTypes = [
  "Normal",
  "Bug",
  "Dark",
  "Dragon",
  "Electric",
  "Fairy",
  "Fighting",
  "Fire",
  "Flying",
  "Ghost",
  "Grass",
  "Ground",
  "Ice",
  "Poison",
  "Psychic",
  "Rock",
  "Steel",
  "Water",
]

const TypeChoice = ({ getTypeData }) => (
  <div>
    {pokemonTypes.map( (type, i) => (
      <RaisedButton
        key={i}
        primary={true}
        label={type}
        style={styles.radioButton.type}
      />
    ))}
  </div>
)