import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'

import * as types from '../QuizActionTypes'
import {
	reset,
	beginGenerationQuiz,
	beginPokemonTypeQuiz,
	beginLegendaryQuiz,
	setAnswer,
	setNextQuestion,
	submitAnswer,
	useClue,
	endCurrentQuiz,
	postPlaythruData,
} from '../QuizActions'

const API_URL = 'http://localhost:3000/api/';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  // reset
  it('reset dispatches RESET_INSTANCE_DATA & RESET_META_DATA', () => {

    const expectedActions = [
      { type: types.RESET_INSTANCE_DATA },
      { type: types.RESET_META_DATA },
    ]
    const store = mockStore({ 
    	quizMetaData: {
    	},
    	quizInstance: {
    	}
    })

    store.dispatch(reset())
	  expect(store.getActions()).toEqual(expectedActions)
  })

  // beginGenerationQuiz
  it('beginGenerationQuiz gets Generation pokemon set', () => {
  	const generationNumber = 1

  	nock(API_URL)
      .get(`/pokemon/generation/`)
      .query({ generation: generationNumber})
      .reply(200, { body: { shuffledQuizStack: [{},{},{},{},{}] } })

    const expectedActions = [
    	{ type: types.GET_QUIZ_DATA, payload: [{},{},{},{},{}] },
      { type: types.SET_GENERATION_NUMBER, payload: 1 },
      { type: types.SET_ANSWER_CHOICES, payload: [{},{},{},{}] },
      { type: types.START_TIMER, payload: 123456789098 },
    ]

    const store = mockStore({
    	quizInstance: {
    		shuffledQuizStack: [],
    		answerChoices: [],
    		startTime: null,
			},
			quizMetaData: {
				quizType: null,
				quizSet: null,
			}
    })

    return store.dispatch(beginGenerationQuiz(generationNumber)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  // TODO: beginPokemonTypeQuiz

  // TODO: beginLegendaryQuiz

  // setAnswer
  it('setAnswer dispatches SET_ANSWER', () => {
  	const event = {},
  				value = 1;

    const expectedActions = [
      { type: types.SET_ANSWER, payload: 1 },
    ]

    const store = mockStore({ 
    	quizMetaData: {
    	},
    	quizInstance: {
    	}
    })

    store.dispatch(setAnswer(event, value))
	  expect(store.getActions()).toEqual(expectedActions)
  })

  // setNextQuestion
  it('setNextQuestion dispatches INCREMENT_CLUE_COUNT, STACK_CORRECT_ANSWER, & SET_ANSWER_CHOICES', () => {
    const expectedActions = [
      { type: types.INCREMENT_CLUE_COUNT },
      { type: types.STACK_CORRECT_ANSWER, payload: {shuffledQuizStack: [{},{},{},{}], correctAnswerStack: [{},{}]} },
      { type: types.SET_ANSWER_CHOICES, payload: [{},{},{},{}] },
    ]

    const store = mockStore({ 
    	quizMetaData: {
    	},
    	quizInstance: {
    		shuffledQuizStack: [{},{},{},{},{}],
    		correctAnswerStack: [{}]
    	}
    })

    store.dispatch(setNextQuestion())
	  expect(store.getActions()).toEqual(expectedActions)
  })

  // submitAnswer
  it('submitAnswer dispatches SUBMIT_ANSWER', () => {
    const expectedActions = [
      { type: types.SUBMIT_ANSWER },
    ]

    const store = mockStore({ 
    	quizMetaData: {
    	},
    	quizInstance: {
    	}
    })

    store.dispatch(submitAnswer())
	  expect(store.getActions()).toEqual(expectedActions)
  })

  // useClue
  it('useClue dispatches USE_CLUE', () => {
    const expectedActions = [
      { type: types.USE_CLUE },
    ]

    const store = mockStore({ 
    	quizMetaData: {
    	},
    	quizInstance: {
    	}
    })

    store.dispatch(useClue())
	  expect(store.getActions()).toEqual(expectedActions)
  })

  // postPlaythruData
  it('postPlaythruData posts data', () => {
    nock(API_URL)
      .post(`/playthru/`)
      .reply(200, { body: { shuffledQuizStack: [{},{},{},{},{}] } })

    const expectedActions = [
    	{ type: types.POST_PLAYTHRU_SUCCESS }
    ]

    const store = mockStore({ 
    	quizMetaData: {
    	},
    	quizInstance: {
    	}
    })

    store.dispatch(postPlaythruData())
	  expect(store.getActions()).toEqual(expectedActions)
  })
})