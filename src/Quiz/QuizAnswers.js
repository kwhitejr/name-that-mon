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
  }

  handleOpen = () => {
    this.setState({dialogOpen: true});
  }

  handleClose = () => {
    this.setState({dialogOpen: false});
  }

  handleInitialsChange = (event) => {
    this.setState({
      initialsValue: event.target.value.toUpperCase(),
    });
  }

  handleCheckAnswer = () => {
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

  handleSetNextQuestion = () => {
    const { stackCorrectAnswerHelper, shuffledQuizStack, correctAnswerStack, getAnswerChoices, setNextQuestion } = this.props
    const arrObj = stackCorrectAnswerHelper(shuffledQuizStack, correctAnswerStack) 
    const answerChoices = getAnswerChoices()

    setNextQuestion(arrObj, answerChoices)
  }

  handleEndQuiz = () => {
    const { 
      isAnswerCorrect, 
      shuffledQuizStack, 
      correctAnswerStack, 
      stackCorrectAnswer, 
      stackCorrectAnswerHelper, 
      endCurrentQuiz 
    } = this.props

    if (isAnswerCorrect) { 
      stackCorrectAnswer(stackCorrectAnswerHelper(shuffledQuizStack, correctAnswerStack)) 
    }

    endCurrentQuiz(this.state.initialsValue)
  }

  render() {
    const { 
      isAnswerSelected, 
      isAnswerSubmitted,
      isAnswerCorrect, 
      isQuizComplete,
      shuffledQuizStack, 
      answerChoices,
      setAnswer, 
      setNextQuestion, 
    } = this.props

    const dialogTitle = isQuizComplete && isAnswerCorrect ? "Congrats!" : "Oh Noes!"
    const dialogMsg = isQuizComplete && isAnswerCorrect ? "You Hacked Da Mainframe!" : "Game Over, Mon"

    const actions = [
      <FlatButton
        label="Continue"
        primary={true}
        onTouchTap={this.handleEndQuiz}
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
              disabled={isAnswerSubmitted}
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
          onTouchTap={this.handleCheckAnswer}
        />
        <RaisedButton 
          label="Next"
          secondary={isAnswerSubmitted}
          disabled={!isAnswerSubmitted}
          style={styles.raisedButton}
          onTouchTap={this.handleSetNextQuestion}
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
              onChange={this.handleInitialsChange}
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
