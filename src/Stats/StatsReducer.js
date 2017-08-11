import {
  SET_RIGHTIEST, 
  SET_WRONGIEST,
  SET_HIGH_SCORE,
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
    correctAnswerStack: [],
    wrongAnswer: null,
  }  
};

export default function (state = INITIAL_STATE, action) {
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
          correctAnswerStack: action.payload.correct_answer_stack,
          wrongAnswer: action.payload.wrong_answer, 
        }
      }; 
  }

  return state;
}
