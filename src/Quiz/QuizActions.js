import { push } from 'react-router-redux'
import fetch from 'isomorphic-fetch'

import { getPlaythruData } from './QuizSelectors'
import { shuffle } from '../common'

const API_URL = 'http://localhost:3000/api';

export const  SET_ANSWER = 'SET_ANSWER',
              SET_ANSWER_CHOICES = 'SET_ANSWER_CHOICES',
              SET_NEXT_QUESTION = 'SET_NEXT_QUESTION',
              SET_GENERATION_NUMBER = 'SET_GENERATION_NUMBER',
              SET_POKEMON_TYPE = 'SET_POKEMON_TYPE',
              SET_LEGENDARY = 'SET_LEGENDARY',
              RESET = 'RESET',
              RESET_META_DATA = 'RESET_META_DATA',
              GET_QUIZ_DATA = 'GET_QUIZ_DATA',
              STACK_CORRECT_ANSWER = 'STACK_CORRECT_ANSWER',
              SUBMIT_ANSWER = 'SUBMIT_ANSWER',
              START_TIMER = 'START_TIMER',
              END_TIMER = 'END_TIMER',
              USE_CLUE = 'USE_CLUE',
              INCREMENT_CLUE_COUNT = 'INCREMENT_CLUE_COUNT';

export function reset() {
  return (dispatch) => {
    dispatch({ type: RESET })
    dispatch({ type: RESET_META_DATA })
   } 
}

export function beginGenerationQuiz(generationNumber) {
  return (dispatch) => {
    return fetch(`${API_URL}/pokemon/generation/${generationNumber}`)
      .then(res => res.json())
      .then(json => shuffle(json))
      .then(shuffledQuizStack => dispatch({ type: GET_QUIZ_DATA, payload: shuffledQuizStack }))
      .then(() => dispatch({ type: SET_GENERATION_NUMBER, payload: generationNumber }))
      .then(() => dispatch({ type: SET_ANSWER_CHOICES }))
      .then(() => dispatch({ type: START_TIMER }))
      .then(() => dispatch(push('/quiz')));
  }
}

export function beginPokemonTypeQuiz(pokemonType) {
  return (dispatch) => {
    return fetch(`${API_URL}/pokemon/type/${pokemonType}`)
      .then(res => res.json())
      .then(json => shuffle(json))
      .then(shuffledQuizStack => dispatch({ type: GET_QUIZ_DATA, payload: shuffledQuizStack }))
      .then(() => dispatch({ type: SET_POKEMON_TYPE, payload: pokemonType }))
      .then(() => dispatch({ type: SET_ANSWER_CHOICES }))
      .then(() => dispatch({ type: START_TIMER }))
      .then(() => dispatch(push('/quiz')));
  }
}

export function beginLegendaryQuiz() {
  return (dispatch) => {
    return fetch(`${API_URL}/pokemon/legendary`)
      .then(res => res.json())
      .then(json => shuffle(json))
      .then(shuffledQuizStack => dispatch({ type: GET_QUIZ_DATA, payload: shuffledQuizStack }))
      .then(() => dispatch({ type: SET_LEGENDARY, payload: true }))
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

export function endCurrentQuiz() {
  return (dispatch) => {
    dispatch({ type: END_TIMER })
    dispatch({ type: INCREMENT_CLUE_COUNT })
    dispatch(postPlaythruData())
    dispatch(push('/result'))
  }
}

export function postPlaythruData() {
  return (dispatch, getState) => {
    const playthruData = getPlaythruData(getState());
    console.log("playthru: ", playthruData);

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

