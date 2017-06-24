import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import RaisedButton from 'material-ui/RaisedButton';

import { getQuizData } from '../../actions/quizActions';
import GenerationChoice from '../../Components/GenerationChoice';
import logo from '../../logo.svg';
import './Home.css';

const styles = {
  raisedButton: {
    margin: 6,
  },
}

class Home extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Name That Mon!</h2>
        </div>
        <GenerationChoice {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  getQuizData:  () => dispatch(getQuizData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
