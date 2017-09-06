import { createSelector } from 'reselect'

// const getQuestionStack = (state) => state.quizInstance.questionStack
const getanswerStack = (state) => state.quizInstance.answerStack
const getStartTime = (state) => state.quizInstance.startTime
const getEndTime = (state) => state.quizInstance.endTime

export const getLastCorrectAnswer = createSelector(
  [ getanswerStack ],
  (getanswerStack) => {
    return getanswerStack[getanswerStack.length-1];
  }
)

export const getQuizTotalTime = createSelector(
	[ getStartTime, getEndTime ],
	(getStartTime, getEndTime) => {
		return getEndTime - getStartTime;
	}
)