import { push } from 'react-router-redux'
import { shuffle } from '../common'
import mockData from '../mockData'


export const  SET_ANSWER = 'SET_ANSWER',
              RESET = 'RESET',
              GET_QUIZ_DATA = 'GET_QUIZ_DATA',
              LOAD_NEXT_MON = 'LOAD_NEXT_MON',
              SUBMIT_ANSWER = 'SUBMIT_ANSWER';

export function reset() {
  return (dispatch) => {
    dispatch({ type: RESET })
  };
}

export function getQuizData() {  
  const shuffledData = shuffle(mockData)
  return (dispatch) => {
    dispatch({ type: GET_QUIZ_DATA, payload: shuffledData });
    dispatch(push('/quiz'));
  }
}

export function setAnswer(event, value) {
  return (dispatch) => {
    dispatch({ type: SET_ANSWER, payload: value })
  }
}

export function loadNextMon() {
  return (dispatch) => {
    dispatch({ type: LOAD_NEXT_MON })
    dispatch(push('/quiz'))
  }
}

export function submitAnswer() {
  return (dispatch) => {
    dispatch({ type: SUBMIT_ANSWER })
  }
}
