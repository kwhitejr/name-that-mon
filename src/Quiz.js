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
        <p className="App-intro">
          To get started, <code>Press Here</code> and name those Mon.
        </p>
      </div>
    );
  }
}

export default Quiz;