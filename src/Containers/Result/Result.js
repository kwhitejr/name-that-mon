import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Result.css';

class Result extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Mon, you are done!</h2>
        </div>
        <Link to="/quiz">Start Again</Link>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default Result;
