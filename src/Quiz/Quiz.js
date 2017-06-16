import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import AnswerSelection from '../Components/answerSelection'

import pokemon from '../assets/pokemon/1.png';
import './Quiz.css';

class Quiz extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={pokemon} className="mask" alt="logo" />
          <h2>Who is this?</h2>
        </div>
        <AnswerSelection />
        <button>Submit</button>
        <Link to="/">Cancel</Link>
      </div>
    );
  }
}

export default Quiz;