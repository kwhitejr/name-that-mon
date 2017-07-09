const ADD_CORRECT_ANSWER = 'ADD_CORRECT_ANSWER';

const INITIAL_STATE = { 
  error: '', 
  message: '',  
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESET:
      return { INITIAL_STATE };
    // case GET_QUIZ_DATA:
    //   return { ...state, shuffledQuizStack: action.payload };
    // case STORE_USER:
    //   return { ...state, user: action.payload };
  }

  return state;
}
