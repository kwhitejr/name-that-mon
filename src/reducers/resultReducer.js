const ADD_CORRECT_ANSWER = 'ADD_CORRECT_ANSWER';

const INITIAL_STATE = { error: '', message: '', correctAnswers: [] };

function addCorrectAnswer(state) {
  const shuffledData = state.quizReducer.shuffledData
  const lastDatum = shuffledData.pop()

  const correctAnswers = state.resultReducer.correctAnswers
  correctAnswers.push(lastDatum)

  const newObj = {
    correctAnswers: correctAnswers,
  };
  return Object.assign({}, state, newObj);
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_CORRECT_ANSWER:
      return addCorrectAnswer(...state);
    case RESET:
      return { INITIAL_STATE };
    // case GET_QUIZ_DATA:
    //   return { ...state, shuffledData: action.payload };
    // case STORE_USER:
    //   return { ...state, user: action.payload };
  }

  return state;
}
