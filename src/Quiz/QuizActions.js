import moment from 'moment'
import { push } from 'react-router-redux'
import fetch from 'isomorphic-fetch'

import { getPlaythruData } from './QuizSelectors'
import { shuffle } from '../common'

import {
  SET_ANSWER,
  SET_USER_INITIALS,
  SET_ANSWER_CHOICES,
  SET_GENERATION_NUMBER,
  SET_POKEMON_TYPE,
  SET_LEGENDARY,
  GET_QUIZ_DATA,
  STACK_CORRECT_ANSWER,
  SUBMIT_ANSWER,
  START_TIMER,
  END_TIMER,
  USE_CLUE,
  INCREMENT_CLUE_COUNT,
  POST_PLAYTHRU_SUCCESS,
  RESET_INSTANCE_DATA,
  RESET_META_DATA,
} from './QuizActionTypes'

const API_URL = 'http://localhost:3000/api';

export function reset() {
  return (dispatch) => {
    dispatch({ type: RESET_INSTANCE_DATA })
    dispatch({ type: RESET_META_DATA })
   } 
}

export function beginGenerationQuiz(generationNumber) {
  return (dispatch, getState) => {
    return fetch(`${API_URL}/pokemon/generation/${generationNumber}`)
      .then(res => res.json())
      .then(json => shuffle(json))
      .then(shuffledQuizStack => {
        dispatch({ type: GET_QUIZ_DATA, payload: shuffledQuizStack })
        dispatch({ type: SET_GENERATION_NUMBER, payload: generationNumber })
        dispatch({ type: SET_ANSWER_CHOICES, payload: getAnswerChoices(getState().quizInstance.shuffledQuizStack) })
        dispatch({ type: START_TIMER, payload: moment().valueOf() })
        dispatch(push('/quiz'));
      })
      .catch(ex => console.log(ex))
  }
}

export function beginPokemonTypeQuiz(pokemonType) {
  return (dispatch, getState) => {
    return fetch(`${API_URL}/pokemon/type/${pokemonType}`)
      .then(res => res.json())
      .then(json => shuffle(json))
      .then(shuffledQuizStack => {
        dispatch({ type: GET_QUIZ_DATA, payload: shuffledQuizStack })
        dispatch({ type: SET_POKEMON_TYPE, payload: pokemonType })
        dispatch({ type: SET_ANSWER_CHOICES, payload: getAnswerChoices(getState().quizInstance.shuffledQuizStack) })
        dispatch({ type: START_TIMER, payload: moment().valueOf() })
        dispatch(push('/quiz'));
      })
      .catch(ex => console.log(ex))
  }
}

export function beginLegendaryQuiz() {
  return (dispatch, getState) => {
    return fetch(`${API_URL}/pokemon/legendary`)
      .then(res => res.json())
      .then(json => shuffle(json))
      .then(shuffledQuizStack => dispatch({ type: GET_QUIZ_DATA, payload: shuffledQuizStack }))
      .then(() => dispatch({ type: SET_LEGENDARY, payload: true }))
      .then(() => dispatch({ type: SET_ANSWER_CHOICES, payload: getAnswerChoices(getState().quizInstance.shuffledQuizStack) }))
      .then(() => dispatch({ type: START_TIMER, payload: moment().valueOf() }))
      .then(() => dispatch(push('/quiz')));
  }
}

export function setAnswer(event, value) {
  return { type: SET_ANSWER, payload: value }
}

export function setNextQuestion() {
  return (dispatch, getState) => {
    let state = getState().quizInstance
    dispatch({ type: INCREMENT_CLUE_COUNT })
    dispatch({ type: STACK_CORRECT_ANSWER, payload: stackCorrectAnswerHelper(state.shuffledQuizStack, state.correctAnswerStack) })
    dispatch({ type: SET_ANSWER_CHOICES, payload: getAnswerChoices(getState().quizInstance.shuffledQuizStack) })
  }
}

export function submitAnswer() {
  return { type: SUBMIT_ANSWER }
}

export function useClue() {
  return { type: USE_CLUE }
}

export function endTimer() {
  return { type: END_TIMER, payload: moment().valueOf() }
}

export function endCurrentQuiz(userInitials) {
  return (dispatch) => {
    dispatch({ type: SET_USER_INITIALS, payload: userInitials })
    dispatch({ type: INCREMENT_CLUE_COUNT })
    dispatch(push('/result'))
    dispatch(postPlaythruData())
  }
}

export function postPlaythruData() {
  return (dispatch, getState) => {
    const playthruData = getPlaythruData(getState());

    fetch(`${API_URL}/playthru/`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playthruData),
    })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        dispatch({ type: POST_PLAYTHRU_SUCCESS })
        console.log(response);
      } else {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    })
    .catch(error => { console.log('request failed', error); });
  }
}

// TODO: convert this to Selector
export const getAnswerChoices = (quizStack) => {
    const currentMon = quizStack[quizStack.length-1]
    let answerChoices = []
    let pickThree = null
    answerChoices.push(currentMon)

    // add bogus answers
    const remainingMon = shuffle(quizStack.slice(0,quizStack.length-1))
    if (remainingMon.length > 3) {
      pickThree = remainingMon.slice(0,3);
    } else {
      pickThree = remainingMon
    }
    pickThree.forEach( (obj) => {
      answerChoices.push(obj);
    });

    const shuffledAnswerChoices = shuffle(answerChoices)

    // shuffle the order
    return shuffledAnswerChoices
}

const stackCorrectAnswerHelper = (shuffledQuizStack, correctAnswerStack) => {
  const lastDatum = shuffledQuizStack[shuffledQuizStack.length-1]

  // add correct answer to `correctAnswerStack`
  correctAnswerStack.push(lastDatum)

  const newObj = {
    shuffledQuizStack: shuffledQuizStack.slice(0,-1),
    correctAnswerStack: correctAnswerStack,
  };
  return newObj;
}

