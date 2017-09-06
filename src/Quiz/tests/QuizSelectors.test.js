import * as selectors from '../QuizSelectors'

const mockState = {
	quizInstance: {
		questionStack: [
	  	{name: 'Bulbasaur', id: 1}, 
	  	{name: 'Charmander', id: 2}, 
	  	{name: 'Pikachu', id: 3}, 
	  	{name: 'Squirtle', id: 4},
	  	{name: 'Metapod', id: 5}, 
	  	{name: 'Beedrill', id: 6}, 
	  	{name: 'Gyrados', id: 7},
	  ],
	  answerStack: [
	  	{name: 'Venusaur', id: 8}, 
	  	{name: 'Charizard', id: 9}, 
	  	{name: 'Raichu', id: 10}, 
	  	{name: 'Wartortle', id: 11},
	  	{name: 'Magikarp', id: 12},
	  ],
	  isAnswerSubmitted: false,
	  isAnswerSelected: false,
	  isClueUsed: false,
	  userAnswer: null, 
	  answerChoices: [],
    startTime: 100000,
    endTime: 200000,
    clueCount: 7,
	},
  quizMetaData: {
    quizType: 'generation',
    quizSet: 1,
  },
}

describe('QuizSelectors', () => {

  it('`getCurrentMon` should get current pokemon', () => {
		expect(selectors.getCurrentMon(mockState)).toEqual({name: 'Gyrados', id: 7});
  });

  it('`getQuizLength` should get quiz length', () => {
    expect(selectors.getQuizLength(mockState)).toEqual(12);
  });

  it('`getCorrectAnswerIds` should get quiz length', () => {
    expect(selectors.getCorrectAnswerIds(mockState)).toEqual([8,9,10,11,12]);
  });

  it('`getPlaythruData` should get quiz length', () => {
    expect(selectors.getPlaythruData(mockState)).toEqual({
      user_initials: null,
      quiz_type: 'generation',
      quiz_set: 1,
      start_time: 100000,
      end_time: 200000,
      clue_count: 7,
      correct_answer_stack: [8,9,10,11,12],
      wrong_answer: 7,
    });
  });
});
