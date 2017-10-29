import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; 

import HomeQuizList from './HomeQuizList';
import HomeTop from './HomeTop';

import './Home.css';

import { 
  fetchQuizData
} from '../Quiz/QuizActions';

export class Home extends Component {

  render() {
    return (
      <div className="view-container">
        <HomeTop />
        <HomeQuizList {...this.props} />
      </div>    
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  fetchQuizData:  (quizType, quizSet) => dispatch(fetchQuizData(quizType, quizSet)),
});

Home.propTypes = {
  fetchQuizData: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
