import { push } from 'react-router-redux'
import fetch from 'isomorphic-fetch'

import { shuffle } from '../common'

const API_URL = 'http://localhost:3000/api';

export const  SET_ANSWER = 'SET_ANSWER',
              SET_ANSWER_CHOICES = 'SET_ANSWER_CHOICES',
              SET_NEXT_QUESTION = 'SET_NEXT_QUESTION',
              RESET = 'RESET',
              GET_QUIZ_DATA = 'GET_QUIZ_DATA',
              STACK_CORRECT_ANSWER = 'STACK_CORRECT_ANSWER',
              SUBMIT_ANSWER = 'SUBMIT_ANSWER',
              START_TIMER = 'START_TIMER',
              END_TIMER = 'END_TIMER',
              USE_CLUE = 'USE_CLUE',
              INCREMENT_CLUE_COUNT = 'INCREMENT_CLUE_COUNT';

export function reset() {
  return { type: RESET }
}

export function getQuizData(generation) {
  // TODO: replace mockData with API call to db  
  // const shuffledQuizStack = shuffle(mockData)
  generation = 1
  // console.log(event)
  // console.log(generation)
  // console.log(API_URL)
  return (dispatch) => {
    return fetch(`${API_URL}/pokemon/generation/${generation}`)
      .then(res => res.json())
      .then(json => shuffle(json))
      .then(shuffledQuizStack => dispatch({ type: GET_QUIZ_DATA, payload: shuffledQuizStack }))
      .then(() => dispatch({ type: SET_ANSWER_CHOICES }))
      .then(() => dispatch({ type: START_TIMER }))
      .then(() => dispatch(push('/quiz')));
  }
}

export function setAnswer(event, value) {
  return { type: SET_ANSWER, payload: value }
}

export function setNextQuestion() {
  return (dispatch) => {
    dispatch({ type: INCREMENT_CLUE_COUNT })
    dispatch({ type: STACK_CORRECT_ANSWER })
    dispatch({ type: SET_ANSWER_CHOICES })
  }
}

export function stackCorrectAnswer() {
  return { type: STACK_CORRECT_ANSWER }
}

export function submitAnswer() {
  return { type: SUBMIT_ANSWER }
}

export function setAnswerChoices() {
  return { type: SET_ANSWER_CHOICES }
}

export function useClue() {
  return { type: USE_CLUE }
}

// export function incrementClueCount() {
//   return { type: INCREMENT_CLUE_COUNT }
// }

export function endCurrentQuiz() {
  return (dispatch) => {
    dispatch({ type: END_TIMER })
    dispatch({ type: INCREMENT_CLUE_COUNT })
    dispatch(push('/result'))
  }
}
