import {
  SET_RIGHTIEST, 
  SET_WRONGIEST,
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
  }

  return state;
}
