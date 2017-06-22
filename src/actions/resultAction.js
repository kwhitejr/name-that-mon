export const  ADD_CORRECT_ANSWER = 'ADD_CORRECT_ANSWER';

export function addCorrectAnswer() {
  return (dispatch) => {
    dispatch({ type: ADD_CORRECT_ANSWER })
  };
}

export function reset() {
  return (dispatch) => {
    dispatch({ type: RESET })
  };
}
