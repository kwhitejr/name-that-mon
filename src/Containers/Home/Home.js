import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import GenerationChoice from '../../Components/GenerationChoice';

import questionMark from '../../assets/pokemon/0.png';
import './Home.css';

import { getQuizData } from '../../actions/quizActions';

class Home extends Component {
  render() {
    return (
      <Grid fluid>
        <Row center="xs">
          <Col xs={12} sm={6} smOffset={1} md={4} mdOffset={1} lg={3} lgOffset={2}>
            <div className="App">
              <div className="App-header">
                <img src={questionMark} className="App-logo" alt="logo" />
                <h2>Read to Start?</h2>
              </div>
              <GenerationChoice {...this.props} />
            </div>
          </Col>
          <Col sm={4} md={3} lg={2}>
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
