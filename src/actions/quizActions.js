export const  SET_ANSWER = 'SET_ANSWER',
              RESET = 'RESET';

export function setAnswer({ answer }) {
  return (dispatch) => {
    dispatch({ type: SET_ANSWER, payload: answer })
  };
}

export function setAnswer() {
  return (dispatch) => {
    dispatch({ type: RESET })
  };
}
