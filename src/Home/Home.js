import React, { Component } from 'react';
import { connect } from 'react-redux';

import HomeQuizList from './HomeQuizList';
import HomeTop from './HomeTop';

import './Home.css';

import { 
  beginGenerationQuiz, 
  beginPokemonTypeQuiz, 
  beginLegendaryQuiz
} from '../Quiz/QuizActions';

export class Home extends Component {

  render() {
    return (
      <div>
        <HomeTop />
        <HomeQuizList {...this.props} />
      </div>    
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  beginGenerationQuiz:  (generationNumber) => dispatch(beginGenerationQuiz(generationNumber)),
  beginPokemonTypeQuiz:  (pokemonType) => dispatch(beginPokemonTypeQuiz(pokemonType)),
  beginLegendaryQuiz:  () => dispatch(beginLegendaryQuiz()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

/*
<div className="App-header">
                <img src={questionMark} className="App-logo" alt="logo" />
                <h2>Read to Start?</h2>
                <p>Pick a Quiz.</p>
              </div>
              */
