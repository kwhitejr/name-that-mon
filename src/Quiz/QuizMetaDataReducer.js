const RESET_META_DATA = 'RESET_META_DATA',
      SET_GENERATION_NUMBER = 'SET_GENERATION_NUMBER',
      SET_POKEMON_TYPE = 'SET_POKEMON_TYPE',
      SET_LEGENDARY = 'SET_LEGENDARY',
      STACK_CORRECT_ANSWER = 'STACK_CORRECT_ANSWER';

const INITIAL_STATE = { 
  error: '', 
  message: '', 
  quizType: null,
  quizGeneration: null,
  quizPokemonType: null,
  quizLegendary: null,
};

export default function (state = INITIAL_STATE, action) {
  // eslint-disable-next-line
  switch (action.type) {
    case RESET_META_DATA:
      return { 
        error: '', 
        message: '', 
        quizType: null,
        quizGeneration: null,
        quizPokemonType: null,
        quizLegendary: null,
      };
    case SET_GENERATION_NUMBER:
      return { ...state, quizType: 'generation', quizGeneration: action.payload };
    case SET_POKEMON_TYPE:
      return { ...state, quizType: 'type', quizPokemonType: action.payload };
    case SET_LEGENDARY:
      return { ...state, quizType: 'legendary', quizLegendary: action.payload };
  }

  return state;
}