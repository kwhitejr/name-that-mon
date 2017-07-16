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

const HomeQuizTypes = ({ handleQuizGeneration, handleQuizType, beginLegendaryQuiz }) => (
  <div>
    <RaisedButton 
      label="Generations"
      primary={true}
      style={styles.raisedButton.generation}
      onTouchTap={handleQuizGeneration}
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
      onTouchTap={beginLegendaryQuiz}
    />
  </div>
)

const pokemonGenerations = [1,2,3,4,5,6,7]

const GenerationChoice = ({ beginGenerationQuiz }) => (
  <div>
    {pokemonGenerations.map( (generationNumber, i) => (
      <RaisedButton
        key={i}
        primary={true}
        label={`Generation ${generationNumber}`}
        style={styles.raisedButton.generation}
        onTouchTap={beginGenerationQuiz.bind(generationNumber)}
      />
    ))}
    <RaisedButton
      secondary={true}
      label="Back"
      style={styles.raisedButton.generation}
    />
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

const TypeChoice = ({ beginPokemonTypeQuiz }) => (
  <div>
    {pokemonTypes.map( (pokemonType, i) => (
      <RaisedButton
        key={i}
        primary={true}
        label={pokemonType}
        style={styles.raisedButton.type}
        onTouchTap={beginPokemonTypeQuiz.bind(pokemonType)}
      />
    ))}
    <RaisedButton
      secondary={true}
      label="Back"
      style={styles.raisedButton.type}
    />
  </div>
)