import { push } from 'react-router-redux'
import { shuffle } from '../common'

const API_URL = 'http://localhost:3000/api';

export const  RESET = 'RESET',
              GET_QUIZ_DATA = 'GET_QUIZ_DATA',
              SET_ANSWER_CHOICES = 'SET_ANSWER_CHOICES';

export function resetThenHome() {
  return (dispatch) => {
    dispatch({ type: RESET })
    dispatch(push('/'))
  };
}

export function resetThenRestart() {
  // need to refactor the reload of pokemon
  const generation = 1
  return (dispatch) => {
    dispatch({ type: RESET })
    return fetch(`${API_URL}/pokemon/generation/${generation}`)
      .then(res => res.json())
      .then(json => shuffle(json))
      .then(shuffledQuizStack => dispatch({ type: GET_QUIZ_DATA, payload: shuffledQuizStack }))
      .then(() => dispatch({ type: SET_ANSWER_CHOICES }))
      .then(() => dispatch(push('/quiz')));
  }
}