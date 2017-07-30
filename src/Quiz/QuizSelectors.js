import { createSelector } from 'reselect'
import moment from 'moment'

const getShuffledQuizStack = (state) => state.quizInstance.shuffledQuizStack
const getCorrectAnswerStack = (state) => state.quizInstance.correctAnswerStack
const getStartTime = (state) => state.quizInstance.startTime
const getEndTime = (state) => state.quizInstance.endTime
const getClueCount = (state) => state.quizInstance.clueCount
const getQuizMetaData = (state) => state.quizMetaData

export const getCurrentMon = createSelector(
  [ getShuffledQuizStack ],
  (shuffledQuizStack) => {
    return shuffledQuizStack[shuffledQuizStack.length-1]
  }
)

export const getQuizLength = createSelector(
  [ getShuffledQuizStack, getCorrectAnswerStack ],
  (getShuffledQuizStack, getCorrectAnswerStack) => {
    return getShuffledQuizStack.length + getCorrectAnswerStack.length
  }
)

export const getCorrectAnswerIds = createSelector(
	[ getCorrectAnswerStack ],
	(getCorrectAnswerStack) => {
		return getCorrectAnswerStack.map( (a) => {
			return a.id;
		})
	}
)

export const getPlaythruData = createSelector(
	[ 
		getQuizMetaData, 
		getStartTime, 
		getEndTime, 
		getClueCount, 
		getCorrectAnswerIds,
		getCurrentMon
	],
	(getQuizMetaData, getStartTime, getEndTime, getClueCount, getCorrectAnswerIds, getCurrentMon) => {
		return {
			user_initials: null,
      quiz_type: getQuizMetaData.quizType,
      quiz_set: getQuizMetaData.quizSet,
      start_time: getStartTime,
      end_time: getEndTime,
      clue_count: getClueCount,
      correct_answer_stack: getCorrectAnswerIds,
      wrong_answer: getCurrentMon.id,
		}
	}
)