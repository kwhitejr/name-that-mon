import { shuffle } from '../common'

const SET_ANSWER = 'SET_ANSWER',
      RESET_INSTANCE_DATA = 'RESET_INSTANCE_DATA',
      GET_QUIZ_DATA = 'GET_QUIZ_DATA',
      SUBMIT_ANSWER = 'SUBMIT_ANSWER',
      SET_ANSWER_CHOICES = 'SET_ANSWER_CHOICES',
      STACK_CORRECT_ANSWER = 'STACK_CORRECT_ANSWER',
      START_TIMER = 'START_TIMER',
      END_TIMER = 'END_TIMER',
      USE_CLUE = 'USE_CLUE',
      INCREMENT_CLUE_COUNT = 'INCREMENT_CLUE_COUNT';

export const INITIAL_STATE = { 
  error: '', 
  message: '', 
  isAnswerSelected: false, 
  isAnswerSubmitted: false, 
  isClueUsed: false, 
  userAnswer: null, 
  answerChoices: [], 
  shuffledQuizStack: [], 
  correctAnswerStack: [],
  startTime: null,
  endTime: null,
  clueCount: 0,
};

export default function (state = INITIAL_STATE, action) {
  // eslint-disable-next-line
  switch (action.type) {
    case SET_ANSWER:
      return { ...state, isAnswerSelected: true, userAnswer: action.payload };
    case RESET_INSTANCE_DATA:
      return { 
        error: '', 
        message: '', 
        isAnswerSelected: false, 
        isAnswerSubmitted: false, 
        isClueUsed: false, 
        userAnswer: null, 
        answerChoices: [], 
        shuffledQuizStack: [], 
        correctAnswerStack: [],
        startTime: null,
        endTime: null,
        clueCount: 0,
      };
    case GET_QUIZ_DATA:
      return { ...state, shuffledQuizStack: action.payload };
    case SUBMIT_ANSWER:
      return { ...state, isAnswerSubmitted: true };
    case SET_ANSWER_CHOICES:
      return { ...state, answerChoices: action.payload };
    case STACK_CORRECT_ANSWER:
      return { ...state, 
        shuffledQuizStack: action.payload.shuffledQuizStack,
        correctAnswerStack: action.payload.correctAnswerStack,
        isAnswerSubmitted: false,
        isAnswerSelected: false,
        isClueUsed: false,
        userAnswer: null, 
        answerChoices: [], 
      };
    case START_TIMER:
      return { ...state, startTime: action.payload };
    case END_TIMER:
      return { ...state, endTime: action.payload };
    case USE_CLUE:
      return { ...state, isClueUsed: true };
    case INCREMENT_CLUE_COUNT:
      if (state.isClueUsed)
        return { ...state, isClueUsed: false, clueCount: state.clueCount + 1 };
  }

  return state;
}

// When correct answer is submitted, add it to the correctAnswerStack
const stackCorrectAnswerHelper = (state) => {
  let shuffledQuizStack = state.shuffledQuizStack
  let correctAnswerStack = state.correctAnswerStack
  const lastDatum = shuffledQuizStack[shuffledQuizStack.length-1]

  // add correct answer to `correctAnswerStack`
  correctAnswerStack.push(lastDatum)

  const newObj = {
    shuffledQuizStack: shuffledQuizStack.slice(0,-1),
    correctAnswerStack: correctAnswerStack,
    isAnswerSubmitted: false,
    isAnswerSelected: false,
    isClueUsed: false,
    userAnswer: null, 
    answerChoices: [],
  };
  return Object.assign({}, state, newObj);
}
