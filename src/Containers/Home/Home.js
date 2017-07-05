import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import GenerationChoice from '../../Components/GenerationChoice';

import logo from '../../logo.svg';
import './Home.css';

import { getQuizData } from '../../actions/quizActions';

class Home extends Component {
  render() {
    return (
      <Grid fluid>
        <Row center="xs">
          <Col xs={12} sm={6} smOffset={1}>
            <div className="App">
              <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Name That Mon!</h2>
              </div>
              <GenerationChoice {...this.props} />
            </div>
          </Col>
          <Col sm={4}>
            <p>This is the stat bar</p>
          </Col>
        </Row>
      </Grid>
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
