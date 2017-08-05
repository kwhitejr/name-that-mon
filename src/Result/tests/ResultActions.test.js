import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'

import {
  resetThenHome,
  resetThenRestart,
} from '../ResultActions'

import { 
  RESET_INSTANCE_DATA, 
  RESET_META_DATA, 
  GET_QUIZ_DATA,
  SET_ANSWER_CHOICES,
} from '../../Quiz/QuizActionTypes'

const API_URL = 'http://localhost:3000/api/';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  // resetThenHome
  it('resetThenHome dispatches RESET_INSTANCE_DATA & RESET_META_DATA', () => {

    const store = mockStore({ 
      quizMetaData: {
      },
      quizInstance: {
      }
    })

    const expectedActions = [
      { type: RESET_INSTANCE_DATA },
      { type: RESET_META_DATA },
      { 
        "payload": { "args": ["/"], "method": "push" }, 
        "type": "@@router/CALL_HISTORY_METHOD",
      },
    ]

    store.dispatch(resetThenHome())
    expect(store.getActions()).toEqual(expectedActions)
  })

  // resetThenRestart
  it('resetThenRestart dispatches RESET_INSTANCE_DATA, GET_QUIZ_DATA, & SET_ANSWER_CHOICES', () => {

    const store = mockStore({
      quizInstance: {
        // shuffledQuizStack: [],
        // answerChoices: [],
        // startTime: null,
      },
      quizMetaData: {
        quizType: 'generation',
        quizSet: 1,
      }
    })

    nock(API_URL)
      .get(`/pokemon/${store.getState().quizMetaData.quizType}/${store.getState().quizMetaData.quizSet}`)
      .reply(200, [{},{},{},{},{}], {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json'
      })

    const expectedActions = [
      { type: RESET_INSTANCE_DATA},
      { type: GET_QUIZ_DATA, payload: [{},{},{},{},{}] },
      { type: SET_ANSWER_CHOICES, payload: [{},{},{},{}] },
      // { type: START_TIMER, payload: 1234567890 },
    ]

    return store.dispatch(resetThenRestart()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })  
})
