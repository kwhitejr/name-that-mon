import { push } from 'react-router-redux'

import mockData from '../mockData'

const shuffle = (array, rng) => {
  var i = array.length, j, swap;
    if (!rng) rng = Math;
  while (--i) {
    j = rng.random() * (i + 1) | 0;
    swap = array[i];
    array[i] = array[j];
    array[j] = swap;
  }
  return array;
}

export const  SET_ANSWER = 'SET_ANSWER',
              RESET = 'RESET',
              GET_QUIZ_DATA = 'GET_QUIZ_DATA',
              LOAD_ANSWER_CHOICES = 'LOAD_ANSWER_CHOICES',
              GET_NEXT_MON = 'GET_NEXT_MON';

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
  // console.log(event)
  // console.log(value)
  return (dispatch) => {
    dispatch({ type: SET_ANSWER, payload: value })
  }
}

export function getNextMon() {
  return (dispatch) => {
    dispatch({ type: GET_NEXT_MON })
  }
}
