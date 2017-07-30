const RESET_META_DATA = 'RESET_META_DATA',
      SET_GENERATION_NUMBER = 'SET_GENERATION_NUMBER',
      SET_POKEMON_TYPE = 'SET_POKEMON_TYPE',
      SET_LEGENDARY = 'SET_LEGENDARY';

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
        message: '', 
        quizType: null,
        quizSet: null,
      };
    case SET_GENERATION_NUMBER:
      return { ...state, quizType: 'generation', quizSet: action.payload };
    case SET_POKEMON_TYPE:
      return { ...state, quizType: 'type', quizSet: action.payload };
    case SET_LEGENDARY:
      return { ...state, quizType: 'legendary', quizSet: 'legendary' };
  }

  return state;
}