import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col } from 'react-flexbox-grid';

// For simple styles, no need for separate CSS file
const style = {
  margin: 6,
};

class AnswerSelection extends Component {

  render() {

    return (
      <Grid fluid>
        <Row>
          <Col xs={12} sm={6} >
            <RaisedButton label="Squirtle" primary={true} style={style} fullWidth={true} />
          </Col>
          <Col xs={12} sm={6} >
            <RaisedButton label="Bulbasaur" primary={true} style={style} fullWidth={true} />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} >
            <RaisedButton label="Charizard" primary={true} style={style} fullWidth={true} />
          </Col>
          <Col xs={12} sm={6} >
            <RaisedButton label="Pikachu" primary={true} style={style} fullWidth={true} />
          </Col>
        </Row>
        <Row>
          <Col xs={12} >
            <RaisedButton label="Submit" secondary={true} style={style} fullWidth={true} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default AnswerSelection;