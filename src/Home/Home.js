import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';

import HomeQuizList from './HomeQuizList';
import HomeTop from './HomeTop';

import Stats from '../Stats/Stats'

import questionMark from '../assets/pokemon/0.png';
import './Home.css';

import { 
  beginGenerationQuiz, 
  beginPokemonTypeQuiz, 
  beginLegendaryQuiz
} from '../Quiz/QuizActions';

export class Home extends Component {

  render() {
    return (
      <Grid fluid>
        <Row center="xs">
          <Col xs={12} sm={6} smOffset={1} md={4} mdOffset={1} lg={3} lgOffset={2}>
            <div className="App">
              <HomeTop />
              <HomeQuizList {...this.props} />
            </div>
          </Col>
          <Col sm={4} md={3} lg={2}>
            <Stats />
          </Col>
        </Row>
      </Grid>
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
