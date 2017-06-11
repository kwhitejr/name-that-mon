import React, { Component } from 'react';
import logo from './logo.svg';
import './Quiz.css';

class Quiz extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Who is this?</h2>
        </div>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
        <button>Submit</button>
      </div>
    );
  }
}

export default Quiz;