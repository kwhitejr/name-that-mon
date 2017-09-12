import {
  SET_RIGHTIEST, 
  SET_WRONGIEST,
  SET_HIGH_SCORE,
  SET_TOTAL_PLAYTHRUS,
  FETCH_STAT_FAIL,
} from './StatsActionTypes'

const INITIAL_STATE = { 
  error: '', 
  message: '',
  rightiest: {
    name: null,
    id: null,
    count: 0,
  },
  wrongiest: {
    name: null,
    id: null,
    count: 0,
  },
  highScore: {
    id: null,
    userInitials: '',
    quizType: '',
    quizSet: '',
    startTime: '',
    endTime: '',
    clueCount: 0,
    answerStack: [],
    wrongAnswer: null,
  },
  totalPlaythrus: 0,  
};

export default function (state = INITIAL_STATE, action) {
  // eslint-disable-next-line
  switch (action.type) {
    // case RESET:
    //   return { INITIAL_STATE };
    case SET_RIGHTIEST:
      return { ...state, rightiest: action.payload };
    case SET_WRONGIEST:
      return { ...state, wrongiest: action.payload };
    case SET_HIGH_SCORE:
      return { ...state,  
        highScore: {
          id: action.payload.id,
          userInitials: action.payload.user_initials,
          quizType: action.payload.quiz_type,
          quizSet: action.payload.quiz_set,
          startTime: action.payload.start_time,
          endTime: action.payload.end_time,
          clueCount: action.payload.clue_count,
          answerStack: action.payload.correct_answer_stack,
          wrongAnswer: action.payload.wrong_answer, 
        }
      };
    case SET_TOTAL_PLAYTHRUS:
      return { ...state, totalPlaythrus: action.payload };
    case FETCH_STAT_FAIL:
      return { ...state, error: action.payload }; 
  }

  return state;
}
