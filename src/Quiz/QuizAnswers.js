import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

const styles = {
  raisedButton: {
    margin: 6,
  },
  radioButton: {
    label: {
      "fontSmooth": "never",
      "WebkitFontSmoothing": "none",
      "fontFamily": "'pokemon-font', monospace", 
      "fontSize": "20px",
    },
    style: {
      marginTop: 10,
      marginBottom: 10,
    },
  }
};

class QuizAnswers extends Component {
  state = {
    dialogOpen: false,
    initialsValue: "",
  };

  handleOpen = () => {
    this.setState({dialogOpen: true});
  };

  handleClose = () => {
    this.setState({dialogOpen: false});
  };

  handleChange = (event) => {
    this.setState({
      initialsValue: event.target.value.toUpperCase(),
    });
  };

  checkAnswer() {
    const {
      isAnswerSelected,
      userAnswer, 
      currentMon,
      submitAnswer, 
      toggleMask,
      endTimer, 
    } = this.props

    if (isAnswerSelected && currentMon.id === userAnswer) {
      toggleMask()
      submitAnswer()
    } else {
      endTimer()
      this.handleOpen()
    }
  }

  render() {
    const { 
      setAnswer, 
      isAnswerSelected, 
      isAnswerSubmitted, 
      setNextQuestion, 
      answerChoices,
      endCurrentQuiz, 
    } = this.props

    const actions = [
      <FlatButton
        label="Continue"
        primary={true}
        onTouchTap={() => {endCurrentQuiz(this.state.initialsValue)}}
      />,
    ];

    return (
      <div className="answers">
        <RadioButtonGroup name="answers" onChange={setAnswer} >
          {answerChoices.map( (datum, i) => (
            <RadioButton
              key={i}
              value={datum.id}
              label={datum.name}
              style={styles.radioButton.style}
              labelStyle={styles.radioButton.label}
            />
          ))}
        </RadioButtonGroup>
        <RaisedButton 
          label="Submit"
          primary={isAnswerSelected}
          disabled={!isAnswerSelected}
          style={styles.raisedButton}
          onTouchTap={this.checkAnswer.bind(this)}
        />
        <RaisedButton 
          label="Next"
          secondary={isAnswerSubmitted}
          disabled={!isAnswerSubmitted}
          style={styles.raisedButton}
          onTouchTap={setNextQuestion}
        />
        <Dialog
          title="Oh Noes!"
          actions={actions}
          modal={true}
          open={this.state.dialogOpen}
        >
          Game Over, Mon.
          <div>
            <TextField
              id="text-field-controlled"
              hintText="Inititals"
              maxLength="3"
              value={this.state.initialsValue}
              onChange={this.handleChange}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

QuizAnswers.propTypes = {
  reset: PropTypes.func,
  setAnswer: PropTypes.func,
  setNextQuestion: PropTypes.func,
  useClue: PropTypes.func,
  endCurrentQuiz: PropTypes.func,
  toggleMask: PropTypes.func,
  isAnswerSelected: PropTypes.bool,
  isAnswerSubmitted: PropTypes.bool,
  isClueUsed: PropTypes.bool,
  userAnswer: PropTypes.number,
  currentMon: PropTypes.object,
  answerChoices: PropTypes.array,
};

export default QuizAnswers;

/*
class TextFieldInitials extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <TextField
          id="text-field-controlled"
          hintText="Inititals"
          maxLength="4"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
*/
