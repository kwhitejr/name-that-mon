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

class QuizAnswers extends Component {
  state = {
    dialogOpen: false,
    isAnswerSelected: false,
    isAnswerSubmitted: false,
    isAnswerCorrect: false,
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

  handleSelectedAnswer = (event, value) => {
    this.setState({isAnswerSelected: true});
    this.props.setSelectedAnswer(value)
  }

  handleSubmitAnswer = () => {
    const {
      isAnswerSelected
    } = this.state

    const {
      userAnswer, 
      currentMon,
      questionStack,
      toggleMask,
      endQuiz, 
    } = this.props

    // Set Flags
    this.setState({
      isAnswerSelected: false,
      isAnswerSubmitted: true,
    });

    if (isAnswerSelected && currentMon.id === userAnswer) {
      // Branch 1a: Correct Answer
      toggleMask()
      this.setState({isAnswerCorrect: true});
      
      if (questionStack.length === 1) {
      // Branch 1b: Quiz Finished (100%!)
        endQuiz(true) // quizComplete = true, incrementClue, stackAnswer
        this.handleOpen()
      }
    } else {
      // Branch 2: Incorrect Answer
      endQuiz(false) // quizComplete = false, incrementClue
      this.handleOpen()
    }
  }

  handleSetNextQuestion = () => {
    this.setState({
      dialogOpen: false,
      isAnswerSelected: false,
      isAnswerSubmitted: false,
      isAnswerCorrect: false,
    })
    this.props.setNextQuestion()
  }

  handleMoveToResults = () => {
    this.props.setUserInitials(this.state.initialsValue)
    this.props.moveToResults()
  }

  render = () => {
    const {
      isAnswerSelected, 
      isAnswerSubmitted,
      isAnswerCorrect,
    } = this.state

    const { 
      isQuizComplete,
      questionStack, 
      answerChoices,
      setUserAnswer, 
      setNextQuestion, 
    } = this.props

    const dialogTitle = isQuizComplete && isAnswerCorrect ? "Congrats!" : "Oh Noes!"
    const dialogMsg = isQuizComplete && isAnswerCorrect ? "You Hacked Da Mainframe!" : "Game Over, Mon"

    const actions = [
      <FlatButton
        label="Continue"
        primary={true}
        onTouchTap={this.handleMoveToResults}
      />,
    ];

    return (
      <div className="answers">
        <RadioButtonGroup 
          name="answers"  
          onChange={this.handleSetUserAnswer}
          style={styles.radioButtonGroup} 
        >
          {answerChoices.map( (datum, i) => (
            <RadioButton
              key={i}
              value={datum.id}
              label={datum.name}
              disabled={this.state.isAnswerSubmitted}
              style={styles.radioButton.style}
              labelStyle={styles.radioButton.label}
              // checkedIcon={<Pokeball />}
            />
          ))}
        </RadioButtonGroup>
        <RaisedButton 
          label="Submit"
          primary={this.state.isAnswerSelected}
          disabled={!this.state.isAnswerSelected}
          style={styles.raisedButton}
          onTouchTap={this.handleSubmitAnswer}
        />
        <RaisedButton 
          label="Next"
          secondary={this.state.isAnswerSubmitted}
          disabled={!this.state.isAnswerSubmitted}
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

// QuizAnswers.propTypes = {
//   reset: PropTypes.func,
//   setUserAnswer: PropTypes.func,
//   setNextQuestion: PropTypes.func,
//   useClue: PropTypes.func,
//   endCurrentQuiz: PropTypes.func,
//   toggleMask: PropTypes.func,
//   isAnswerSelected: PropTypes.bool,
//   isAnswerSubmitted: PropTypes.bool,
//   isClueUsed: PropTypes.bool,
//   userAnswer: PropTypes.number,
//   currentMon: PropTypes.object,
//   answerChoices: PropTypes.array,
// };

export default QuizAnswers;
