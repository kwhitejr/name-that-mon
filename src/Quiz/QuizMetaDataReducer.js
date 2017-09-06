const RESET_META_DATA = 'RESET_META_DATA',
      SET_META_DATA = 'SET_META_DATA';

export const INITIAL_STATE = { 
  error: '', 
  message: '', 
  quizType: null,
  quizSet: null,
};

export default function (state = INITIAL_STATE, action) {
  // eslint-disable-next-line
  switch (action.type) {
    case RESET_META_DATA:
      return { 
        error: '', 
        message: 'Meta data reset to null.', 
        quizType: null,
        quizSet: null,
      };
    case SET_META_DATA:
      return { 
        ...state, 
        quizType: action.quizType, 
        quizSet: action.quizSet,
        message: 'Meta data succesfully set.'
      };
  }

  return state;
}