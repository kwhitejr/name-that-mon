import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import GenerationChoice from './HomeGenerationChoice'

// For simple styles, no need for separate CSS file
const styles = {
  raisedButton: {
    margin: 6,
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
    // } else if (this.state.quizType === 'type') {
    //   return (
    //     <TypeChoice {...this.props} />
    //   );
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
      <div>
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
      style={styles.raisedButton}
      onTouchTap={handleQuizGeneration}
      // onClick={(event) => getQuizData(event)}
    />
    <RaisedButton 
      label="Types"
      primary={true}
      style={styles.raisedButton}
      onTouchTap={handleQuizType}
    />
    <RaisedButton 
      label="Legendaries"
      primary={true}
      style={styles.raisedButton}
      onTouchTap={getLegendaryData}
    />
  </div>
)