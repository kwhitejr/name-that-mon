import { push } from 'react-router-redux'

// import config from '../config.json'

import { 
  RESET_INSTANCE_DATA, 
  RESET_META_DATA, 
} from '../Quiz/QuizActionTypes'

// const API_URL = `http://${config.API_URL}:${config.API_PORT}/api`;

export function resetThenHome() {
  return (dispatch) => {
    dispatch({ type: RESET_INSTANCE_DATA })
    dispatch({ type: RESET_META_DATA })
    dispatch(push('/'))
  };
}
