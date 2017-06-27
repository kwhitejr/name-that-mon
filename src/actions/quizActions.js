import { push } from 'react-router-redux'
import { shuffle } from '../common'
import mockData from '../mockData'


export const  SET_ANSWER = 'SET_ANSWER',
              SET_ANSWER_CHOICES = 'SET_ANSWER_CHOICES',
              SET_NEXT_QUESTION = 'SET_NEXT_QUESTION',
              RESET = 'RESET',
              GET_QUIZ_DATA = 'GET_QUIZ_DATA',
              STACK_CORRECT_ANSWER = 'STACK_CORRECT_ANSWER',
              SUBMIT_ANSWER = 'SUBMIT_ANSWER';

export function reset() {
  return (dispatch) => {
    dispatch({ type: RESET })
    dispatch(push('/'))
  };
}

export function getQuizData() {  
  const shuffledData = shuffle(mockData)
  return (dispatch) => {
    dispatch({ type: GET_QUIZ_DATA, payload: shuffledData });
    dispatch({ type: SET_ANSWER_CHOICES })
    dispatch(push('/quiz'));
  }
}

export function setAnswer(event, value) {
  return { type: SET_ANSWER, payload: value }
}

export function setNextQuestion() {
  return (dispatch) => {
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
