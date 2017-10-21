import { push } from 'react-router-redux'

// import { shuffle } from '../common'
// import { getAnswerChoices } from '../Quiz/QuizActions'
import { 
  RESET_INSTANCE_DATA, 
  RESET_META_DATA, 
  // GET_QUIZ_DATA,
  // SET_ANSWER_CHOICES,
} from '../Quiz/QuizActionTypes'

const API_URL = 'http://localhost:4001/api';

export function resetThenHome() {
  return (dispatch) => {
    dispatch({ type: RESET_INSTANCE_DATA })
    dispatch({ type: RESET_META_DATA })
    dispatch(push('/'))
  };
}

// export function resetThenRestart() {
//   // need to refactor the reload of pokemon
//   return (dispatch, getState) => {
//     const quizType = getState().quizMetaData.quizType
//     const quizSet = getState().quizMetaData.quizSet
//     dispatch({ type: RESET_INSTANCE_DATA })

//     return fetch(`${API_URL}/pokemon/${quizType}/${quizSet}`)
//       .then(res => res.json())
//       .then(json => shuffle(json))
//       .then(questionStack => {
//         dispatch({ type: GET_QUIZ_DATA, payload: questionStack })
//         dispatch({ type: SET_ANSWER_CHOICES, payload: getAnswerChoices(getState().quizInstance.questionStack) })
//         dispatch(push('/quiz'));
//       })
//   }
// }
