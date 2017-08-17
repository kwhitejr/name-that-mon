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
  },
  radioButtonGroup: {
    marginLeft: "25px",
  },
  dialog: {
    "fontSmooth": "never",
    "WebkitFontSmoothing": "none",
    "fontFamily": "'pokemon-font', monospace", 
    "fontSize": "20px",
  }
};

// let Pokeball = require("../assets/pokeball.ico")

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
      shuffledQuizStack,
      submitAnswer,
      setQuizCompleteFlag, 
      setAnswerCorrectFlag, 
      toggleMask,
      endTimer, 
    } = this.props

    if (isAnswerSelected && currentMon.id === userAnswer) {
      toggleMask()
      submitAnswer()
      setAnswerCorrectFlag()
      
      if (shuffledQuizStack.length > 1) {
      } else {
        endTimer()
        setQuizCompleteFlag()
        this.handleOpen()
      }
    } else {
      endTimer()
      this.handleOpen()
    }
  }

  endQuiz() {
    const { isAnswerCorrect, stackCorrectAnswer, endCurrentQuiz } = this.props
    if (isAnswerCorrect) { stackCorrectAnswer() }
    endCurrentQuiz(this.state.initialsValue)
  }

  render() {
    const { 
      setAnswer, 
      isAnswerSelected, 
      isAnswerSubmitted,
      isAnswerCorrect, 
      isQuizComplete, 
      setNextQuestion, 
      answerChoices,
    } = this.props

    const dialogTitle = isQuizComplete && isAnswerCorrect ? "Congrats!" : "Oh Noes!"
    const dialogMsg = isQuizComplete && isAnswerCorrect ? "You Hacked Da Mainframe!" : "Game Over, Mon"

    const actions = [
      <FlatButton
        label="Continue"
        primary={true}
        onTouchTap={() => this.endQuiz()}
      />,
    ];

    return (
      <div className="answers">
        <RadioButtonGroup 
          name="answers"  
          onChange={setAnswer}
          style={styles.radioButtonGroup} 
        >
          {answerChoices.map( (datum, i) => (
            <RadioButton
              key={i}
              value={datum.id}
              label={datum.name}
              style={styles.radioButton.style}
              labelStyle={styles.radioButton.label}
              // checkedIcon={<Pokeball />}
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
          title={dialogTitle}
          actions={actions}
          style={styles.dialog}
          modal={true}
          open={this.state.dialogOpen}
        >
          {dialogMsg}
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
