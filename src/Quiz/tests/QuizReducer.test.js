import * as actions from '../QuizActions'
import * as types from '../QuizActionTypes'
import quizReducer, { INITIAL_STATE } from '../QuizReducer'

describe('Quiz Reducer', () => {

  it('should have initial state', () => {
    expect(quizReducer(undefined, {})).toEqual(INITIAL_STATE);
  });
  
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
			  shuffledQuizStack: [{},{},{},{},{}], 
			  correctAnswerStack: [{},{},{},{},{}],
			  startTime: 1500993571199,
			  endTime: 1500993592773,
			  clueCount: 7,
  		}, {
        type: types.RESET_INSTANCE_DATA,
      })
    ).toEqual(INITIAL_STATE);
	});

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

});
