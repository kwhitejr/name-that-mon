
import { createSelector } from 'reselect'

const getShuffledQuizStack = (state) => state.quizInstance.shuffledQuizStack
const getCorrectAnswerStack = (state) => state.quizInstance.correctAnswerStack
const getStartTime = (state) => state.quizInstance.startTime
const getEndTime = (state) => state.quizInstance.endTime
const getClueCount = (state) => state.quizInstance.clueCount
const getUserInitials = (state) => state.quizInstance.userInitials
const getQuizMetaData = (state) => state.quizMetaData

export const getCurrentMon = createSelector(
  [ getShuffledQuizStack, getCorrectAnswerStack ],
  (shuffledQuizStack, correctAnswerStack) => {
    if (shuffledQuizStack.length > 0) {
      return shuffledQuizStack[shuffledQuizStack.length-1]
    } else {
      return correctAnswerStack[correctAnswerStack.length-1]
    }
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
    getShuffledQuizStack,
		getCorrectAnswerIds,
		getCurrentMon,
    getUserInitials,
	],
	(getQuizMetaData, getStartTime, getEndTime, getClueCount, getShuffledQuizStack, getCorrectAnswerIds, getCurrentMon, getUserInitials) => {
    let wrongAnswer = getShuffledQuizStack.length > 0 ? getCurrentMon.id : null

		return {
			user_initials: getUserInitials,
      quiz_type: getQuizMetaData.quizType,
      quiz_set: getQuizMetaData.quizSet,
      start_time: getStartTime,
      end_time: getEndTime,
      clue_count: getClueCount,
      correct_answer_stack: getCorrectAnswerIds,
      wrong_answer: wrongAnswer,
		}
	}
)