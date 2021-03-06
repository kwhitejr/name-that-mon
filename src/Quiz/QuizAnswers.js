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
  
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      isAnswerSelected: false,
      isAnswerSubmitted: false,
      isAnswerCorrect: false,
      initialsValue: "",
    };
    this.handleInitialsChange = this.handleInitialsChange.bind(this);
    this.handleSelectedAnswer = this.handleSelectedAnswer.bind(this);
    this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this);
    this.handleSetNextQuestion = this.handleSetNextQuestion.bind(this);
    this.handleMoveToResults = this.handleMoveToResults.bind(this);
  }

  handleOpen() {
    this.setState({dialogOpen: true});
  }

  handleClose() {
    this.setState({dialogOpen: false});
  }

  handleInitialsChange(event) {
    this.setState({
      initialsValue: event.target.value.toUpperCase(),
    });
  }

  handleSelectedAnswer(event, value) {
    this.setState({isAnswerSelected: true});
    this.props.setSelectedAnswer(value)
  }

  handleSubmitAnswer() {
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

  handleSetNextQuestion() {
    this.setState({
      dialogOpen: false,
      isAnswerSelected: false,
      isAnswerSubmitted: false,
      isAnswerCorrect: false,
    })
    this.props.setNextQuestion()
  }

  handleMoveToResults() {
    this.props.setUserInitials(this.state.initialsValue)
    this.props.moveToResults()
  }

  render() {
    const {
      isAnswerSelected, 
      isAnswerSubmitted,
      isAnswerCorrect,
      initialsValue,
    } = this.state

    const { 
      isQuizComplete,
      answerChoices,
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
          onChange={this.handleSelectedAnswer}
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
          onTouchTap={this.handleSubmitAnswer}
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
              value={initialsValue}
              onChange={this.handleInitialsChange}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

QuizAnswers.propTypes = {
  setNextQuestion: PropTypes.func,
  setUserInitials: PropTypes.func,
  moveToResults: PropTypes.func,
  endQuiz: PropTypes.func,
  toggleMask: PropTypes.func,
  isClueUsed: PropTypes.bool,
  isQuizComplete: PropTypes.bool,
  userAnswer: PropTypes.number,
  currentMon: PropTypes.object,
  answerChoices: PropTypes.array,
  questionStack: PropTypes.array,
};

export default QuizAnswers;
