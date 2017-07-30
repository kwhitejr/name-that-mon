import moment from 'moment'

import * as actions from '../QuizActions'
import {
  RESET_META_DATA,
  SET_GENERATION_NUMBER,
  SET_POKEMON_TYPE,
  SET_LEGENDARY,
} from '../QuizActionTypes'
import metaDataReducer, { INITIAL_STATE } from '../QuizMetaDataReducer'

describe('Quiz Reducer', () => {

	// Initial State
  it('should have initial state', () => {
    expect(metaDataReducer(undefined, {})).toEqual(INITIAL_STATE);
  });
  
  // RESET_INSTANCE_DATA
  it('should handle RESET_META_DATA', () => {
    expect(
      metaDataReducer({
  			error: 'There is an error.', 
			  message: 'There is a message.', 
        quizType: 'generation',
        quizSet: 1,
  		}, {
        type: RESET_META_DATA,
      })
    ).toEqual(INITIAL_STATE);
	});

  // SET_GENERATION_NUMBER
  it('should handle SET_GENERATION_NUMBER', () => {
    expect(metaDataReducer({
    	error: '', 
      message: '', 
      quizType: null,
      quizSet: null,
    }, {
    	type: SET_GENERATION_NUMBER,
      payload: 1
    })).toEqual({
  		error: '', 
      message: '', 
      quizType: 'generation',
      quizSet: 1,
  	});
  });

  // SET_POKEMON_TYPE
  it('should handle SET_POKEMON_TYPE', () => {
    expect(metaDataReducer({
      error: '', 
      message: '', 
      quizType: null,
      quizSet: null,
    }, {
      type: SET_POKEMON_TYPE,
      payload: 'normal'
    })).toEqual({
      error: '', 
      message: '', 
      quizType: 'type',
      quizSet: 'normal',
    });
  });

  // SET_LEGENDARY
  it('should handle SET_LEGENDARY', () => {
    expect(metaDataReducer({
      error: '', 
      message: '', 
      quizType: null,
      quizSet: null,
    }, {
      type: SET_LEGENDARY,
    })).toEqual({
      error: '', 
      message: '', 
      quizType: 'legendary',
      quizSet: 'legendary',
    });
  });

});
