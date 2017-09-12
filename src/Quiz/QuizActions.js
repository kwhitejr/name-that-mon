import moment from 'moment'
import { push } from 'react-router-redux'
import fetch from 'isomorphic-fetch'

import { getPlaythruData } from './QuizSelectors'
import { shuffle } from '../common'

import mockData from '../mockData'

import {
  RESET_INSTANCE_DATA,
  RESET_META_DATA,
  FETCH_QUIZ_REQUEST,
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZ_FAIL,
  
  SET_META_DATA,
  SET_SELECTED_ANSWER,
  SET_USER_INITIALS,
  SET_QUIZ_COMPLETE_FLAG,
  SET_CLUE_FLAG,

  STACK_ANSWER,
  START_TIMER,
  END_TIMER,
  USE_CLUE,
  INCREMENT_CLUE_COUNT,
  POST_PLAYTHRU_SUCCESS,
} from './QuizActionTypes'

import { 
  getRightiest,
  getWrongiest,
  getHighScore,
  getTotalPlaythrus,
} from '../Stats/StatsActions'

const API_URL = 'http://localhost:3000/api';

export const reset = () => {
  return (dispatch) => {
    dispatch({ type: RESET_INSTANCE_DATA })
    dispatch({ type: RESET_META_DATA })
   } 
}

export const fetchQuizData = (quizType, quizSet) => {
  return (dispatch) => {
    dispatch({ type: FETCH_QUIZ_REQUEST })
    return fetch(`${API_URL}/pokemon/${quizType}/${quizSet}`)
      .then(data => data.json())
      .then(json => {
        let shuffledData = shuffle(json)
        dispatch({ type: SET_META_DATA, quizType, quizSet }) // set meta data
        dispatch({ type: FETCH_QUIZ_SUCCESS, shuffledData }) // set questionStack
        dispatch(startQuiz())
      })
      .catch(err => {
        dispatch({ type: FETCH_QUIZ_FAIL, err })
      })
  }
}

export const startQuiz = () => {
  return (dispatch) => {
    dispatch({ type: START_TIMER, time: moment().valueOf() }) // set startTimer
    dispatch(push('/quiz'));
  }
}

// export const beginGenerationQuiz = (generationNumber) => {
//   return (dispatch, getState) => {
//     return fetch(`${API_URL}/pokemon/generation/${generationNumber}`)
//       .then(res => res.json())
//       .then(json => shuffle(json))
//       .then(questionStack => {
//         dispatch({ type: GET_QUIZ_DATA, payload: mockData })
//         dispatch({ type: SET_GENERATION_NUMBER, payload: generationNumber })
//         dispatch({ type: SET_ANSWER_CHOICES, payload: getAnswerChoices(getState().quizInstance.questionStack) })
//         dispatch({ type: START_TIMER, payload: moment().valueOf() })
//         dispatch(push('/quiz'));
//       })
//       .catch(ex => console.log(ex))
//   }
// }

// export function beginPokemonTypeQuiz(pokemonType) {
//   return (dispatch, getState) => {
//     return fetch(`${API_URL}/pokemon/type/${pokemonType}`)
//       .then(res => res.json())
//       .then(json => shuffle(json))
//       .then(questionStack => {
//         dispatch({ type: GET_QUIZ_DATA, payload: questionStack })
//         dispatch({ type: SET_POKEMON_TYPE, payload: pokemonType })
//         dispatch({ type: SET_ANSWER_CHOICES, payload: getAnswerChoices(getState().quizInstance.questionStack) })
//         dispatch({ type: START_TIMER, payload: moment().valueOf() })
//         dispatch(push('/quiz'));
//       })
//       .catch(ex => console.log(ex))
//   }
// }

// export function beginLegendaryQuiz() {
//   return (dispatch, getState) => {
//     return fetch(`${API_URL}/pokemon/legendary`)
//       .then(res => res.json())
//       .then(json => shuffle(json))
//       .then(questionStack => dispatch({ type: GET_QUIZ_DATA, payload: questionStack }))
//       .then(() => dispatch({ type: SET_LEGENDARY, payload: true }))
//       .then(() => dispatch({ type: SET_ANSWER_CHOICES, payload: getAnswerChoices(getState().quizInstance.questionStack) }))
//       .then(() => dispatch({ type: START_TIMER, payload: moment().valueOf() }))
//       .then(() => dispatch(push('/quiz')));
//   }
// }

export const setSelectedAnswer = (value) => {
  return { type: SET_SELECTED_ANSWER, value }
}

export const endQuiz = (isQuizComplete) => {
  return (dispatch) => {
    dispatch({ type: END_TIMER, payload: moment().valueOf() })
    dispatch({ type: SET_QUIZ_COMPLETE_FLAG, isQuizComplete })
    dispatch({ type: INCREMENT_CLUE_COUNT })
    if (isQuizComplete) { dispatch({ type: STACK_ANSWER }) } // `isQuizComplete` also approximates whether last answer was correct (`true`)
  }
}

export const setNextQuestion = () => {
  return (dispatch) => {
    dispatch({ type: INCREMENT_CLUE_COUNT })
    dispatch({ type: STACK_ANSWER })
  }
}

export const incrementClueCount = () => {
  return { type: INCREMENT_CLUE_COUNT }
}

export const useClue = () => {
  return { type: SET_CLUE_FLAG }
}

export const setUserInitials = (userInitials) => {
  return { type: SET_USER_INITIALS, payload: userInitials }
}

export const moveToResults = () => {
  return (dispatch) => {
    dispatch(postPlaythruData())
    dispatch(push('/result'))
  }}

export const postPlaythruData = () => {
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
      } else {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    })
    .catch(error => { console.log('request failed', error); });

    dispatch(getRightiest())
    dispatch(getWrongiest())
    dispatch(getHighScore())
    dispatch(getTotalPlaythrus())
  }
}
