import { createSelector } from 'reselect'

// const getShuffledQuizStack = (state) => state.quizInstance.shuffledQuizStack
const getCorrectAnswerStack = (state) => state.quizInstance.correctAnswerStack

export const getLastCorrectAnswer = createSelector(
  [ getCorrectAnswerStack ],
  (getCorrectAnswerStack) => {
    return getCorrectAnswerStack[getCorrectAnswerStack.length-1]
  }
)