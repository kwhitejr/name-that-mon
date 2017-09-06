import * as selectors from '../ResultSelectors'
import moment from 'moment'

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
    startTime: 120000,
    endTime: 200000,
    clueCount: 7,
  },
  quizMetaData: {
    quizType: 'generation',
    quizSet: 1,
  },
}

describe('QuizSelectors', () => {

  it('`getLastCorrectAnswer` should get the last correct answer', () => {
    expect(selectors.getLastCorrectAnswer(mockState)).toEqual({name: 'Magikarp', id: 12});
  });

  it('`getQuizTotalTime` should get total play time', () => {
    expect(selectors.getQuizTotalTime(mockState)).toEqual(80000));
  });

});
