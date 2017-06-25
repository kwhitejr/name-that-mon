const SET_ANSWER = 'SET_ANSWER',
      RESET = 'RESET',
      GET_QUIZ_DATA = 'GET_QUIZ_DATA',
      SUBMIT_ANSWER = 'SUBMIT_ANSWER',
      LOAD_ANSWER_CHOICES = 'LOAD_ANSWER_CHOICES',
      LOAD_NEXT_MON = 'LOAD_NEXT_MON';

const INITIAL_STATE = { 
  error: '', 
  message: '', 
  isAnswerSelected: false, 
  isAnswerSubmitted: false, 
  userAnswer: null, 
  answerChoices: null, 
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
    case LOAD_ANSWER_CHOICES:
      return { ...state, answerChoices: action.payload };
    case LOAD_NEXT_MON:
      return loadNextMon(state);
  }

  return state;
}

// const loadAnswerChoices 

const loadNextMon = (state) => {
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
    answerChoices: null,
  };
  return Object.assign({}, state, newObj);
}
