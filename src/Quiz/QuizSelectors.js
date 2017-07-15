import { createSelector } from 'reselect'

const getShuffledQuizStack = (state) => state.quizInstance.shuffledQuizStack
const getCorrectAnswerStack = (state) => state.quizInstance.correctAnswerStack

export const getCurrentMon = createSelector(
  [ getShuffledQuizStack ],
  (getShuffledQuizStack) => {
    return getShuffledQuizStack[getShuffledQuizStack.length-1]
  }
)

export const getQuizLength = createSelector(
  [ getShuffledQuizStack, getCorrectAnswerStack ],
  (getShuffledQuizStack, getCorrectAnswerStack) => {
    return getShuffledQuizStack.length + getCorrectAnswerStack.length
  }
)