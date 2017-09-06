import moment from 'moment'

import * as actions from '../QuizActions'
import * as types from '../QuizActionTypes'
import quizReducer, { INITIAL_STATE } from '../QuizInstanceReducer'

describe('Quiz Reducer', () => {

	// Initial State
  it('should have initial state', () => {
    expect(quizReducer(undefined, {})).toEqual(INITIAL_STATE);
  });
  
  // RESET_INSTANCE_DATA
  it('should handle RESET_INSTANCE_DATA', () => {
    expect(
      quizReducer({
  			error: 'There is an error.', 
			  message: 'There is a message.', 
			  isAnswerSelected: true, 
			  isAnswerSubmitted: true, 
			  isClueUsed: false, 
			  userAnswer: {name: 'Bulbasaur'}, 
			  answerChoices: [
			  	{name: 'Bulbasaur'}, 
			  	{name: 'Charmander'}, 
			  	{name: 'Pikachu'}, 
			  	{name: 'Squirtle'}
			  ], 
			  questionStack: [{},{},{},{},{}], 
			  answerStack: [{},{},{},{},{}],
			  startTime: 1500993571199,
			  endTime: 1500993592773,
			  clueCount: 7,
  		}, {
        type: types.RESET_INSTANCE_DATA,
      })
    ).toEqual(INITIAL_STATE);
	});

  // SET_ANSWER
  it('should handle SET_ANSWER', () => {
    expect(quizReducer({
    	isAnswerSelected: false,
    	userAnswer: null, 
		  answerChoices: [
		  	{name: 'Bulbasaur'}, 
		  	{name: 'Charmander'}, 
		  	{name: 'Pikachu'}, 
		  	{name: 'Squirtle'}
		  ],
    }, {
    	type: types.SET_ANSWER,
    	payload: {name: 'Bulbasaur'}
    })).toEqual({
  		isAnswerSelected: true,
    	userAnswer: {name: 'Bulbasaur'}, 
		  answerChoices: [
		  	{name: 'Bulbasaur'}, 
		  	{name: 'Charmander'}, 
		  	{name: 'Pikachu'}, 
		  	{name: 'Squirtle'}
		  ],
  	});
  });

  // TODO: `userAnswer` should be one of `answerChoices`

  // GET_QUIZ_DATA
  it('should handle GET_QUIZ_DATA', () => {
    expect(quizReducer({
    	questionStack: [],
    }, {
    	type: types.GET_QUIZ_DATA,
    	payload: [
    		{name: 'Bulbasaur'}, 
		  	{name: 'Charmander'}, 
		  	{name: 'Pikachu'}, 
		  	{name: 'Squirtle'}
		  ]
    })).toEqual({
  		questionStack: [
		  	{name: 'Bulbasaur'}, 
		  	{name: 'Charmander'}, 
		  	{name: 'Pikachu'}, 
		  	{name: 'Squirtle'}
		  ],
  	});
  });

  // SUBMIT_ANSWER
  it('should handle SUBMIT_ANSWER', () => {
    expect(quizReducer({
    	isAnswerSubmitted: false,
    }, {
    	type: types.SUBMIT_ANSWER,
    })).toEqual({
  		isAnswerSubmitted: true
  	});
  });

  // SET_ANSWER_CHOICES
  it('should handle SET_ANSWER_CHOICES', () => {
  	// TODO
  	// reducers should have no side effects
  	// this reducer contains the randomization logic 
  });

  // STACK_ANSWER
  it('should handle STACK_ANSWER', () => {
    expect(quizReducer({
    	questionStack: [
		  	{name: 'Bulbasaur'}, 
		  	{name: 'Charmander'}, 
		  	{name: 'Pikachu'}, 
		  	{name: 'Squirtle'},
		  	{name: 'Metapod'}, 
		  	{name: 'Beedrill'}, 
		  	{name: 'Gyrados'},
		  	{name: 'Magikarp'},
		  ],
	    answerStack: [
		  	{name: 'Venusaur'}, 
		  	{name: 'Charizard'}, 
		  	{name: 'Raichu'}, 
		  	{name: 'Wartortle'},
		  ],
	    isAnswerSubmitted: true,
	    isAnswerSelected: true,
	    isClueUsed: true,
	    userAnswer: {name: 'Magikarp'}, 
	    answerChoices: [
		  	{name: 'Metapod'}, 
		  	{name: 'Beedrill'}, 
		  	{name: 'Gyrados'}, 
		  	{name: 'Magikarp'},
		  ],
    }, {
    	type: types.STACK_ANSWER,
      payload: {
        questionStack: [
          {name: 'Bulbasaur'}, 
          {name: 'Charmander'}, 
          {name: 'Pikachu'}, 
          {name: 'Squirtle'},
          {name: 'Metapod'}, 
          {name: 'Beedrill'}, 
          {name: 'Gyrados'},
        ],
        answerStack: [
          {name: 'Venusaur'}, 
          {name: 'Charizard'}, 
          {name: 'Raichu'}, 
          {name: 'Wartortle'},
          {name: 'Magikarp'},
        ],
      }
    })).toEqual({
  		questionStack: [
		  	{name: 'Bulbasaur'}, 
		  	{name: 'Charmander'}, 
		  	{name: 'Pikachu'}, 
		  	{name: 'Squirtle'},
		  	{name: 'Metapod'}, 
		  	{name: 'Beedrill'}, 
		  	{name: 'Gyrados'},
		  ],
	    answerStack: [
		  	{name: 'Venusaur'}, 
		  	{name: 'Charizard'}, 
		  	{name: 'Raichu'}, 
		  	{name: 'Wartortle'},
		  	{name: 'Magikarp'},
		  ],
	    isAnswerSubmitted: false,
	    isAnswerSelected: false,
	    isClueUsed: false,
	    userAnswer: null, 
	    answerChoices: [],
  	});
  });

  // START_TIMER
  it('should handle START_TIMER', () => {
    expect(quizReducer({
    	startTime: null,
    }, {
    	type: types.START_TIMER,
    	payload: 1234235423452
    })).toEqual({
  		startTime: 1234235423452
  	});
  });

  // END_TIMER
  it('should handle END_TIMER', () => {
    expect(quizReducer({
    	endTime: null,
    }, {
    	type: types.END_TIMER,
    	payload: 1234235423452
    })).toEqual({
  		endTime: 1234235423452
  	});
  });

  // USE_CLUE
  it('should handle USE_CLUE', () => {
    expect(quizReducer({
    	isClueUsed: false,
    }, {
    	type: types.USE_CLUE,
    })).toEqual({
  		isClueUsed: true
  	});
  });

  // INCREMENT_CLUE_COUNT
  it('should handle INCREMENT_CLUE_COUNT', () => {
    expect(quizReducer({
    	clueCount: 7,
    	isClueUsed: true,
    }, {
    	type: types.INCREMENT_CLUE_COUNT,
    })).toEqual({
    	clueCount: 8,
  		isClueUsed: false,
  	});

  	expect(quizReducer({
    	clueCount: 7,
    	isClueUsed: false,
    }, {
    	type: types.INCREMENT_CLUE_COUNT,
    })).toEqual({
    	clueCount: 7,
  		isClueUsed: false,
  	});
  });

});
