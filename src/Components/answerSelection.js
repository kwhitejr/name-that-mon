import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

class AnswerSelection extends Component {

  render() {

    return (
      <div>
        <RaisedButton label="Squirtle" primary={true} style={style} />
        <RaisedButton label="Bulbasaur" primary={true} style={style} />
        <RaisedButton label="Charizard" primary={true} style={style} />
        <RaisedButton label="Pikachu" primary={true} style={style} />
      </div>
    );
  }
}

export default AnswerSelection;