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
        shuffledData: null, 
        correctAnswerStack: [],
      };
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
  let pickThree = null
  answerChoices.push(currentMon)

  // add bogus answers
  const remainingMon = shuffle(shuffledData.slice(0,shuffledData.length-1))
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
    shuffledData: shuffledData,
    answerChoices: shuffledAnswerChoices,
  };
  return Object.assign({}, state, newObj);
}

const stackCorrectAnswer = (state) => {
  const shuffledData = state.shuffledData
  const lastDatum = shuffledData.pop()
  let correctAnswerStack = state.correctAnswerStack

  // add correct answer to `correctAnswerStack`
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
