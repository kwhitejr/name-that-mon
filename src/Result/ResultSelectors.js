import { createSelector } from 'reselect'
import moment from 'moment'

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
		return moment(getEndTime - getStartTime).format("mm:ss:SS");
	}
)