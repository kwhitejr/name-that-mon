import { createSelector } from 'reselect'

// const getShuffledQuizStack = (state) => state.quizInstance.shuffledQuizStack
const getCorrectAnswerStack = (state) => state.quizInstance.correctAnswerStack
const getStartTime = (state) => state.quizInstance.startTime
const getEndTime = (state) => state.quizInstance.endTime

export const getLastCorrectAnswer = createSelector(
  [ getCorrectAnswerStack ],
  (getCorrectAnswerStack) => {
    return getCorrectAnswerStack[getCorrectAnswerStack.length-1];
  }
)

export const getQuizTotalTime = createSelector(
	[ getStartTime, getEndTime ],
	(getStartTime, getEndTime) => {
		return getEndTime - getStartTime;
	}
)