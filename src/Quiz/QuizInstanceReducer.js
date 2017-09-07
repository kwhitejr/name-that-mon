import {
  RESET_INSTANCE_DATA,

  FETCH_QUIZ_REQUEST,
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZ_FAIL,

  START_TIMER,
  END_TIMER,

  SET_SELECTED_ANSWER,
  SET_QUIZ_COMPLETE_FLAG,
  SET_CLUE_FLAG,
  SET_USER_INITIALS,

  STACK_ANSWER,
  INCREMENT_CLUE_COUNT,

  POST_PLAYTHRU_SUCCESS,
} from './QuizActionTypes'

export const INITIAL_STATE = { 
  error: '', 
  message: '',
  isFetchingQuiz: false, 
  // isAnswerSubmitted: false, 
  isClueUsed: false,
  isQuizComplete: false,
  userAnswer: null, 
  // answerChoices: [], 
  questionStack: [], 
  answerStack: [],
  userInitials: null,
  startTime: null,
  endTime: null,
  clueCount: 0,
};

export default function (state = INITIAL_STATE, action) {
  // eslint-disable-next-line
  switch (action.type) {
    case RESET_INSTANCE_DATA:
      return INITIAL_STATE;

    case FETCH_QUIZ_REQUEST:
      return { ...state, isFetchingQuiz: true }
    case FETCH_QUIZ_SUCCESS:
      return { 
        ...state, 
        isFetchingQuiz: false,
        questionStack: action.shuffledData,
        message: 'Fetch quiz data successful.', 
      }
    case FETCH_QUIZ_FAIL:
      return { 
        ...state, 
        isFetchingQuiz: false,
        message: 'Fetch quiz data failed.',
        error: action.err, 
      }

    // case SET_ANSWER_CHOICES:
    //   return { ...state, answerChoices: action.answerChoices };
    case SET_SELECTED_ANSWER:
      return { ...state, userAnswer: action.value };

    // case SUBMIT_ANSWER:
    //   return { ...state, isAnswerSubmitted: true, isAnswerSelected: false };
    // case SET_ANSWER_CORRECT_FLAG:
    //   return { ...state, isAnswerCorrect: true };
    case SET_QUIZ_COMPLETE_FLAG:
      return { ...state, isQuizComplete: action.isQuizComplete };
    case STACK_ANSWER:
      const lastDatum = state.questionStack[state.questionStack.length-1]
      const answerStack = state.answerStack.concat(lastDatum)
      const questionStack = state.questionStack.slice(0,-1) || []

      return { ...state, 
        questionStack: questionStack,
        answerStack: answerStack,
        isClueUsed: false,
        userAnswer: null, 
      };
    case START_TIMER:
      return { ...state, startTime: action.time };
    case END_TIMER:
      return { ...state, endTime: action.payload };
    case SET_USER_INITIALS:
      return { ...state, userInitials: action.payload };
    case SET_CLUE_FLAG:
      return { ...state, isClueUsed: true };
    case INCREMENT_CLUE_COUNT:
      if (state.isClueUsed) {
        return { ...state, isClueUsed: false, clueCount: state.clueCount + 1 };
      } else {
        return state;
      }
    case POST_PLAYTHRU_SUCCESS:
      return { ...state, message: 'Successfully posted Playthru data.' };
  }

  return state;
}
