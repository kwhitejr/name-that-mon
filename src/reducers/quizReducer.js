import moment from 'moment'
import { shuffle } from '../common'

const SET_ANSWER = 'SET_ANSWER',
      RESET = 'RESET',
      GET_QUIZ_DATA = 'GET_QUIZ_DATA',
      SUBMIT_ANSWER = 'SUBMIT_ANSWER',
      SET_ANSWER_CHOICES = 'SET_ANSWER_CHOICES',
      STACK_CORRECT_ANSWER = 'STACK_CORRECT_ANSWER',
      START_TIMER = 'START_TIMER',
      END_TIMER = 'END_TIMER';

const INITIAL_STATE = { 
  error: '', 
  message: '', 
  isAnswerSelected: false, 
  isAnswerSubmitted: false, 
  userAnswer: null, 
  answerChoices: [], 
  shuffledQuizStack: [], 
  correctAnswerStack: [],
  startTime: null,
  endTime: null,
};

export default function (state = INITIAL_STATE, action) {
  // eslint-disable-next-line
  switch (action.type) {
    case SET_ANSWER:
      return { ...state, isAnswerSelected: true, userAnswer: action.payload };
    case RESET:
      return { 
        error: '', 
        message: '', 
        isAnswerSelected: false, 
        isAnswerSubmitted: false, 
        userAnswer: null, 
        answerChoices: [], 
        shuffledQuizStack: [], 
        correctAnswerStack: [],
        startTime: null,
        endTime: null,
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
      return { ...state, startTime: moment().unix() };
    case END_TIMER:
      return { ...state, endTime: moment().unix() };
  }

  return state;
}

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
    shuffledQuizStack: shuffledQuizStack,
    answerChoices: shuffledAnswerChoices,
  };
  return Object.assign({}, state, newObj);
}

const stackCorrectAnswer = (state) => {
  const shuffledQuizStack = state.shuffledQuizStack
  const lastDatum = shuffledQuizStack.pop()
  let correctAnswerStack = state.correctAnswerStack

  // add correct answer to `correctAnswerStack`
  correctAnswerStack.push(lastDatum)

  const newObj = {
    shuffledQuizStack: shuffledQuizStack,
    correctAnswerStack: correctAnswerStack,
    isAnswerSubmitted: false,
    isAnswerSelected: false,
    userAnswer: null, 
    answerChoices: [],
  };
  return Object.assign({}, state, newObj);
}
