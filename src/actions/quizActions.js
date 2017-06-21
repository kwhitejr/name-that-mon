export const  SET_ANSWER = 'SET_ANSWER',
              RESET = 'RESET';

export function setAnswer(event, value) {
  console.log(event)
  console.log(value)
  return (dispatch) => {
    dispatch({ type: SET_ANSWER, payload: value })
  };
}

export function reset() {
  return (dispatch) => {
    dispatch({ type: RESET })
  };
}
