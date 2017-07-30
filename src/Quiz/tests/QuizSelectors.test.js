import * as selectors from '../QuizSelectors'

const state = {
	quizInstance: {
		shuffledQuizStack: [
	  	{name: 'Bulbasaur'}, 
	  	{name: 'Charmander'}, 
	  	{name: 'Pikachu'}, 
	  	{name: 'Squirtle'},
	  	{name: 'Metapod'}, 
	  	{name: 'Beedrill'}, 
	  	{name: 'Gyrados'},
	  ],
	  correctAnswerStack: [
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
		}
}

describe('QuizSelectors', () => {

  it('should get current pokemon', () => {
  	console.log("getCurrentMon", selectors.getCurrentMon(state.quizInstance.shuffledQuizStack));
		expect(selectors.getCurrentMon(state)).toDeepEqual({name: 'Gyrados'});
  });


});
