import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col } from 'react-flexbox-grid';

// For simple styles, no need for separate CSS file
const styles = {
  raisedButton: {
    margin: 6,
  },
  radioButton: {
    marginBottom: 16,
  },
};

const GenerationChoice = ({ getQuizData }) => (
  <Grid>
    <Row>
      <Col xs={12}>
        <RaisedButton 
          label="Generation 1"
          primary={true}
          style={styles.raisedButton}
          onTouchTap={getQuizData}
        />
        <RaisedButton 
          label="Generation 2"
          disabled={true}
          style={styles.raisedButton}
          onTouchTap={getQuizData}
        />
        <RaisedButton 
          label="Generation 3"
          disabled={true}
          style={styles.raisedButton}
          onTouchTap={getQuizData}
        />
      </Col>
    </Row>
  </Grid>
)

export default GenerationChoice;
