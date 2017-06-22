const SET_ANSWER = 'SET_ANSWER',
      RESET = 'RESET',
      GET_QUIZ_DATA = 'GET_QUIZ_DATA',
      GET_NEXT_MON = 'GET_NEXT_MON';

const INITIAL_STATE = { error: '', message: '', selected: false, answer: null, correctAnswers: null, shuffledData: null};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_ANSWER:
      return { ...state, selected: true, answer: action.payload };
    case RESET:
      return { INITIAL_STATE };
    case GET_QUIZ_DATA:
      return { ...state, shuffledData: action.payload };
    case GET_NEXT_MON:
      return getNextMon(state);
  }

  return state;
}

const getNextMon = (state) => {
  const shuffledData = state.quizReducer.shuffledData
  const lastDatum = shuffledData.pop()

  const nextMon = shuffledData[shuffledData.length-1]

  let correctAnswers = state.quizReducer.correctAnswers
  correctAnswers.push(lastDatum)

  const newObj = {
    correctAnswers: correctAnswers,
    shuffledData: shuffledData,
    answer: nextMon.index
  };
  return Object.assign({}, state, newObj);
}