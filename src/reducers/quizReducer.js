import { shuffle } from '../common'

const SET_ANSWER = 'SET_ANSWER',
      RESET = 'RESET',
      GET_QUIZ_DATA = 'GET_QUIZ_DATA',
      SUBMIT_ANSWER = 'SUBMIT_ANSWER',
      SET_ANSWER_CHOICES = 'SET_ANSWER_CHOICES',
      STACK_CORRECT_ANSWER = 'STACK_CORRECT_ANSWER';

const INITIAL_STATE = { 
  error: '', 
  message: '', 
  isAnswerSelected: false, 
  isAnswerSubmitted: false, 
  userAnswer: null, 
  answerChoices: [], 
  shuffledData: null, 
  correctAnswerStack: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_ANSWER:
      return { ...state, isAnswerSelected: true, userAnswer: action.payload };
    case RESET:
      return { INITIAL_STATE };
    case GET_QUIZ_DATA:
      return { ...state, shuffledData: action.payload };
    case SUBMIT_ANSWER:
      return { ...state, isAnswerSubmitted: true };
    case SET_ANSWER_CHOICES:
      return setAnswerChoices(state);
    case STACK_CORRECT_ANSWER:
      return stackCorrectAnswer(state);
  }

  return state;
}

const setAnswerChoices = (state) => {
  const shuffledData = state.shuffledData
  const currentMon = shuffledData[shuffledData.length-1]
  let answerChoices = []
  answerChoices.push(currentMon)

  // add three bogus answers
  const remainingMon = shuffle(shuffledData.slice(0,shuffledData.length-1))
  const pickThree = remainingMon.slice(0,3);
  pickThree.forEach( (obj) => {
    answerChoices.push(obj);
  });

  const shuffledAnswerChoices = shuffle(answerChoices)

  const newObj = {
    shuffledData: shuffledData,
    answerChoices: shuffledAnswerChoices,
  };
  return Object.assign({}, state, newObj);
}

const stackCorrectAnswer = (state) => {
  const shuffledData = state.shuffledData
  const lastDatum = shuffledData.pop()
  let correctAnswerStack = state.correctAnswerStack

  correctAnswerStack.push(lastDatum)

  const newObj = {
    shuffledData: shuffledData,
    correctAnswerStack: correctAnswerStack,
    isAnswerSubmitted: false,
    isAnswerSelected: false,
    userAnswer: null, 
    answerChoices: [],
  };
  return Object.assign({}, state, newObj);
}
