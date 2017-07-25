import moment from 'moment'
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
      return setAnswerChoices(state);
    case STACK_CORRECT_ANSWER:
      return stackCorrectAnswer(state);
    case START_TIMER:
      return { ...state, startTime: moment().valueOf() };
    case END_TIMER:
      return { ...state, endTime: moment().valueOf() };
    case USE_CLUE:
      return { ...state, isClueUsed: true };
    case INCREMENT_CLUE_COUNT:
      if (state.isClueUsed)
        return { ...state, isClueUsed: false, clueCount: state.clueCount + 1 };
  }

  return state;
}

// For each new question, get correct pokemon and three bogus pokemon, shuffle, and set.
const setAnswerChoices = (state) => {
  const shuffledQuizStack = state.shuffledQuizStack
  const currentMon = shuffledQuizStack[shuffledQuizStack.length-1]
  let answerChoices = []
  let pickThree = null
  answerChoices.push(currentMon)

  // add bogus answers
  const remainingMon = shuffle(shuffledQuizStack.slice(0,shuffledQuizStack.length-1))
  if (remainingMon.length > 3) {
    pickThree = remainingMon.slice(0,3);
  } else {
    pickThree = remainingMon
  }
  pickThree.forEach( (obj) => {
    answerChoices.push(obj);
  });

  // shuffle the order
  const shuffledAnswerChoices = shuffle(answerChoices)

  // update `state`
  const newObj = {
    answerChoices: shuffledAnswerChoices,
  };
  return Object.assign({}, state, newObj);
}

// When correct answer is submitted, add it to the correctAnswerStack
const stackCorrectAnswer = (state) => {
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
