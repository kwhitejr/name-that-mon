import { shuffle } from '../common'
import { createSelector } from 'reselect'

const getQuestionStack = (state) => state.quizInstance.questionStack
const getAnswerStack = (state) => state.quizInstance.answerStack
const getStartTime = (state) => state.quizInstance.startTime
const getEndTime = (state) => state.quizInstance.endTime
const getClueCount = (state) => state.quizInstance.clueCount
const getUserInitials = (state) => state.quizInstance.userInitials
const getQuizMetaData = (state) => state.quizMetaData

export const getCurrentMon = createSelector(
  [ getQuestionStack, getAnswerStack ],
  (questionStack, answerStack) => {

    if (questionStack == null) {
      return null
    }

    if (questionStack.length > 0) {
      return questionStack[questionStack.length-1]
    } else {
      return answerStack[answerStack.length-1]
    }
  }
)

export const getQuizLength = createSelector(
  [ getQuestionStack, getAnswerStack ],
  (getQuestionStack, getAnswerStack) => {
    return getQuestionStack.length + getAnswerStack.length
  }
)

export const getCorrectAnswerIds = createSelector(
	[ getAnswerStack ],
	(getAnswerStack) => {
		return getAnswerStack.map( (a) => {
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
    getQuestionStack,
		getCorrectAnswerIds,
		getCurrentMon,
    getUserInitials,
	],
	(getQuizMetaData, getStartTime, getEndTime, getClueCount, getQuestionStack, getCorrectAnswerIds, getCurrentMon, getUserInitials) => {
    let wrongAnswer = getQuestionStack.length > 0 ? getCurrentMon.id : null

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

export const getAnswerChoices = createSelector(
  [ getQuestionStack, getCurrentMon ],
  (getQuestionStack, getCurrentMon) => {
    let answerChoices = []
    answerChoices.push(getCurrentMon)

    // add bogus answers
    const remainingMon = getQuestionStack.length > 3 ? shuffle(getQuestionStack.slice(0,getQuestionStack.length-1)).slice(0,3) : getQuestionStack.slice(0,getQuestionStack.length-1)

    remainingMon.forEach( (obj) => {
      answerChoices.push(obj);
    });

    const shuffledAnswerChoices = answerChoices.length > 2 ? shuffle(answerChoices) : answerChoices

    // shuffle the order
    return shuffledAnswerChoices
  }
)
