const SET_ANSWER = 'SET_ANSWER';
const RESET = 'RESET';

const INITIAL_STATE = { error: '', message: '', selected: false, answer: null };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_ANSWER:
      return { ...state, error: '', message: '', selected: true, answer: action.payload };
    case RESET:
      return { INITIAL_STATE };
    // case AUTH_ERROR:
    //   return { ...state, error: action.payload };
    // case STORE_USER:
    //   return { ...state, user: action.payload };
  }

  return state;
}
