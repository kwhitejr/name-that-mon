const SET_ANSWER = 'SET_ANSWER',
      SET_USER_INITIALS = 'SET_USER_INITIALS',
      RESET_INSTANCE_DATA = 'RESET_INSTANCE_DATA',
      GET_QUIZ_DATA = 'GET_QUIZ_DATA',
      SUBMIT_ANSWER = 'SUBMIT_ANSWER',
      SET_ANSWER_CHOICES = 'SET_ANSWER_CHOICES',
      SET_QUIZ_COMPLETE_FLAG = 'SET_QUIZ_COMPLETE_FLAG',
      SET_ANSWER_CORRECT_FLAG = 'SET_ANSWER_CORRECT_FLAG',
      STACK_CORRECT_ANSWER = 'STACK_CORRECT_ANSWER',
      START_TIMER = 'START_TIMER',
      END_TIMER = 'END_TIMER',
      USE_CLUE = 'USE_CLUE',
      INCREMENT_CLUE_COUNT = 'INCREMENT_CLUE_COUNT',
      POST_PLAYTHRU_SUCCESS = 'POST_PLAYTHRU_SUCCESS';

export const INITIAL_STATE = { 
  error: '', 
  message: '', 
  isAnswerSelected: false, 
  isAnswerSubmitted: false, 
  isClueUsed: false,
  isQuizComplete: false,
  userAnswer: null, 
  answerChoices: [], 
  shuffledQuizStack: [], 
  correctAnswerStack: [],
  userInitials: null,
  startTime: null,
  endTime: null,
  clueCount: 0,
};

export default function (state = INITIAL_STATE, action) {
  // eslint-disable-next-line
  switch (action.type) {
    case SET_ANSWER:
      return { ...state, isAnswerSelected: true, userAnswer: action.payload };
    case RESET_INSTANCE_DATA:
      return { 
        error: '', 
        message: '', 
        isAnswerSelected: false, 
        isAnswerSubmitted: false, 
        isAnswerCorrect: false, 
        isClueUsed: false, 
        isQuizComplete: false,
        userAnswer: null, 
        answerChoices: [], 
        shuffledQuizStack: [], 
        correctAnswerStack: [],
        startTime: null,
        endTime: null,
        clueCount: 0,
      };
    case GET_QUIZ_DATA:
      return { ...state, shuffledQuizStack: action.payload };
    case SUBMIT_ANSWER:
      return { ...state, isAnswerSubmitted: true, isAnswerSelected: false };
    case SET_ANSWER_CORRECT_FLAG:
      return { ...state, isAnswerCorrect: true };
    case SET_QUIZ_COMPLETE_FLAG:
      return { ...state, isQuizComplete: true };
    case SET_ANSWER_CHOICES:
      return { ...state, answerChoices: action.payload };
    case STACK_CORRECT_ANSWER:
      return { ...state, 
        shuffledQuizStack: action.payload.shuffledQuizStack,
        correctAnswerStack: action.payload.correctAnswerStack,
        isAnswerSubmitted: false,
        isAnswerSelected: false,
        isAnswerCorrect: false,
        isClueUsed: false,
        userAnswer: null, 
        answerChoices: [], 
      };
    case START_TIMER:
      return { ...state, startTime: action.payload };
    case END_TIMER:
      return { ...state, endTime: action.payload };
    case SET_USER_INITIALS:
      return { ...state, userInitials: action.payload };
    case USE_CLUE:
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
