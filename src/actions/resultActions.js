import { push } from 'react-router-redux'
import { shuffle } from '../common'

import mockData from '../mockData' // TODO: remove once server is set up

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
  // TODO: replace mockData with API call to db  
  const shuffledData = shuffle(mockData)

  return (dispatch) => {
    dispatch({ type: RESET })
    dispatch({ type: GET_QUIZ_DATA, payload: shuffledData });
    dispatch({ type: SET_ANSWER_CHOICES })
    dispatch(push('/quiz'));
  };
}
